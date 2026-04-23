-- Run once if you prefer not to rely on startup auto-migration (see ensureAddressColumns.ts).
-- psql "$PSQL_CONNECTION_STRING" -f sql/add-address-columns.sql

ALTER TABLE "canchas" ADD COLUMN IF NOT EXISTS "address" VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE "pendingCanchas" ADD COLUMN IF NOT EXISTS "address" VARCHAR(255) NOT NULL DEFAULT '';
