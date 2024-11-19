import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Client } from './entities/client.entity';
import { DataSourceOptions } from 'typeorm';
import { CreateClientsTable1731976378361 } from './migrations/1731976378361-CreateClientsTable';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Client],
  migrations: [CreateClientsTable1731976378361],
  synchronize: false, // Mantenha false em produção para evitar alterações indesejadas no banco
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return{
        ...dataSourceOptions,

      }},
    }),
  ],
})
export class DatabaseModule {}
