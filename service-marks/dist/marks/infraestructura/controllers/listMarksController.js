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
exports.ListMarkController = void 0;
const usersOwners_1 = require("./sevices/usersOwners");
class ListMarkController {
    constructor(listMarkUseCase, addOwnerMarksUseCase) {
        this.listMarkUseCase = listMarkUseCase;
        this.addOwnerMarksUseCase = addOwnerMarksUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userLatitude, userLongitude, } = req.query;
                let createMark = yield this.listMarkUseCase.run(Number(userLatitude), Number(userLongitude));
                const recibo = yield (0, usersOwners_1.fetchUserOwners)(createMark);
                let markAddOwner = yield this.addOwnerMarksUseCase.run(createMark, recibo.data.getUser);
                return res.status(200).send({
                    status: "ok",
                    message: markAddOwner
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
                    message: "An unexpected error occurred. Please try again later.",
                });
            }
        });
    }
}
exports.ListMarkController = ListMarkController;
//# sourceMappingURL=listMarksController.js.map