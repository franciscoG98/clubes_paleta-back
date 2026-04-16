"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
const canchas_1 = __importDefault(require("./routes/canchas"));
const pendingCancha_1 = __importDefault(require("./routes/pendingCancha"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = require("swagger-ui-express");
const swaggerOptions_1 = require("./swaggerOptions");
const corsOptions_1 = require("./corsOptions");
const app = (0, express_1.default)();
const corsAllowlist = (0, corsOptions_1.buildCorsAllowlist)();
app.use((0, cors_1.default)((0, corsOptions_1.createCorsOptions)(corsAllowlist)));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.disable('x-powered-by');
// TODO: imagenes canchas
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// TODO: port on env
const PORT = process.env.PORT || 3001;
// routes
app.get('/', (req, res) => {
    res.send('Hello my pelotari friend!');
});
app.use('/canchas', canchas_1.default);
app.use('/pending-canchas', pendingCancha_1.default);
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
app.use('/docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(specs));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});
// db sync
const syncDatabase = async () => {
    try {
        // await (db as any).sequelize.sync({ force: true });
        await models_1.default.sequelize.sync({ force: false });
        console.log('\nDatabase successfully synchronized.');
    }
    catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};
// sync db and after start server
syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT} \n`);
    });
});
