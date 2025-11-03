#!/bin/sh
# Apply migrations
npx prisma migrate deploy
# Execute seed if RUN_SEED=true and js the compiled exists
if [ "${RUN_SEED}" = "true" ] && [ -f dist/prisma/seed.js ]; then
	echo "RUN_SEED=true -> Ejecutando seed compilado"
	npm run prisma:seed:prod
else
	echo "RUN_SEED not true or compiled seed not found — saltando seed"
fi

# Init app
node dist/src/main.js