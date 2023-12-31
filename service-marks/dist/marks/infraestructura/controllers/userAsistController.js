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
exports.UserAssistController = void 0;
const FUERA_RANGO = "Usuario fuera de rango.";
const ASISTENCIA_DUPLICADA = "El usuario ya ha asistido.";
class UserAssistController {
    constructor(userAsistUseCase) {
        this.userAsistUseCase = userAsistUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("aaaa");
            try {
                let { markUuid, userUuid, latitude, longitude } = req.body;
                let assistUser = yield this.userAsistUseCase.run(markUuid, userUuid, latitude, longitude);
                if (assistUser == "exitoso") {
                    return res.status(201).send({
                        status: "ok",
                        message: assistUser
                    });
                }
                else if (assistUser instanceof Error) {
                    return res.status(500).send({
                        status: "error",
                        message: assistUser.message
                    });
                }
            }
            catch (error) {
                console.log("fallo");
                if (error instanceof Error) {
                    console.log("entre 1");
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
                    message: error,
                });
            }
        });
    }
}
exports.UserAssistController = UserAssistController;
//# sourceMappingURL=userAsistController.js.map