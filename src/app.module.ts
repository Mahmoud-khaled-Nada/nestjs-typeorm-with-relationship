import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import entities from './utils/database';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PSQL_DB_HOST,
      port: parseInt(process.env.PSQL_DB_PORT),
      username: process.env.PSQL_DB_USERNAME,
      password: process.env.PSQL_DB_PASSWORD,
      database: process.env.PSQL_DB_NAME,
      synchronize: true,
      entities,
      logging: false,
    }),
    PostsModule,
  ],
})
export class AppModule {}
