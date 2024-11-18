import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { Product } from './models/product.model';
import { User } from './user/user.model';
import { Role } from './roles/roles.model';
import { Category } from './models/category.model';
import { CategoriesModule } from './categories/categories.module';







@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadModels: true,
    synchronize: true,
    models: [User, Role, Product, Category]

  }),
    UserModule, AuthModule, RolesModule, ProductsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
