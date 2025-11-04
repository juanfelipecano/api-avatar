<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Docker / Development with containers

This project includes a Docker setup (Postgres + Nest API) and a build pipeline that compiles the TypeScript seed file
so the database can be seeded inside the container at startup.

Quick steps

1. Create an `.env` file in the project root (or export variables in your environment). Example `.env`:

```env
POSTGRES_DB=appdb
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppass
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://appuser:apppass@db:5432/appdb?schema=public"
```

2. Build and start the containers:

```powershell
docker-compose up -d --build
```

What happens during image build / startup
- The Dockerfile compiles the app and also compiles `prisma/seed.ts` to `dist/prisma/seed.js`.
- On container start the entrypoint applies Prisma migrations and then runs the compiled seed script (idempotent upserts).
- Finally the Nest app starts and listens on `PORT` (default 3000).

Verify the API

```powershell
curl http://localhost:3000/           # should return Hello World!
curl http://localhost:3000/v1/characters
curl http://localhost:3000/v1/skills
```

Run seed manually

If you prefer to run the seed manually (instead of relying on automatic startup), you can run:

```powershell
docker-compose exec api npm run prisma:seed   # runs Prisma's configured seed (uses compiled JS)
```

Open Prisma Studio

If you want to browse the DB with Prisma Studio (requires access to DB from your host):

```powershell
npm run prisma:studio
```

Notes & recommendations

- The seed included uses `upsert` so it's safe to run multiple times (idempotent inserts/updates).
- Currently the entrypoint runs the seed automatically after applying migrations. If you want to control whether
  the seed runs (for example only run in dev), edit `docker-entrypoint.sh` and wrap the seed call with a
  environment condition (e.g. `if [ "$RUN_SEED" = "true" ]; then npm run prisma:seed:prod; fi`).
- The `docker-compose.yml` in this repo contains a `version:` key — Docker Compose warns it's obsolete. You can
  safely remove the `version:` line to silence the warning.
- If you update `prisma/seed.ts` you must rebuild the image so the compiled JS is updated:

```powershell
docker-compose build --no-cache api
docker-compose up -d
```

Enable seed on startup

If you want the seed to run automatically when the API container starts, enable the `RUN_SEED` flag. By default it is `false`.

- Temporary (PowerShell):

```powershell
$env:RUN_SEED='true'
docker-compose up -d --build
```

- Persistently (add to your `.env`):

```env
RUN_SEED=true
```

When enabled the entrypoint will run the compiled seed (`dist/prisma/seed.js`) after applying migrations. The seed uses `upsert` so it is safe to run multiple times.

Healthcheck

The `api` service includes an HTTP healthcheck that probes `http://localhost:3000/` from inside the container. You can inspect container health with:

```powershell
docker ps                 # shows state (healthy/unhealthy)
docker-compose ps         # shows health/status for compose services
docker inspect --format='{{json .State.Health}}' <container_id>
```

If the healthcheck repeatedly fails, check the logs with `docker-compose logs -f api` to troubleshoot.

Troubleshooting

- If the API container exits with `MODULE_NOT_FOUND` for `dist/src/main.js`, make sure `npm run build` ran successfully
  during image build. Rebuild the image to force a fresh build.
- To inspect logs:

```powershell
docker-compose logs -f api
docker-compose logs -f db
```

If you want, I can add a `RUN_SEED` env switch to the compose file and implement the guard in `docker-entrypoint.sh` so the seed only runs when enabled. Let me know and I will add it.


## Estructura del Proyecto

```
api-avatar/
├── prisma/                                    # Gestión de base de datos y configuración ORM
│   ├── migrations/                            # Historial de migraciones
│   ├── schema.prisma                          # Definición del esquema Prisma (modelos, relaciones, enums)
│   └── seed.ts                                # Script para ingresar datos iniciales
├── src/                                       # Código fuente principal de la aplicación
│   ├── constants/                             # Constantes y enumeraciones globales de la aplicación
│   ├── modules/                               # Módulos de funcionalidad organizados por dominio
│   │   ├── characters/                        # Módulo de gestión de personajes
│   │   │   └── v1/                            # Versión 1 de la API de personajes
│   │   │       ├── entities/                  # Definiciones de entidades TypeScript
│   │   │       └── mappers/                   # Lógica de transformación de datos
│   │   ├── prisma/                            # Módulo del cliente de base de datos
│   │   │   ├── prisma.module.ts               # Módulo que expone PrismaService
│   │   │   ├── prisma.service.spec.ts         # Pruebas unitarias del servicio Prisma
│   │   │   └── prisma.service.ts              # Wrapper y configuración del cliente Prisma
│   │   ├── skills/                            # Módulo de gestión de habilidades
│   │   │   └── v1/                            # Versión 1 de la API de habilidades
│   │   │       ├── entities/                  # Definiciones de entidades TypeScript
│   │   │       └── mappers/                   # Lógica de transformación de datos
│   │   └── index.ts                           # Exportación barrel de todos los módulos
│   └── utils/                                 # Funciones utilitarias compartidas
├── .dockerignore                              # Archivos a excluir de las construcciones Docker
├── .env.example                               # Plantilla de variables de entorno
├── .eslintrc.js                               # Configuración de ESLint para calidad de código
├── .gitignore                                 # Archivos a excluir del control de versiones
├── .prettierrc                                # Configuración de Prettier para formato de código
├── docker-compose.yml                         # Orquestación Docker multi-contenedor
├── docker-entrypoint.sh                       # Script de inicio del contenedor (migraciones + seed)
├── Dockerfile                                 # Instrucciones de construcción de imagen Docker
├── nest-cli.json                              # Configuración del CLI de NestJS
├── package.json                               # Dependencias y scripts NPM
├── README.md                                  # Documentación del proyecto
├── tsconfig.build.json                        # Configuración de compilación TypeScript
└── tsconfig.json                              # Configuración base del compilador TypeScript
```

### Resumen de Directorios

- **`prisma/`** - Esquema de base de datos, migraciones y scripts de siembra para PostgreSQL con Prisma ORM
- **`src/`** - Código fuente principal de la aplicación siguiendo patrones de arquitectura NestJS
  - **`constants/`** - Constantes y enums globales para tipos de personajes y categorías de habilidades
  - **`modules/`** - Módulos de funcionalidad organizados por dominio (characters, skills, prisma) con APIs versionadas
  - **`utils/`** - Funciones utilitarias reutilizables para manejo de URLs y paginación
- **Archivos de configuración** - Docker, TypeScript, ESLint, Prettier y herramientas de NestJS