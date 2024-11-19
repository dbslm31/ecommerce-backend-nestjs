import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/models/category.model';
import { Product } from '../models/product.model';
import { AuthModule } from '../auth/auth.module';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { ProductsRepository } from '../products/products.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product]), AuthModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ProductsRepository],
})
export class CategoriesModule { }
