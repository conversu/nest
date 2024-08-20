/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource, DataSourceOptions } from 'typeorm';


export const getDataSource: (options: DataSourceOptions) => DataSource = (options: DataSourceOptions) => {

    const dataSource = new DataSource(options);
    dataSource.initialize();
    return dataSource
};
