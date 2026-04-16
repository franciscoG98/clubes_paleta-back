import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
};

export const canchaValidationRules = [
  body('club').trim().notEmpty().withMessage('El nombre del club es obligatorio.'),
  body('city').trim().notEmpty().withMessage('La ciudad es obligatoria.'),
  body('state').trim().notEmpty().withMessage('La provincia es obligatoria.'),
  body('type')
    .isIn(['Trinquete', 'Frontón', 'Cajón'])
    .withMessage('El tipo debe ser Trinquete, Frontón o Cajón.'),
  body('maps_location').trim().notEmpty().withMessage('La dirección es obligatoria.'),
  body('phone')
    .notEmpty()
    .withMessage('El teléfono es obligatorio.')
    .matches(/^\d{8,15}$/)
    .withMessage('El teléfono debe tener entre 8 y 15 dígitos.'),
];

export const canchaUpdateValidationRules = [
  body('club').optional().trim().notEmpty().withMessage('El nombre del club no puede estar vacío.'),
  body('city').optional().trim().notEmpty().withMessage('La ciudad no puede estar vacía.'),
  body('state').optional().trim().notEmpty().withMessage('La provincia no puede estar vacía.'),
  body('type')
    .optional()
    .isIn(['Trinquete', 'Frontón', 'Cajón'])
    .withMessage('El tipo debe ser Trinquete, Frontón o Cajón.'),
  body('maps_location').optional().trim().notEmpty().withMessage('La dirección no puede estar vacía.'),
  body('phone')
    .optional()
    .matches(/^\d{8,15}$/)
    .withMessage('El teléfono debe tener entre 8 y 15 dígitos.'),
];
