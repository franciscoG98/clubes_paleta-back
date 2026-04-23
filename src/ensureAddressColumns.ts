import { Sequelize } from "sequelize";

/** PostgreSQL: duplicate_column */
const PG_DUPLICATE_COLUMN = "42701";

/**
 * `sequelize.sync({ force: false })` does not add new columns to existing tables.
 * This aligns DB schema with models when `address` was added after deploy.
 */
export async function ensureAddressColumns(sequelize: Sequelize): Promise<void> {
  for (const table of ["canchas", "pendingCanchas"]) {
    try {
      await sequelize.query(
        `ALTER TABLE "${table}" ADD COLUMN "address" VARCHAR(255) NOT NULL DEFAULT '';`,
      );
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "parent" in err
          ? (err as { parent?: { code?: string } }).parent?.code
          : undefined;
      if (code !== PG_DUPLICATE_COLUMN) throw err;
    }
  }
}
