import { Request, Response } from 'express';
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

export class PendingCanchaController {

  static async getAllPendingCanchas(req: Request, res: Response) {
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

  static async createPendingCancha(req: Request, res: Response) {

    const { club, city, state, type, maps_location, phone } = req.body;

    // Si no se subió archivo y no hay imagen en el body, usar la imagen por defecto
    const image = req.file ? req.file.filename : DEFAULT_IMAGE_PATH;

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
      res.status(400).send('The cancha could not be created');
    }
  }

  static async approvePendingCancha(req: Request, res: Response): Promise<void>  {
    // const { id } = req.query
    const { id } = req.params;

    try {
      // Find the pending cancha
      const pendingCancha = await PendingCancha.findOne({ where: { id: Number(id) } })

      if (!pendingCancha) {
        res.status(404).json({ message: "Pending cancha not found" })
      }

      // Get the data from the pending cancha
      const pendingCanchaData = pendingCancha.toJSON()

      // Remove any Sequelize-specific fields that shouldn't be copied
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
  // ---------------------------------

  static async updatePendingCancha(req: Request, res: Response): Promise<void> {
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
      res.status(400).send('The cancha could not be updated');
    }
  }
}

export const uploadMiddleware = upload.single("image");
