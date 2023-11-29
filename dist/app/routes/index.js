"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/auth/user.routes");
const comment_routes_1 = require("../modules/comment/comment.routes");
const notification_routes_1 = require("../modules/notification/notification.routes");
const post_routes_1 = require("../modules/post/post.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: user_routes_1.AuthRouter,
    },
    {
        path: '/post',
        routes: post_routes_1.PostRouter,
    },
    {
        path: '/comment',
        routes: comment_routes_1.CommentRouter,
    },
    {
        path: '/notification',
        routes: notification_routes_1.NotificationRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
