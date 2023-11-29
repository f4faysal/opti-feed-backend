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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createInToDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.create({ data: paylod });
    return result;
});
const getInToDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const getByIdInToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.findUnique({
        where: { id },
    });
    return result;
});
const updateInToDB = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.update({
        where: { id },
        data: paylod,
    });
    return result;
});
const deleteInToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.notification.delete({ where: { id } });
    return result;
});
exports.NotificationService = {
    getInToDB,
    getByIdInToDB,
    createInToDB,
    updateInToDB,
    deleteInToDB,
};
