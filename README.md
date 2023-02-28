# prisma-postgres-itests

Example integration testing with Prisma, Supabase, Postgres.

## Requirements
- Node 16
- Docker

## Development

Start database:
```
npx supabase start
npx prisma db push
npx prisma studio
```

Call service:
```
npx ts-node src/service.ts
```

Run integration tests:
```
npm run test-e2e
```

At the high-level the integration tests:
1. Start supabase locally in Docker
2. Local a `DATABASE_URL` environment variable for `.env.test` using [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)
3. Run `prisma db push` against local supabase to create tables based on schema
4. Run integrations tests with Jest against local database. Records are deleted after each test.

## Docs
- [Prisma setup](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
- [Prisma integration testing](https://www.prisma.io/docs/guides/testing/integration-testing)
- [Using multiple .env files](https://www.prisma.io/docs/guides/development-environment/environment-variables/using-multiple-env-files)
