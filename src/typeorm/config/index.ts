import { join } from "path";
import { DataSourceOptions } from "typeorm";


export function getDefaultConfig(basePath: string): DataSourceOptions {

    return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
        logging: false,
        migrations: [join(basePath, 'migrations', '*.{js,ts}')],
        migrationsRun: true,
        logNotifications: false,
        ssl: {
            rejectUnauthorized: false,
        },
    } as DataSourceOptions;
}

export function getLocalConfig(basePath: string): DataSourceOptions {

    if(!process.env.DATABASE_HOST){

        throw new Error('No host configured at environment! You must load the environment before get the configuration.')
    }


    return {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: !!process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: String(process.env.DATABASE_PASSWORD),
        database: process.env.DATABASE_NAME,
        entities: [join(basePath, '**', '*.entity.{ts,js}')],
        synchronize: false,
        logging: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
        migrations: [join(basePath, 'migrations', '*.{js,ts}')],
        migrationsRun: false,
        logNotifications: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
    } as DataSourceOptions;
}

export function loadEnv(env: string){
    require('dotenv').config({
        path: env,
    });
}