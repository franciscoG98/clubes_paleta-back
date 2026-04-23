import { Handler } from "express";
import { Op } from "sequelize";
import db from "../models";

interface Filter {
  city?: string;
  state?: string;
  type?: "Trinquete" | "Frontón" | "Cajón";
  address?: { [Op.iLike]: string };
}

const UPDATABLE_CANCHA_FIELDS = [
  "club",
  "city",
  "state",
  "type",
  "maps_location",
  "phone",
  "image",
  "address",
] as const;

const { Cancha } = db;

export const getAllCanchas: Handler = async (req, res) => {
  try {
    // TODO:filter cancha by club name (as query?)
    const { city, state, type, address } = req.query;

    const filters: Filter = {};

    if (typeof city === "string") filters.city = city;
    if (typeof state === "string") filters.state = state;
    if (typeof type === "string" && (type == "Trinquete" || type == "Frontón" || type == "Cajón")) {
      filters.type = type;
    }
    if (typeof address === "string" && address.trim()) {
      filters.address = { [Op.iLike]: `%${address.trim()}%` };
    }

    const canchas = await Cancha.findAll({
      where: filters,
    });

    res.json(canchas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching canchas");
  }
}

export const getCanchasCount: Handler = async (req, res) => {
  try {
    const { count } = await Cancha.findAndCountAll();
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching canchas");
  }
}

// TODO: nanoid to create random uniques ids
export const createCancha: Handler = async (req, res) => {
  const { club, city, state, type, maps_location, phone, address } = req.body;
  let { image } = req.body;

  if (!image) image = "/uploads/cancha_default.webp";

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
  } catch (error) {
      console.error(error);
      res.status(500).send("The cancha could not be created");
  }
}

export const getOneCancha: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const cancha = await Cancha.findByPk(id);
    
    if (!cancha) {
      res.status(404).json({ message: "Cancha not found" });
      return;
    }

    res.json(cancha);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cancha");
  }
}

export const deleteCancha: Handler = async (req, res) => {

  try {
    const { id } = req.params;
    // TODO: is it ok to use .destroy() method??????
    const canchaToRemove = await Cancha.destroy({ where: { id } })

    if (!canchaToRemove) {
      res.status(404).json({ message: "Cancha not found" });
      return;
    }

    res.status(204).json({ message : "Cancha successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cancha");
  }
}

export const updateCancha: Handler = async (req, res) => {
  try {
    const { id } = req.params;

    const canchaToEdit = await Cancha.findByPk(id);

    if (!canchaToEdit) {
      res.status(404).json({ message: "Cancha not found" });
      return;
    }

    const updateData: Partial<Record<(typeof UPDATABLE_CANCHA_FIELDS)[number], unknown>> = {};
    for (const key of UPDATABLE_CANCHA_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updateData[key] = req.body[key];
      }
    }

    await canchaToEdit.update(updateData);

    res.status(200).json(canchaToEdit);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating cancha");
  }
}
