"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMarkUseCase = void 0;
const mark_1 = require("../domain/validations/mark");
const class_validator_1 = require("class-validator");
class ListMarkUseCase {
    constructor(markRepository) {
        this.markRepository = markRepository;
    }
    run(userLatitude, userLongitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const numLatitude = Number(userLatitude);
            const numLongitude = Number(userLongitude);
            let data = new mark_1.ValidatorListMark(numLatitude, numLongitude);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createMark = yield this.markRepository.listMarks(userLatitude, userLongitude);
                return createMark;
            }
            catch (error) {
                return `${error}`;
            }
        });
    }
}
exports.ListMarkUseCase = ListMarkUseCase;
//# sourceMappingURL=listMarksUseCase.js.map