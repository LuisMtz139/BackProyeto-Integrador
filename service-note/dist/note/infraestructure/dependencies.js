"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteByUserController = exports.getNotesByUserUseCase = exports.updateNoteController = exports.updateNoteUseCase = exports.createNoteController = exports.createNoteUseCase = exports.deleteFileController = exports.deleteFileUseCase = exports.mysqlNoteRepository = void 0;
const mysqlNoteRepository_1 = require("./mysqlNoteRepository");
const deleteFileUseCase_1 = require("../application/deleteFileUseCase");
const deleteFileController_1 = require("./controllers/deleteFileController");
const createNoteUseCase_1 = require("../application/createNoteUseCase");
const createNoteController_1 = require("./controllers/createNoteController");
const updateNoteUseCase_1 = require("../application/updateNoteUseCase");
const updateNoteController_1 = require("./controllers/updateNoteController");
const getNoteByUserUseCase_1 = require("../application/getNoteByUserUseCase");
const getNoteByUserController_1 = require("./controllers/getNoteByUserController");
exports.mysqlNoteRepository = new mysqlNoteRepository_1.MysqlNoteRepository();
exports.deleteFileUseCase = new deleteFileUseCase_1.DeleteFileUseCase(exports.mysqlNoteRepository);
exports.deleteFileController = new deleteFileController_1.DeleteFileController(exports.deleteFileUseCase);
exports.createNoteUseCase = new createNoteUseCase_1.CreateNoteUseCase(exports.mysqlNoteRepository);
exports.createNoteController = new createNoteController_1.CreateNoteController(exports.createNoteUseCase);
exports.updateNoteUseCase = new updateNoteUseCase_1.UpdateNoteUseCase(exports.mysqlNoteRepository);
exports.updateNoteController = new updateNoteController_1.UpdateNoteController(exports.updateNoteUseCase);
exports.getNotesByUserUseCase = new getNoteByUserUseCase_1.GetNotesByUserUseCase(exports.mysqlNoteRepository);
exports.getNoteByUserController = new getNoteByUserController_1.GetNoteByUserController(exports.getNotesByUserUseCase);
//# sourceMappingURL=dependencies.js.map