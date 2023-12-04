"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUuidController = exports.getUserByUuidUseCase = exports.updatePasswordController = exports.updatePasswordUserUsecase = exports.updateUserByIdController = exports.updateUserByIdUseCase = exports.loginUserController = exports.loginUserUseCase = exports.resgisterUserController = exports.registerUserUseCase = exports.mysqlUserRepository = void 0;
const mysqUserRepository_1 = require("./mysqUserRepository");
const registerUseCase_1 = require("../application/registerUseCase");
const registerController_1 = require("./controllers/registerController");
const loginUserController_1 = require("./controllers/loginUserController");
const loginUserUseCase_1 = require("../application/loginUserUseCase");
const updateUserByIdUseCase_1 = require("../application/updateUserByIdUseCase");
const updateUseByIdController_1 = require("./controllers/updateUseByIdController");
const updatePasswordUserUseCase_1 = require("../application/updatePasswordUserUseCase");
const updatePasswordUserController_1 = require("./controllers/updatePasswordUserController");
const getUserByUuidUseCase_1 = require("../application/getUserByUuidUseCase");
const getUserByUuidUseCase_2 = require("./controllers/getUserByUuidUseCase");
exports.mysqlUserRepository = new mysqUserRepository_1.MysqlUserRepository();
exports.registerUserUseCase = new registerUseCase_1.RegisterUserUseCase(exports.mysqlUserRepository);
exports.resgisterUserController = new registerController_1.ResgisterUserController(exports.registerUserUseCase);
exports.loginUserUseCase = new loginUserUseCase_1.LoginUserUseCase(exports.mysqlUserRepository);
exports.loginUserController = new loginUserController_1.LoginUserController(exports.loginUserUseCase);
exports.updateUserByIdUseCase = new updateUserByIdUseCase_1.UpdateUserByIdUseCase(exports.mysqlUserRepository);
exports.updateUserByIdController = new updateUseByIdController_1.UpdateUserByIdController(exports.updateUserByIdUseCase);
exports.updatePasswordUserUsecase = new updatePasswordUserUseCase_1.UpdatePasswordUserUsecase(exports.mysqlUserRepository);
exports.updatePasswordController = new updatePasswordUserController_1.UpdatePasswordController(exports.updatePasswordUserUsecase);
exports.getUserByUuidUseCase = new getUserByUuidUseCase_1.GetUserByUuidUseCase(exports.mysqlUserRepository);
exports.getUserByUuidController = new getUserByUuidUseCase_2.GetUserByUuidController(exports.getUserByUuidUseCase);
//# sourceMappingURL=dependencies.js.map