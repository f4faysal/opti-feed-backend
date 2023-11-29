"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.get('/', post_controller_1.PostController.getInToDB);
router.get('/:id', post_controller_1.PostController.getByIdInToDB);
router.get('/my-post/:id', post_controller_1.PostController.getPostsByUser);
router.post('/', post_controller_1.PostController.createInToDB);
router.post('/like/:id', (0, auth_1.default)(), post_controller_1.PostController.linkPostToUser);
router.patch('/:id', (0, auth_1.default)(), post_controller_1.PostController.updateInToDB);
router.delete('/:id', post_controller_1.PostController.deleteInToDB);
exports.PostRouter = router;
