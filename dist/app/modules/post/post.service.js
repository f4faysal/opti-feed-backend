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
exports.PostService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createInToDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.create({ data: paylod });
    return result;
});
const getInToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findMany({
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const getByIdInToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findUnique({
        where: { id },
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
            user: true,
        },
    });
    return result;
});
const updateInToDB = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.update({ where: { id }, data: paylod });
    return result;
});
const deleteInToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield prisma_1.default.comment.findMany({
        where: {
            postId: id,
        },
    });
    if (comments.length > 0) {
        yield prisma_1.default.comment.deleteMany({
            where: {
                postId: id,
            },
        });
    }
    const result = yield prisma_1.default.post.delete({ where: { id } });
    return result;
});
const getPostsByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findMany({
        where: {
            userId: id,
        },
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
const linkPostToUser = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma_1.default.post.findUnique({
        where: {
            id: postId,
        },
    });
    let updatedLikedIds = [...(post.likedIds || [])];
    updatedLikedIds.push(userId);
    try {
        if (post === null || post === void 0 ? void 0 : post.userId) {
            yield prisma_1.default.notification.create({
                data: {
                    body: 'Someone liked your Post!',
                    userId: post.userId,
                },
            });
            yield prisma_1.default.user.update({
                where: {
                    id: post.userId,
                },
                data: {
                    hasNotification: true,
                },
            });
        }
    }
    catch (error) {
        console.log(error);
    }
    const hasLiked = () => {
        const list = (post === null || post === void 0 ? void 0 : post.likedIds) || [];
        return list.includes(userId);
    };
    if (hasLiked()) {
        updatedLikedIds = updatedLikedIds.filter(likedId => likedId !== userId);
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikedIds,
            },
        });
        return updatedPost;
    }
    else {
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikedIds,
            },
        });
        return updatedPost;
    }
});
exports.PostService = {
    getInToDB,
    getByIdInToDB,
    createInToDB,
    updateInToDB,
    deleteInToDB,
    getPostsByUser,
    linkPostToUser,
};
