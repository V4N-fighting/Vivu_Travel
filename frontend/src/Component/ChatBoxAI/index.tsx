import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CHATBOT_STREAM_URL } from '../../api';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

type StreamEvent = {
  type: 'delta' | 'done' | 'error';
  content?: string;
  message?: string;
  sessionId?: string;
};

const HISTORY_KEY = 'vivu_ai_chat_history';
const SESSION_KEY = 'vivu_ai_session_id';
const THEME_KEY = 'vivu_ai_theme';

const suggestedPrompts = [
  'I want a romantic trip for 2 people under $500',
  'Suggest beach tours with snorkeling activities',
  'Which tours have the highest ratings?',
  'Có tour gia đình nào phù hợp cho trẻ em?',
];

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createSessionId() {
  return `web-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function ChatBoxAI(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark');
  const [sessionId, setSessionId] = useState(() => localStorage.getItem(SESSION_KEY) || createSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {}
    }
    return [
      {
        id: createId(),
        role: 'assistant',
        content: 'Hi, I am Vivu AI. Ask me about tours, budgets, destinations, schedules, discounts, reviews, or itinerary ideas.',
        createdAt: new Date().toISOString(),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastQuestion, setLastQuestion] = useState('');
  const [error, setError] = useState('');
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const canSend = useMemo(() => Boolean(input.trim()) && !isStreaming, [input, isStreaming]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-40)));
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(SESSION_KEY, sessionId);
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const appendMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  };

  const updateAssistantMessage = (id: string, chunk: string) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, content: `${message.content}${chunk}` } : message,
      ),
    );
  };

  const askBot = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isStreaming) return;

    setError('');
    setLastQuestion(trimmed);
    setInput('');
    setIsStreaming(true);

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const assistantId = createId();
    appendMessage(userMessage);
    appendMessage({
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    });

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(CHATBOT_STREAM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
          locale: isVietnameseText(trimmed) || navigator.language?.startsWith('vi') ? 'vi' : 'en',
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const eventText of events) {
          const line = eventText.split('\n').find((item) => item.startsWith('data: '));
          if (!line) continue;
          const event = JSON.parse(line.replace('data: ', '')) as StreamEvent;

          if (event.sessionId && event.sessionId !== sessionId) {
            setSessionId(event.sessionId);
          }
          if (event.type === 'delta' && event.content) {
            updateAssistantMessage(assistantId, event.content);
          }
          if (event.type === 'error') {
            throw new Error(event.message || 'Chat stream failed');
          }
        }
      }
    } catch (requestError) {
      if ((requestError as Error).name !== 'AbortError') {
        const message = 'I could not reach the AI assistant. Please check the backend, Gemini API key, and database connection, then retry.';
        setError(message);
        updateAssistantMessage(assistantId, message);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askBot(input);
  };

  const resetChat = () => {
    const nextSession = createSessionId();
    setSessionId(nextSession);
    setMessages([
      {
        id: createId(),
        role: 'assistant',
        content: 'New travel planning session started. Tell me your destination, budget, dates, travel style, or activities.',
        createdAt: new Date().toISOString(),
      },
    ]);
    localStorage.setItem(SESSION_KEY, nextSession);
  };

  return (
    <ChatWrapper $dark={isDark}>
      {isOpen && (
        <ChatPanel>
          <ChatHeader>
            <div>
              <strong>Vivu AI Travel Assistant</strong>
              <span>RAG search, memory, live recommendations</span>
            </div>
            <HeaderActions>
              <IconButton type="button" onClick={() => setIsDark((value) => !value)} aria-label="Toggle theme">
                {isDark ? '☀' : '☾'}
              </IconButton>
              <IconButton type="button" onClick={resetChat} aria-label="Reset chat">
                ↻
              </IconButton>
              <IconButton type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
                ×
              </IconButton>
            </HeaderActions>
          </ChatHeader>

          <Messages ref={messagesRef}>
            {messages.map((message, index) => {
              const previous = messages[index - 1];
              const grouped = previous?.role === message.role;
              return (
                <MessageRow key={message.id} $role={message.role} $grouped={grouped}>
                  {!grouped && <Avatar $role={message.role}>{message.role === 'user' ? 'You' : 'AI'}</Avatar>}
                  <MessageBubble $role={message.role} $grouped={grouped}>
                    {message.content ? <MarkdownText content={message.content} /> : <TypingDots><span /><span /><span /></TypingDots>}
                  </MessageBubble>
                </MessageRow>
              );
            })}
          </Messages>

          <SuggestionList>
            {suggestedPrompts.map((suggestion) => (
              <SuggestionButton
                key={suggestion}
                type="button"
                disabled={isStreaming}
                onClick={() => askBot(suggestion)}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionList>

          {error && (
            <RetryBar>
              <span>{error}</span>
              <button type="button" disabled={isStreaming || !lastQuestion} onClick={() => askBot(lastQuestion)}>
                Retry
              </button>
            </RetryBar>
          )}

          <ChatForm onSubmit={handleSubmit}>
            <ChatInput
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about trips, budget, dates, discounts..."
              disabled={isStreaming}
            />
            <SendButton type="submit" disabled={!canSend}>
              {isStreaming ? '...' : 'Send'}
            </SendButton>
          </ChatForm>
        </ChatPanel>
      )}

      <ToggleButton type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Open AI chat">
        {isOpen ? '×' : 'AI'}
      </ToggleButton>
    </ChatWrapper>
  );
}

function MarkdownText({ content }: { content: string }) {
  const blocks = content.split('\n');
  return (
    <>
      {blocks.map((line, index) => {
        if (!line.trim()) return <br key={index} />;
        if (line.startsWith('- ')) return <Bullet key={index}>{renderInline(line.slice(2))}</Bullet>;
        if (/^#{1,3}\s/.test(line)) return <StrongLine key={index}>{renderInline(line.replace(/^#{1,3}\s/, ''))}</StrongLine>;
        return <Paragraph key={index}>{renderInline(line)}</Paragraph>;
      })}
    </>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function isVietnameseText(value: string) {
  return /[ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(value)
    || /\b(chi tiết|lịch trình|giá|khởi hành|hội an|đà nẵng|hạ long|phú quốc)\b/i.test(value);
}

const pulse = keyframes`
  0%, 80%, 100% { transform: scale(0.65); opacity: 0.45; }
  40% { transform: scale(1); opacity: 1; }
`;

const ChatWrapper = styled.div<{ $dark: boolean }>`
  --chat-bg: ${({ $dark }) => ($dark ? '#111827' : '#ffffff')};
  --chat-panel: ${({ $dark }) => ($dark ? '#0f172a' : '#f8fafc')};
  --chat-text: ${({ $dark }) => ($dark ? '#e5e7eb' : '#1f2937')};
  --chat-muted: ${({ $dark }) => ($dark ? '#9ca3af' : '#64748b')};
  --chat-border: ${({ $dark }) => ($dark ? '#334155' : '#e2e8f0')};
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  font-family: inherit;

  @media (max-width: 576px) {
    right: 12px;
    bottom: 12px;
  }
`;

const ChatPanel = styled.div`
  width: 390px;
  max-width: calc(100vw - 24px);
  height: 620px;
  max-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  background: var(--chat-bg);
  color: var(--chat-text);
  border: 1px solid var(--chat-border);
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
  overflow: hidden;
  margin-bottom: 14px;
`;

const ChatHeader = styled.div`
  padding: 14px 14px;
  background: #123c69;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  strong {
    display: block;
    font-size: 15px;
    line-height: 1.2;
  }

  span {
    display: block;
    font-size: 12px;
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.82);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 6px;
`;

const IconButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 17px;
  line-height: 30px;
  cursor: pointer;
`;

