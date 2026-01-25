"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const messageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
        validate: [(val) => val && validator_1.default.isEmail(val), 'Please provide a valid email address.'],
    },
    subject: {
        type: String,
        required: [true, 'Please provide subject.'],
    },
    content: {
        type: String,
        required: [true, 'Please provide a message.'],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Message', messageSchema);
