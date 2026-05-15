import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatbotService } from './chatbot.service';
import { ChatRequest } from './chatbot.types';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async ask(@Body() body: ChatRequest) {
    return this.chatbotService.ask(body);
  }

  @Post('stream')
  async stream(@Body() body: ChatRequest, @Res() response: Response) {
    response.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache, no-transform');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders?.();

    try {
      for await (const chunk of this.chatbotService.stream(body)) {
        response.write(`data: ${JSON.stringify({ type: 'delta', content: chunk, sessionId: body.sessionId })}\n\n`);
      }
      response.write(`data: ${JSON.stringify({ type: 'done', sessionId: body.sessionId })}\n\n`);
    } catch (error) {
      response.write(`data: ${JSON.stringify({ type: 'error', message: (error as Error).message })}\n\n`);
    } finally {
      response.end();
    }
  }

  @Get('history/:sessionId')
  async history(@Param('sessionId') sessionId: string) {
    return this.chatbotService.getHistory(sessionId);
  }
}
