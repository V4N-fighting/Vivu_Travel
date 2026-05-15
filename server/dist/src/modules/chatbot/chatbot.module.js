"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotModule = void 0;
const common_1 = require("@nestjs/common");
const postgres_module_1 = require("../../database/postgres.module");
const chatbot_controller_1 = require("./chatbot.controller");
const chatbot_service_1 = require("./chatbot.service");
const chatbot_repository_1 = require("./chatbot.repository");
const gemini_travel_service_1 = require("./gemini-travel.service");
const recommendation_service_1 = require("./recommendation.service");
let ChatbotModule = class ChatbotModule {
};
exports.ChatbotModule = ChatbotModule;
exports.ChatbotModule = ChatbotModule = __decorate([
    (0, common_1.Module)({
        imports: [postgres_module_1.PostgresModule],
        controllers: [chatbot_controller_1.ChatbotController],
        providers: [
            chatbot_service_1.ChatbotService,
            chatbot_repository_1.ChatbotRepository,
            gemini_travel_service_1.GeminiTravelService,
            recommendation_service_1.RecommendationService,
        ],
    })
], ChatbotModule);
//# sourceMappingURL=chatbot.module.js.map