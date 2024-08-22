/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource as TypeormDataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import fs from 'fs';
import { DatasourceConfig } from '..';


export const getDataSource: (options: DataSourceOptions) => TypeormDataSource = (options: DataSourceOptions) => {

    const dataSource = new TypeormDataSource(options);
    dataSource.initialize();
    return dataSource;
};




class DSInitializer {

    private type: DataSourceOptions['type'];
    private basePath: string;
    private datasource: TypeormDataSource;
    private options: DataSourceOptions;


    constructor(type: DataSourceOptions['type']) {
        this.type = type;
    }

    /**
     * Set the current path of project to datasource configurations
     * 
     * @param path {__dirname} - current path of project
     * @returns {this}
     */
    setCurrentPath(path: string): DSInitializer {

        if (!path || !fs.statSync(path).isDirectory()) {

            throw new Error('Current path must be a valid directory! You can use "__dirname".')
        }

        this.basePath = path;

        return this;
    }


    /**
     * Loads the environment file that must be available at configured current path
     * 
     * @param environment .env.example
     * @returns {this}
     */
    loadEnvironment(environment: string): DSInitializer {

        if (this.basePath.includes('dist')) {
            this.basePath = join(this.basePath.split('dist')[0])
        }

        const path = join(this.basePath, environment);

        if (!path || !fs.existsSync(path)) {

            throw new Error('Environment path must be a valid .env file!')
        }

        DatasourceConfig.loadEnv(path);
        return this;

    }

    /**
     * Set a LOCAL configuration fir as TypeormDataSource config:
     * 
     *   host: process.env.DATABASE_HOST,
     *   port: !!process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : process.env.DATABASE_PORT,
     *   username: process.env.DATABASE_USERNAME,
     *   password: String(process.env.DATABASE_PASSWORD),
     *   database: process.env.DATABASE_NAME,
     *   entities: [join(basePath, '**', '*.entity.{ts,js}')],
     *   synchronize: false,
     *   logging: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
     *   migrations: [join(basePath, 'migrations', '*.{js,ts}')],
     *   migrationsRun: false,
     *   logNotifications: process.env.TYPEORM_LOGGING ? Boolean(process.env.TYPEORM_LOGGING) : false,
     * 
     * @param options {DataSourceOptions} Custom options to override default  
     * @returns {this}
     */
    setLocalConfig(options?: DataSourceOptions): DSInitializer {

        let config = DatasourceConfig.getLocalConfig(this.basePath);

        if (!!options) {
            config = Object.assign(config, options);
        }

        this.setOptions(config);
        return this;
    }


    /**
     * Set a DATABASE URL as TypeormDataSource config:
     *
     *   url: process.env.DATABASE_URL,
     *   entities: [join(__dirname, '**', '*.entity.{ts,js}')],
     *   synchronize: false,
     *   logging: false,
     *   migrations: [join(basePath, 'migrations', '*.{js,ts}')],
     *   migrationsRun: true,
     *   logNotifications: false,
     *   ssl: {
     *       rejectUnauthorized: false,
     *   }
     * 
     * 
     * @returns {this}
     */
    setUrlConfig(): DSInitializer {

        this.setOptions(DatasourceConfig.getDefaultConfig(this.basePath));
        return this;
    }

    /**
     * Set a custom DataSourceOptions for TypeormDataSource config
     * 
     * @param options DataSourceOptions
     * @returns 
     */
    setCustomConfig(options: DataSourceOptions): DSInitializer {
        this.setOptions(options);
        return this;
    }


    /**
     * Initialize the datasource
     */
    initialize() {
        if (!this.options) {
            throw new Error('The datasource options must be configured before!')
        }
        this.datasource = new TypeormDataSource(this.options);
        this.datasource.initialize();
        return this;
    }

    private setOptions(options: DataSourceOptions) {
        this.options = Object.assign(options, { type: this.type });
    }

    /**
     * Set migrations path
     * 
     * @param path {string | string[]} - migrations path
     * @returns 
     */
    setMigrations(path: string | string[]){

        this.options = Object.assign(this.options, {
            migrations: path
        })
        return this;
    }

    /**
     * Set entities path
     * 
     * @param path {string | string[]} - migrations path
     * @returns 
     */
    setEntities(path: string | string[]){

        this.options = Object.assign(this.options, {
            entities: path
        })
        return this;
    }

    /**
     * Check if the datasource is initialized
     * @returns {boolean}
     */
    isInitialized(): boolean {

        return !!this.datasource && this.datasource.isInitialized
    }

    /**
     * Get the Typeorm datasource object
     * 
     * @returns Typeorm DataSource
     */
    getDataSource(): TypeormDataSource {

        return this.datasource ?? null;
    }


    /**
     * Get the typeorm datasource options
     * 
     * @returns DataSourceOptions
     */
    getOptions(): DataSourceOptions {

        return this.options;
    }


    /** 
     * Displays the current datasource config at console
    */
    displayOptions() {

        console.log('>> DATA SOURCE:');
        Object.keys(this.options).forEach((key) => {
            console.log(`  ${key}: ${this.options[key]}`);
        });
        console.log('');
    }
}

export const Initialize: (type: DataSourceOptions['type']) => DSInitializer = (type: DataSourceOptions['type']) => new DSInitializer(type);

