import { Module } from '@nestjs/common';
import { PostgresModule } from '../../database/postgres.module';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotRepository } from './chatbot.repository';
import { GeminiTravelService } from './gemini-travel.service';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [PostgresModule],
  controllers: [ChatbotController],
  providers: [
    ChatbotService,
    ChatbotRepository,
    GeminiTravelService,
    RecommendationService,
  ],
})
export class ChatbotModule {}
