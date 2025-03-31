import { Router } from 'express';
import { PendingCanchaController, uploadMiddleware } from "../controllers/pendingCancha"
// import PendingCanchaController, { uploadMiddleware } from "../controllers/pendingCancha"

const router = Router();

router.post("/", uploadMiddleware, PendingCanchaController.createPendingCancha);
router.get('/', PendingCanchaController.getAllPendingCanchas);
router.put('/:id', PendingCanchaController.updatePendingCancha);
router.post('/approve-cancha/:id', PendingCanchaController.approvePendingCancha)

export default router;
