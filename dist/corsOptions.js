"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCorsAllowlist = buildCorsAllowlist;
exports.createCorsOptions = createCorsOptions;
function normalizeOrigin(url) {
    return url.trim().replace(/\/+$/, "");
}
/**
 * Builds the CORS allowlist from env:
 * - `CORS_ORIGINS`: comma-separated URLs (preferred for multiple origins)
 * - If unset, falls back to `CLIENT_BASE_URL` (single URL, backward compatible)
 * - In non-production, `http://localhost:3000` is always included for local Next.js
 */
function buildCorsAllowlist() {
    var _a, _b;
    const rawList = (_b = (_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")) !== null && _b !== void 0 ? _b : [];
    const fromEnv = rawList.map(normalizeOrigin).filter(Boolean);
    const urls = fromEnv.length > 0
        ? fromEnv
        : process.env.CLIENT_BASE_URL
            ? [normalizeOrigin(process.env.CLIENT_BASE_URL)]
            : [];
    const set = new Set(urls);
    if (process.env.NODE_ENV !== "production") {
        set.add("http://localhost:3000");
    }
    return set;
}
function createCorsOptions(allowed) {
    return {
        origin(origin, callback) {
            if (!origin) {
                callback(null, false);
                return;
            }
            if (allowed.has(origin)) {
                callback(null, origin);
                return;
            }
            callback(null, false);
        },
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
    };
}
