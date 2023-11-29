"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const register = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(255),
        username: zod_1.z.string().min(3).max(255),
        email: zod_1.z.string().email(),
        hashedPassword: zod_1.z.string().min(6).max(255),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        hashedPassword: zod_1.z.string().min(6).max(255),
    }),
});
exports.userValidation = {
    register,
    login,
};
