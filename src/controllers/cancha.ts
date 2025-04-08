import { Handler } from 'express';
import db from '../models';
import path from 'path';

interface Filter {
  city?: string;
  state?: string;
  type?: 'Trinquete' | 'Frontón' | 'Cajón';
}

const { Cancha } = db;

export const getAllCanchas: Handler = async (req, res) => {
  try {
    // TODO:filter cancha by club name (as query?)
    const { city, state, type } = req.query;

    const filters: Filter = {};

    if (typeof city === 'string') filters.city = city;
    if (typeof state === 'string') filters.state = state;
    if (typeof type === 'string' && (type == 'Trinquete' || type == 'Frontón' || type == 'Cajón')) {
      filters.type = type;
    }

    const canchas = await Cancha.findAll({
      where: filters,
    });

    res.json(canchas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching canchas');
  }
}

export const getCanchasCount: Handler = async (req, res) => {
  try {
    const { count } = await Cancha.findAndCountAll();
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching canchas');
  }
}

// TODO: nanoid to create random uniques ids
export const createCancha: Handler = async (req, res) => {
  const { club, city, state, type, maps_location, phone } = req.body;
  let { image } = req.body;
  
  const defaultImage = path.join(__dirname, '../../uploads/cancha_default.webp');

  image ? '' : image = defaultImage;

  try {
    const newCancha = await Cancha.create({
      club,
      city,
      state,
      type,
      maps_location,
      phone,
      image
    });

    res.status(201).json(newCancha);
  } catch (error) {
      console.error(error);
      res.status(500).send('The cancha could not be created');
  }
}

export const getOneCancha: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const cancha = await Cancha.findByPk(id);
    
    if (!cancha) {
      res.status(404).json({ message: 'Cancha not found' });
      return;
    }

    res.json(cancha);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching cancha');
  }
}

export const deleteCancha: Handler = async (req, res) => {

  try {
    const { id } = req.params;
    // TODO: is it ok to use .destroy() method??????
    const canchaToRemove = await Cancha.destroy({ where: { id } })

    if (!canchaToRemove) {
      res.status(404).json({ message: 'Cancha not found' });
      return;
    }

    res.status(204).json({ message : 'Cancha deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching cancha');
  }
}

// TODO
// export const updateCancha: Handler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const canchaToEdit = await Cancha.findByPk(id);

//     if (!canchaToEdit) {
//       res.status(404).json({ message: 'Cancha not found' });
//       return;
//     }

//     await canchaToEdit.update(updateData)

//     res.status(204).json(canchaToEdit);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching cancha');
//   }
// }
