# clubes_paleta-back

API en Express + Sequelize para canchas de paleta.

## Requisitos

- Node.js
- PostgreSQL

## Crear la base de datos

El proyecto usa PostgreSQL. Crea una base vacía y un usuario con permisos (como superusuario de Postgres, por ejemplo `psql -U postgres`):

```sql
CREATE USER canchas_user WITH PASSWORD "elige_una_contraseña";
CREATE DATABASE canchas_de_paleta OWNER canchas_user;
```

Luego configura la conexión en `.env` (puedes partir de `.env.example`):

```env
PSQL_CONNECTION_STRING="postgresql://canchas_user:elige_una_contraseña@localhost:5432/canchas_de_paleta"
```

En servicios en la nube puede ser necesario añadir `?ssl=true` a la URL.

Al **arrancar el servidor**, Sequelize ejecuta `sync({ force: false })`: crea las tablas (`canchas`, `pendingCanchas`) si no existen, sin borrar datos. No hay migraciones SQL manuales.

Para **recrear tablas desde cero** (borra todo), en `src/index.ts` se puede usar temporalmente `sync({ force: true })`; úsalo solo en desarrollo y vuelve a `force: false` después.

## Instalación y desarrollo

```bash
npm install
npm run dev
```

Por defecto el servidor escucha en el puerto definido por `PORT` en `.env` o `3001`.
