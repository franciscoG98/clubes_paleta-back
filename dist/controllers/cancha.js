"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCancha = exports.deleteCancha = exports.getOneCancha = exports.createCancha = exports.getCanchasCount = exports.getAllCanchas = void 0;
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
const UPDATABLE_CANCHA_FIELDS = [
    "club",
    "city",
    "state",
    "type",
    "maps_location",
    "phone",
    "image",
    "address",
];
const { Cancha } = models_1.default;
const getAllCanchas = async (req, res) => {
    try {
        // TODO:filter cancha by club name (as query?)
        const { city, state, type, address } = req.query;
        const filters = {};
        if (typeof city === "string")
            filters.city = city;
        if (typeof state === "string")
            filters.state = state;
        if (typeof type === "string" && (type == "Trinquete" || type == "Frontón" || type == "Cajón")) {
            filters.type = type;
        }
        if (typeof address === "string" && address.trim()) {
            filters.address = { [sequelize_1.Op.iLike]: `%${address.trim()}%` };
        }
        const canchas = await Cancha.findAll({
            where: filters,
        });
        res.json(canchas);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error fetching canchas");
    }
};
exports.getAllCanchas = getAllCanchas;
const getCanchasCount = async (req, res) => {
    try {
        const { count } = await Cancha.findAndCountAll();
        res.json(count);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error fetching canchas");
    }
};
exports.getCanchasCount = getCanchasCount;
// TODO: nanoid to create random uniques ids
const createCancha = async (req, res) => {
    const { club, city, state, type, maps_location, phone, address } = req.body;
    let { image } = req.body;
    if (!image)
        image = "/uploads/cancha_default.webp";
    try {
        const newCancha = await Cancha.create({
            club,
            city,
            state,
            type,
            maps_location,
            phone,
            image,
            address
        });
        res.status(201).json(newCancha);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("The cancha could not be created");
    }
};
exports.createCancha = createCancha;
const getOneCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const cancha = await Cancha.findByPk(id);
        if (!cancha) {
            res.status(404).json({ message: "Cancha not found" });
            return;
        }
        res.json(cancha);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error fetching cancha");
    }
};
exports.getOneCancha = getOneCancha;
const deleteCancha = async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: is it ok to use .destroy() method??????
        const canchaToRemove = await Cancha.destroy({ where: { id } });
        if (!canchaToRemove) {
            res.status(404).json({ message: "Cancha not found" });
            return;
        }
        res.status(204).json({ message: "Cancha successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error fetching cancha");
    }
};
exports.deleteCancha = deleteCancha;
const updateCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const canchaToEdit = await Cancha.findByPk(id);
        if (!canchaToEdit) {
            res.status(404).json({ message: "Cancha not found" });
            return;
        }
        const updateData = {};
        for (const key of UPDATABLE_CANCHA_FIELDS) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                updateData[key] = req.body[key];
            }
        }
        await canchaToEdit.update(updateData);
        res.status(200).json(canchaToEdit);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error updating cancha");
    }
};
exports.updateCancha = updateCancha;
