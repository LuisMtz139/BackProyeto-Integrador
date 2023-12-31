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
exports.MysqlMarkRepository = void 0;
const connection_1 = require("../../database/connection");
const mark_1 = require("../domain/mark");
class MysqlMarkRepository {
    createMark(uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO pines(uuid, location, description, create_date, end_date, url_image, user_uuid, activity_uuid) VALUES (?, POINT(?, ?), ?, UTC_TIMESTAMP(), ADDDATE(UTC_TIMESTAMP(), INTERVAL ? HOUR_MINUTE), ?, ?, ?)";
                const params = [uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid];
                const [result] = yield (0, connection_1.query)(sql, params);
                return result;
            }
            catch (error) {
                console.log(error);
                return `${error}`;
            }
        });
    }
    listMarks(userLatitude, userLongitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `
            SELECT p.uuid, 
            ST_X(p.location) AS latitude, 
            ST_Y(p.location) AS longitude, 
            p.description, 
            p.create_date, 
            p.end_date, 
            p.url_image, 
            p.user_uuid, 
            p.activity_uuid,
            (ST_Distance_Sphere(
                POINT(ST_Y(p.location), ST_X(p.location)), 
                POINT(?, ?)
            ) / 1000) AS distance_km
        FROM pines p
        WHERE p.end_date > NOW()
        HAVING distance_km <= 4;     
            `;
                const [result] = yield (0, connection_1.query)(sql, [userLongitude, userLatitude]);
                console.log("aquipaaa");
                console.log(result);
                console.log("aquipaaa");
                if (!result) {
                    return null;
                }
                const rows = result;
                return result;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    userAsist(uuid, markUuid, userUuid, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkAttendanceSql = "SELECT * FROM assists WHERE user_uuid = ? AND pin_uuid = ?";
                const checkAttendanceParams = [userUuid, markUuid];
                const [attendanceResult] = yield (0, connection_1.query)(checkAttendanceSql, checkAttendanceParams);
                if (attendanceResult.length > 0) {
                    throw Error("El usuario ya ha asistido");
                }
                const sql = `SELECT ST_X(location) AS latitude, ST_Y(location) AS longitude FROM pines WHERE uuid = ?`;
                const params = [markUuid];
                const [[locationResult]] = yield (0, connection_1.query)(sql, params);
                const checkDistanceSql = `
            SELECT ST_Distance_Sphere(
                POINT(?, ?), 
                POINT(?, ?)
            ) AS distance
            `;
                const checkParams = [longitude, latitude, locationResult.longitude, locationResult.latitude];
                const [[distanceResult]] = yield (0, connection_1.query)(checkDistanceSql, checkParams);
                if (distanceResult.distance <= 500) {
                    const insertSql = "INSERT INTO assists (uuid, attended_at, pin_uuid, user_uuid) VALUES (?, UTC_TIMESTAMP(), ?, ?);";
                    const insertParams = [uuid, markUuid, userUuid];
                    yield (0, connection_1.query)(insertSql, insertParams);
                    return "exitoso";
                }
                else {
                    throw Error('Hacercate un poco mas');
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    listActyvitiys() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT uuid, name, url_image FROM activitys";
                const [results] = yield (0, connection_1.query)(sql);
                const activities = results.map((row) => new mark_1.Activity(row.uuid, row.name, row.url_image));
                return activities;
            }
            catch (error) {
                return null;
            }
        });
    }
    addActivity(uuid, name, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO activitys(uuid, name, url_image) VALUES (?,?,?)";
                const params = [uuid, name, imgUrl];
                const [rsult] = yield (0, connection_1.query)(sql, params);
                return new mark_1.Activity(uuid, name, imgUrl);
            }
            catch (error) {
                console.error("Error adding activity:", error);
                return null;
            }
        });
    }
    addOwnerMarks(owners, marks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (owners.length !== marks.length) {
                    console.error('Los arreglos owners y marks tienen longitudes diferentes.');
                    return null;
                }
                const markDescriptionsPromises = owners.map((owner, index) => __awaiter(this, void 0, void 0, function* () {
                    const userOwner = marks[index];
                    const sql = "SELECT uuid, name, url_image FROM activitys WHERE uuid = ?";
                    const [activity] = yield (0, connection_1.query)(sql, [owner.activity_uuid]);
                    return new mark_1.MarkDescription(owner.uuid, owner.latitude, owner.longitude, owner.description, owner.create_date, owner.end_date, owner.url_image, owner.user_uuid, owner.activity_uuid, [userOwner], activity[0]);
                }));
                return yield Promise.all(markDescriptionsPromises);
            }
            catch (error) {
                console.error('Error en addOwnerMarks:', error);
                throw error;
            }
        });
    }
}
exports.MysqlMarkRepository = MysqlMarkRepository;
//# sourceMappingURL=mysqlMarkRepository.js.map