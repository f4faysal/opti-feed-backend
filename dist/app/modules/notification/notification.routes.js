"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(), notification_controller_1.NotificationController.getInToDB);
router.get('/:id', notification_controller_1.NotificationController.getByIdInToDB);
router.post('/', notification_controller_1.NotificationController.createInToDB);
router.patch('/', notification_controller_1.NotificationController.updateInToDB);
router.delete('/', notification_controller_1.NotificationController.deleteInToDB);
exports.NotificationRouter = router;
