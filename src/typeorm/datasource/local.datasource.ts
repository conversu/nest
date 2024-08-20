/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';


function getConfig(env: string): DataSourceOptions {

    require('dotenv').config({
        path: env,
    });

    return {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
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


const dataSource = (env: string) => {

    const dataSourceOptions = getConfig(env);

    const dataSource = new DataSource(dataSourceOptions);
    dataSource.initialize();
};



export default { dataSource, getConfig };