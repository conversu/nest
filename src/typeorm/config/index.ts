import { join } from "path";
import { DataSourceOptions } from "typeorm";


export function getDefaultConfig(): DataSourceOptions {

    return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
        logging: false,
        migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
        migrationsRun: true,
        logNotifications: false,
        ssl: {
            rejectUnauthorized: false,
        },
    } as DataSourceOptions;
}

export function getLocalConfig(env: string): DataSourceOptions {

    require('dotenv').config({
        path: env,
    });

    return {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: !!process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: String(process.env.DATABASE_PASSWORD),
        database: process.env.DATABASE_NAME,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
        logging: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
        migrations: [
            !!process.env.NODE_ENV && process.env.NODE_ENV === 'production'
                ? '/dist/migrations/*.js'
                : join(__dirname, 'migrations', '*.{js,ts}'),
        ],
        migrationsRun: false,
        logNotifications: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
    } as DataSourceOptions;
}