const Messages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: var(--chat-panel);
`;

const MessageRow = styled.div<{ $role: ChatRole; $grouped: boolean }>`
  display: flex;
  flex-direction: ${({ $role }) => ($role === 'user' ? 'row-reverse' : 'row')};
  align-items: flex-end;
  gap: 8px;
  margin-top: ${({ $grouped }) => ($grouped ? '4px' : '12px')};
`;

const Avatar = styled.div<{ $role: ChatRole }>`
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ $role }) => ($role === 'user' ? '#ff681a' : '#37d4d9')};
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
`;

const MessageBubble = styled.div<{ $role: ChatRole; $grouped: boolean }>`
  max-width: ${({ $grouped }) => ($grouped ? 'calc(88% - 38px)' : '88%')};
  margin-left: ${({ $role, $grouped }) => ($role === 'assistant' && $grouped ? '38px' : 0)};
  margin-right: ${({ $role, $grouped }) => ($role === 'user' && $grouped ? '38px' : 0)};
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ $role }) => ($role === 'user' ? '#ff681a' : 'var(--chat-bg)')};
  color: ${({ $role }) => ($role === 'user' ? '#ffffff' : 'var(--chat-text)')};
  border: ${({ $role }) => ($role === 'user' ? '0' : '1px solid var(--chat-border)')};
  font-size: 14px;
  line-height: 1.48;
  overflow-wrap: anywhere;
`;

const Paragraph = styled.p`
  margin: 0 0 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Bullet = styled.p`
  margin: 0 0 7px;
  padding-left: 16px;
  position: relative;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    position: absolute;
    left: 3px;
    top: 9px;
  }
`;

const StrongLine = styled.p`
  margin: 0 0 8px;
  font-weight: 800;
`;

const TypingDots = styled.div`
  display: inline-flex;
  gap: 4px;
  align-items: center;
  min-height: 18px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--chat-muted);
    animation: ${pulse} 1.1s infinite ease-in-out;
  }

  span:nth-child(2) {
    animation-delay: 0.16s;
  }

  span:nth-child(3) {
    animation-delay: 0.32s;
  }
`;

const SuggestionList = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  overflow-x: auto;
  border-top: 1px solid var(--chat-border);
  background: var(--chat-bg);
`;

const SuggestionButton = styled.button`
  flex: 0 0 auto;
  max-width: 260px;
  border: 1px solid var(--chat-border);
  background: transparent;
  color: var(--chat-text);
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const RetryBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-top: 1px solid var(--chat-border);
  background: rgba(255, 104, 26, 0.09);
  color: var(--chat-text);
  font-size: 12px;

  span {
    flex: 1;
  }

  button {
    border: 0;
    border-radius: 6px;
    background: #ff681a;
    color: #ffffff;
    padding: 7px 10px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const ChatForm = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--chat-border);
  background: var(--chat-bg);
`;

const ChatInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 1px solid var(--chat-border);
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
  font-size: 14px;
  color: var(--chat-text);
  background: transparent;

  &:focus {
    border-color: #37d4d9;
  }
`;

const SendButton = styled.button`
  width: 70px;
  height: 42px;
  border: 0;
  border-radius: 8px;
  background: #37d4d9;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  width: 58px;
  height: 58px;
  border: 0;
  border-radius: 50%;
  background: #ff681a;
  color: #ffffff;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 12px 30px rgba(255, 104, 26, 0.36);
  cursor: pointer;
`;

export default ChatBoxAI;
