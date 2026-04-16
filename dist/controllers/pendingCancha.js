"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.deletePendingCancha = exports.updatePendingCancha = exports.approvePendingCancha = exports.createPendingCancha = exports.getAllPendingCanchas = void 0;
const models_1 = __importDefault(require("../models"));
const multer_1 = __importDefault(require("multer"));
const cancha_1 = require("../models/cancha");
const { PendingCancha } = models_1.default;
// TODO: path in the client
// const DEFAULT_IMAGE_PATH = '/public/cancha_default.webp';
const DEFAULT_IMAGE_PATH = '/uploads/cancha_default.webp';
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const getAllPendingCanchas = async (req, res) => {
    try {
        const { pending } = req.query;
        const filters = {};
        if (typeof pending === 'boolean')
            filters.pending = pending;
        const pendingCanchas = await PendingCancha.findAll({
            where: filters,
        });
        res.json(pendingCanchas);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching pending canchas');
    }
};
exports.getAllPendingCanchas = getAllPendingCanchas;
const createPendingCancha = async (req, res) => {
    const { club, city, state, type, maps_location, phone } = req.body;
    // Si no se subió archivo y no hay imagen en el body, usar la imagen por defecto
    const image = req.file ? `/uploads/${req.file.filename}` : DEFAULT_IMAGE_PATH;
    try {
        const newPendingCancha = await PendingCancha.create({
            club,
            city,
            state,
            type,
            maps_location,
            phone,
            image
        });
        res.status(201).json(newPendingCancha);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('The cancha could not be created');
    }
};
exports.createPendingCancha = createPendingCancha;
const approvePendingCancha = async (req, res) => {
    const { id } = req.params;
    try {
        const pendingCancha = await PendingCancha.findOne({ where: { id: Number(id) } });
        if (!pendingCancha) {
            res.status(404).json({ message: "Pending cancha not found" });
            return;
        }
        // Parse and clean
        const pendingCanchaData = pendingCancha.toJSON();
        delete pendingCanchaData.id;
        delete pendingCanchaData.createdAt;
        delete pendingCanchaData.updatedAt;
        // Create a new cancha with the pending cancha data
        const newCancha = await cancha_1.Cancha.create(pendingCanchaData);
        // Delete the pending cancha
        await PendingCancha.destroy({ where: { id: Number(id) } });
        res.status(200).json({
            message: "Cancha approved successfully",
            cancha: newCancha,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error approving cancha");
    }
};
exports.approvePendingCancha = approvePendingCancha;
const updatePendingCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const { pending } = req.body;
        if (!id) {
            res.status(404).json({ error: 'Cancha no encontrada' });
        }
        const updatedCancha = await PendingCancha.update({ pending }, { where: { id: Number(id) } });
        if (updatedCancha[0] === 0) {
            res.status(404).json({ error: 'No se encontró la cancha o el valor no cambió' });
        }
        res.status(200).json({ message: 'Cancha actualizada con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error updating cancha');
    }
};
exports.updatePendingCancha = updatePendingCancha;
const deletePendingCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const pendingCanchaToRemove = await PendingCancha.destroy({ where: { id } });
        if (!pendingCanchaToRemove) {
            res.status(404).json({ message: 'Pending cancha not found' });
            return;
        }
        res.status(204).json({ message: 'Pending cancha successfully deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error deleting pending cancha');
    }
};
exports.deletePendingCancha = deletePendingCancha;
exports.uploadMiddleware = upload.single("image");
