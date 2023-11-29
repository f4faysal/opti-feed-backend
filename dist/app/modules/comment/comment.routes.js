"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.get('/', comment_controller_1.CommentController.getInToDB);
router.get('/:id', comment_controller_1.CommentController.getByIdInToDB);
router.post('/', comment_controller_1.CommentController.createInToDB);
router.patch('/', comment_controller_1.CommentController.updateInToDB);
router.delete('/', comment_controller_1.CommentController.deleteInToDB);
exports.CommentRouter = router;
