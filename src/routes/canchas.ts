import { Router } from 'express';
import { CanchaController } from '../controllers/cancha';

const router = Router();

router.post('/', CanchaController.createCancha)
router.get('/', CanchaController.getAllCanchas);
router.get('/:id', CanchaController.getOneCancha);
router.delete('/:id', CanchaController.deleteCancha);

export default router;