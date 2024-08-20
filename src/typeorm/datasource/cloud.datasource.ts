/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';


export function getConfig(): DataSourceOptions {

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




export const dataSource = () => {

    const dataSourceOptions = getConfig();

    const dataSource = new DataSource(dataSourceOptions);
    dataSource.initialize();
};


