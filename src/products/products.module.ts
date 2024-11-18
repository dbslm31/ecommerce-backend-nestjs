import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesModule } from 'src/categories/categories.module';
import { Product } from 'src/models/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]), AuthModule, CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule { }
