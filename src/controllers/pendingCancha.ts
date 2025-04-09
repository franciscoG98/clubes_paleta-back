import { Handler } from 'express';
import db from '../models';
import multer from 'multer';
import { Cancha } from '../models/cancha';

const { PendingCancha } = db;

// TODO: path in the client
// const DEFAULT_IMAGE_PATH = '/public/cancha_default.webp';
const DEFAULT_IMAGE_PATH = '/uploads/cancha_default.webp';

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

interface Filter {
  pending?: boolean;
}

export const getAllPendingCanchas: Handler = async (req, res) => {
  try {
    const { pending } = req.query;

    const filters: Filter = {};
    if (typeof pending === 'boolean') filters.pending = pending;

    const pendingCanchas = await PendingCancha.findAll({
      where: filters,
    });

    res.json(pendingCanchas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching pending canchas');
  }
}

export const createPendingCancha: Handler = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).send('The cancha could not be created');
  }
}

export const approvePendingCancha: Handler = async (req, res) => {
  const { id } = req.params;

  try {
    const pendingCancha = await PendingCancha.findOne({ where: { id: Number(id) } })

    if (!pendingCancha) {
      res.status(404).json({ message: "Pending cancha not found" })
    }

    // Parse and clean
    const pendingCanchaData = pendingCancha.toJSON()
    delete pendingCanchaData.id
    delete pendingCanchaData.createdAt
    delete pendingCanchaData.updatedAt

    // Create a new cancha with the pending cancha data
    const newCancha = await Cancha.create(pendingCanchaData)

    // Delete the pending cancha
    await PendingCancha.destroy({ where: { id: Number(id) } })

    res.status(200).json({
      message: "Cancha approved successfully",
      cancha: newCancha,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Error approving cancha")
  }
}

export const updatePendingCancha: Handler = async (req, res) =>{
  try {
    const { id } = req.params;
    const { pending } = req.body;

    if (!id) {
      res.status(404).json({ error: 'Cancha no encontrada' });
    }

    const updatedCancha = await PendingCancha.update(
      { pending }, 
      { where: { id: Number(id) } }
    );

    if (updatedCancha[0] === 0) {
      res.status(404).json({ error: 'No se encontró la cancha o el valor no cambió' });
    }

    res.status(200).json({ message: 'Cancha actualizada con éxito' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating cancha');
  }
}

export const deletePendingCancha: Handler = async (req, res) =>{
  try {
    const { id } = req.params;
    const pendingCanchaToRemove = await PendingCancha.destroy({ where: { id } })

    if (!pendingCanchaToRemove) {
      res.status(404).json({ message: 'Pending cancha not found' });
      return;
    }

    res.status(204).json({ message : 'Pending cancha successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting pending cancha');
  }
}

export const uploadMiddleware = upload.single("image");
