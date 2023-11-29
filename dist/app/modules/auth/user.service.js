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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const sendResetMail_1 = require("./sendResetMail");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.hashedPassword) {
        user.hashedPassword = config_1.default.default_pass;
    }
    user.hashedPassword = yield bcrypt_1.default.hash(user.hashedPassword, Number(config_1.default.bycrypt_salt_rounds));
    const newUser = yield prisma_1.default.user.create({ data: user });
    const { id: userId, username } = newUser;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, username }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, username }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        newUser,
        accessToken,
        refreshToken,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, hashedPassword } = payload;
    const isPasswordMatched = (givenPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
    const isUserExist = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.hashedPassword &&
        !(yield isPasswordMatched(hashedPassword, isUserExist.hashedPassword))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { id: userId, username } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, username }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const updateProfile = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({ where: { id }, data: user });
    return result;
});
const getProfile = (username, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({ where: { id: username } });
    console.log(username, 'getProfile');
    const followersCount = yield prisma_1.default.user.count({
        where: {
            followingIds: {
                has: userId,
            },
        },
    });
    console.log(followersCount, 'profile');
    return result;
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({ where: { username } });
    const followersCount = yield prisma_1.default.user.count({
        where: {
            followingIds: {
                has: (result === null || result === void 0 ? void 0 : result.id) || '',
            },
        },
    });
    console.log(followersCount, getUserByUsername);
    return result;
});
const updatedFollow = (currentUserId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    const updatedFollowingIds = [...(user.followingIds || [])];
    updatedFollowingIds.push(userId);
    // NOTIFICATION PART START
    try {
        yield prisma_1.default.notification.create({
            data: {
                body: 'Someone followed you!',
                userId,
            },
        });
        yield prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: true,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
    // NOTIFICATION PART END
    const updatedUser = yield prisma_1.default.user.update({
        where: {
            id: currentUserId,
        },
        data: {
            followingIds: updatedFollowingIds,
        },
    });
    return updatedUser;
});
const getFollowersCount = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({ where: { username } });
    const followersCount = yield prisma_1.default.user.count({
        where: {
            followingIds: {
                has: result === null || result === void 0 ? void 0 : result.id,
            },
        },
    });
    return followersCount;
});
const changePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    const isPasswordMatched = (givenPassword, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
    if (user.hashedPassword &&
        !(yield isPasswordMatched(oldPassword, user.hashedPassword))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    const updatedUser = yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            hashedPassword,
        },
    });
    return updatedUser;
});
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    const passResetToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user.id, username: user.username }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const resetLink = config_1.default.resetlink + `email=${user.email}&token=${passResetToken}`;
    yield (0, sendResetMail_1.sendEmail)(user.email, `
      <div>
        <p>Hi, ${user.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <a href=${resetLink}>${resetLink}</a>
        <p>Thank you</p>
      </div>
  `);
    return {
        message: 'Reset password link sent to your email, inbox or spam folder please',
    };
});
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    const updatedUser = yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            hashedPassword,
        },
    });
    return updatedUser;
});
exports.UserService = {
    registerUser,
    loginUser,
    updateProfile,
    getProfile,
    getUserByUsername,
    updatedFollow,
    getFollowersCount,
    changePassword,
    forgotPassword,
    resetPassword,
};
