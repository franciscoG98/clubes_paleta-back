"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canchaUpdateValidationRules = exports.canchaValidationRules = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
exports.canchaValidationRules = [
    (0, express_validator_1.body)("club").trim().notEmpty().withMessage("El nombre del club es obligatorio."),
    (0, express_validator_1.body)("city").trim().notEmpty().withMessage("La ciudad es obligatoria."),
    (0, express_validator_1.body)("state").trim().notEmpty().withMessage("La provincia es obligatoria."),
    (0, express_validator_1.body)("type")
        .isIn(["Trinquete", "Frontón", "Cajón"])
        .withMessage("El tipo debe ser Trinquete, Frontón o Cajón."),
    (0, express_validator_1.body)("maps_location").trim().notEmpty().withMessage("La dirección es obligatoria."),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("El teléfono es obligatorio.")
        .matches(/^\d{8,15}$/)
        .withMessage("El teléfono debe tener entre 8 y 15 dígitos."),
];
exports.canchaUpdateValidationRules = [
    (0, express_validator_1.body)("club").optional().trim().notEmpty().withMessage("El nombre del club no puede estar vacío."),
    (0, express_validator_1.body)("city").optional().trim().notEmpty().withMessage("La ciudad no puede estar vacía."),
    (0, express_validator_1.body)("state").optional().trim().notEmpty().withMessage("La provincia no puede estar vacía."),
    (0, express_validator_1.body)("type")
        .optional()
        .isIn(["Trinquete", "Frontón", "Cajón"])
        .withMessage("El tipo debe ser Trinquete, Frontón o Cajón."),
    (0, express_validator_1.body)("maps_location").optional().trim().notEmpty().withMessage("La dirección no puede estar vacía."),
    (0, express_validator_1.body)("phone")
        .optional()
        .matches(/^\d{8,15}$/)
        .withMessage("El teléfono debe tener entre 8 y 15 dígitos."),
];
