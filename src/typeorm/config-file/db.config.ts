import { getDataSource } from '../datasource';
import { getDefaultConfig } from '../config/default';

export const dataSourceOptions = getDefaultConfig();

const dataSource = getDataSource(dataSourceOptions);

module.exports = { dataSource, dataSourceOptions };