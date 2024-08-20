import { join } from 'path';
import { getLocalConfig } from '../config/local';
import { getDataSource } from '../datasource';


const env = join(__dirname, '.env.development');

console.log('DATASOURCE-ENV', env);

export const dataSourceOptions = getLocalConfig(env);

console.log(dataSourceOptions);

const dataSource = getDataSource(dataSourceOptions);

module.exports = { dataSource, dataSourceOptions };