"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAddressColumns = ensureAddressColumns;
/** PostgreSQL: duplicate_column */
const PG_DUPLICATE_COLUMN = "42701";
/**
 * `sequelize.sync({ force: false })` does not add new columns to existing tables.
 * This aligns DB schema with models when `address` was added after deploy.
 */
async function ensureAddressColumns(sequelize) {
    var _a;
    for (const table of ["canchas", "pendingCanchas"]) {
        try {
            await sequelize.query(`ALTER TABLE "${table}" ADD COLUMN "address" VARCHAR(255) NOT NULL DEFAULT '';`);
        }
        catch (err) {
            const code = err && typeof err === "object" && "parent" in err
                ? (_a = err.parent) === null || _a === void 0 ? void 0 : _a.code
                : undefined;
            if (code !== PG_DUPLICATE_COLUMN)
                throw err;
        }
    }
}
