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
exports.AddActivityUseCase = void 0;
const uuid_1 = require("uuid");
class AddActivityUseCase {
    constructor(markRepository) {
        this.markRepository = markRepository;
    }
    run(name, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            try {
                const addActivity = yield this.markRepository.addActivity(miuuid, name, imgUrl);
                return addActivity;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.AddActivityUseCase = AddActivityUseCase;
//# sourceMappingURL=addActivityUseCase.js.map