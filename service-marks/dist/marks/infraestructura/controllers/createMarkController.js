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
exports.CreateMarkController = void 0;
const saveImages_1 = require("../../../helpers/saveImages");
class CreateMarkController {
    constructor(createMarkUseCase) {
        this.createMarkUseCase = createMarkUseCase;
    }
    run(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { latitude, longitude, description, endDate, userUuid, activityUuid, } = req.body;
                const urlImage = yield (0, saveImages_1.verfyImage)((_a = req.files) === null || _a === void 0 ? void 0 : _a.img_file);
                let createMark = yield this.createMarkUseCase.run(latitude, longitude, description, urlImage, endDate, userUuid, activityUuid);
                console.log(typeof (createMark));
                return res.status(201).send({
                    status: "ok",
                    message: createMark
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.startsWith('[')) {
                        const errors = JSON.parse(error.message);
                        const modifiedErrors = errors.map(({ property, children, constraints }) => ({
                            property,
                            children,
                            constraints
                        }));
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: modifiedErrors
                        });
                    }
                }
                return res.status(500).send({
                    status: "error",
                    message: ("An error occurred while adding the Mark. " + error)
                });
            }
        });
    }
}
exports.CreateMarkController = CreateMarkController;
//# sourceMappingURL=createMarkController.js.map