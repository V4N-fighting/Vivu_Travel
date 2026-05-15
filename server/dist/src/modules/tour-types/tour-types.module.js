"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourTypesModule = void 0;
const common_1 = require("@nestjs/common");
const tour_types_controller_1 = require("./tour-types.controller");
const tour_types_service_1 = require("./tour-types.service");
const tour_types_repository_1 = require("./tour-types.repository");
let TourTypesModule = class TourTypesModule {
};
exports.TourTypesModule = TourTypesModule;
exports.TourTypesModule = TourTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [tour_types_controller_1.TourTypesController],
        providers: [tour_types_service_1.TourTypesService, tour_types_repository_1.TourTypesRepository],
        exports: [tour_types_service_1.TourTypesService]
    })
], TourTypesModule);
//# sourceMappingURL=tour-types.module.js.map