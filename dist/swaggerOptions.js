"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cancha de Paleta server",
            version: "1.0.0",
            description: "Servidor de Canchas de pelota paleta"
        },
        // TODO: add production server
        servers: [
            {
                url: "http://localhost:3001/"
            }
        ],
    },
    apis: ["./src/routes/*.ts"]
};
