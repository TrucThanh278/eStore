import { DataSourceOptions } from 'typeorm';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      DB_TYPE: DataSourceOptions.type;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    }
  }
}

export {};
