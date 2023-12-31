"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adActivityController = exports.addActivityUseCase = exports.listActivitysController = exports.listActivitysUseCase = exports.userAssistController = exports.userAssistUseCase = exports.listMarkController = exports.addOwnerMarksUseCase = exports.listMarkUseCase = exports.createMarkController = exports.createMarkUseCase = exports.mysqlMarkRepository = void 0;
const addActivityUseCase_1 = require("../application/addActivityUseCase");
const addOwnerMarksUseCase_1 = require("../application/addOwnerMarksUseCase");
const createMarkUseCase_1 = require("../application/createMarkUseCase");
const listActyvitiysUseCase_1 = require("../application/listActyvitiysUseCase");
const listMarksUseCase_1 = require("../application/listMarksUseCase");
const userAsistUseCase_1 = require("../application/userAsistUseCase");
const addActivityController_1 = require("./controllers/addActivityController");
const createMarkController_1 = require("./controllers/createMarkController");
const listActivitysController_1 = require("./controllers/listActivitysController");
const listMarksController_1 = require("./controllers/listMarksController");
const userAsistController_1 = require("./controllers/userAsistController");
const mysqlMarkRepository_1 = require("./mysqlMarkRepository");
exports.mysqlMarkRepository = new mysqlMarkRepository_1.MysqlMarkRepository();
exports.createMarkUseCase = new createMarkUseCase_1.CreateMarkUseCase(exports.mysqlMarkRepository);
exports.createMarkController = new createMarkController_1.CreateMarkController(exports.createMarkUseCase);
exports.listMarkUseCase = new listMarksUseCase_1.ListMarkUseCase(exports.mysqlMarkRepository);
exports.addOwnerMarksUseCase = new addOwnerMarksUseCase_1.AddOwnerMarksUseCase(exports.mysqlMarkRepository);
exports.listMarkController = new listMarksController_1.ListMarkController(exports.listMarkUseCase, exports.addOwnerMarksUseCase);
exports.userAssistUseCase = new userAsistUseCase_1.UserAsistUseCase(exports.mysqlMarkRepository);
exports.userAssistController = new userAsistController_1.UserAssistController(exports.userAssistUseCase);
exports.listActivitysUseCase = new listActyvitiysUseCase_1.ListActivitysUseCase(exports.mysqlMarkRepository);
exports.listActivitysController = new listActivitysController_1.ListActivitysController(exports.listActivitysUseCase);
exports.addActivityUseCase = new addActivityUseCase_1.AddActivityUseCase(exports.mysqlMarkRepository);
exports.adActivityController = new addActivityController_1.AddActivityController(exports.addActivityUseCase);
//# sourceMappingURL=dependencies.js.map