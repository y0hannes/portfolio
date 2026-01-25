"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.createMessage = exports.getMessages = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const getMessages = async (req, res) => {
    try {
        const messages = await messageModel_1.default.find();
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({ err: 'Server error' });
    }
};
exports.getMessages = getMessages;
const createMessage = async (req, res) => {
    try {
        const { name, email, content } = req.body;
        if (!name || !email || !content) {
            return res.status(400).json({ err: 'All fields should be field' });
        }
        const message = new messageModel_1.default({ name, email, content });
        await message.save();
        res.status(201).json({ msg: 'Message created' });
    }
    catch (err) {
        res.status(500).json({ err: 'Server error' });
    }
};
exports.createMessage = createMessage;
const deleteMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = await messageModel_1.default.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ err: 'Message does not exist' });
        }
        res.status(200).json({ msg: 'Message deleted' });
    }
    catch (err) {
        next(err);
        res.status(500).json({ err: 'Server error' });
    }
};
exports.deleteMessage = deleteMessage;
