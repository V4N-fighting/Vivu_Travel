import React, { FormEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CHATBOT_URL } from '../../api';

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

type ChatbotResponse = {
  answer: string;
  suggestions?: string[];
};

const initialMessages: ChatMessage[] = [
  {
    role: 'bot',
    content: 'Xin chào, mình là trợ lý Vivu Travel. Bạn có thể hỏi về tour, giá, điểm đến hoặc mã giảm giá.',
  },
];

function ChatBoxAI(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([
    'Gợi ý tour du lịch nổi bật',
    'Có mã giảm giá nào không?',
    'Tour nào phù hợp cho gia đình?',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const askBot = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setMessages((current) => [...current, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post<ChatbotResponse>(CHATBOT_URL, { message: trimmed });
      setMessages((current) => [...current, { role: 'bot', content: response.data.answer }]);
      if (response.data.suggestions?.length) {
        setSuggestions(response.data.suggestions);
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'bot',
          content: 'Hiện tại mình chưa kết nối được hệ thống dữ liệu. Bạn thử lại sau ít phút nhé.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askBot(input);
  };

  return (
    <ChatWrapper>
      {isOpen && (
        <ChatPanel>
          <ChatHeader>
            <div>
              <strong>Vivu AI</strong>
              <span>Trả lời từ dữ liệu tour hiện có</span>
            </div>
            <CloseButton type="button" onClick={() => setIsOpen(false)} aria-label="Đóng chat">
              ×
            </CloseButton>
          </ChatHeader>

          <Messages ref={messagesRef}>
            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} $role={message.role}>
                {message.content.split('\n').map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </MessageBubble>
            ))}
            {isLoading && <Typing>Đang tìm trong dữ liệu...</Typing>}
          </Messages>

          <SuggestionList>
            {suggestions.slice(0, 3).map((suggestion) => (
              <SuggestionButton
                key={suggestion}
                type="button"
                disabled={isLoading}
                onClick={() => askBot(suggestion)}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionList>

          <ChatForm onSubmit={handleSubmit}>
            <ChatInput
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập câu hỏi..."
              disabled={isLoading}
            />
            <SendButton type="submit" disabled={isLoading || !input.trim()}>
              Gửi
            </SendButton>
          </ChatForm>
        </ChatPanel>
      )}

      <ToggleButton type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Mở chat AI">
        {isOpen ? '×' : 'AI'}
      </ToggleButton>
    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  font-family: inherit;

  @media (max-width: 576px) {
    right: 14px;
    bottom: 14px;
  }
`;

const ChatPanel = styled.div`
  width: 360px;
  max-width: calc(100vw - 28px);
  height: 520px;
  max-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.22);
  overflow: hidden;
  margin-bottom: 14px;
`;

const ChatHeader = styled.div`
  padding: 14px 16px;
  background: #123c69;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    display: block;
    font-size: 16px;
    line-height: 1.2;
  }

  span {
    display: block;
    font-size: 12px;
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.82);
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
`;

const Messages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f7fafc;
`;

const MessageBubble = styled.div<{ $role: 'user' | 'bot' }>`
  width: fit-content;
  max-width: 88%;
  margin: ${({ $role }) => ($role === 'user' ? '0 0 10px auto' : '0 auto 10px 0')};
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ $role }) => ($role === 'user' ? '#ff681a' : '#ffffff')};
  color: ${({ $role }) => ($role === 'user' ? '#ffffff' : '#1f2937')};
  border: ${({ $role }) => ($role === 'user' ? '0' : '1px solid #e5e7eb')};
  font-size: 14px;
  line-height: 1.45;
  white-space: pre-wrap;
  overflow-wrap: anywhere;

  span {
    display: block;
  }
`;

const Typing = styled.div`
  width: fit-content;
  max-width: 88%;
  padding: 10px 12px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #64748b;
  font-size: 14px;
`;

const SuggestionList = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  overflow-x: auto;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
`;

const SuggestionButton = styled.button`
  flex: 0 0 auto;
  max-width: 220px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #123c69;
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

const ChatForm = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
`;

const ChatInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #37d4d9;
  }
`;

const SendButton = styled.button`
  width: 64px;
  height: 42px;
  border: 0;
  border-radius: 8px;
  background: #37d4d9;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #cbd5e1;
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
  font-weight: 800;
  font-size: 18px;
  box-shadow: 0 12px 30px rgba(255, 104, 26, 0.35);
  cursor: pointer;
`;

export default ChatBoxAI;
