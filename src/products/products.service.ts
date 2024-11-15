import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/models/product.model';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductsRepository) { }

    async createProduct(name: string, description: string, price: number, stock: number, img_url: string, is_active: boolean): Promise<Product> {
        try {
            const newProduct = await this.productRepository.create({
                name,
                description,
                price,
                stock,
                img_url,
                is_active,
            });
            return newProduct;
        } catch (error) {
            console.error('Error while creating new product:', error);
            throw new Error('Impossible to create new product');
        }
    }


    async findAll(): Promise<Product[]> {
        try {
            const products = await this.productRepository.findAll();
            return products;
        } catch (error) {
            console.error('Error while fetching all products:', error);
            throw new Error('Impossible to fetch all products');
        }
    }



    async findOne(id: number): Promise<Product | null> {
        try {
            const product = await this.productRepository.findOne(id);
            return product;
        } catch (error) {
            console.error(`Error while fetching product with id ${id}:`, error);
            throw new Error(`Impossible to fetch product with id ${id}`);
        }

    }

    async updateProduct(id: number, data: Partial<Product>): Promise<void> {
        try {
            await this.productRepository.update(id, data);
        } catch (error) {
            console.error(`Error while updating product with id ${id}:`, error);
            throw new Error(`Impossible to update product with id ${id}`);
        }
    }


    async deleteProduct(id: number): Promise<void> {
        try {
            const product = await this.productRepository.findOne(id);

            if (product) {
                await product.destroy();
            } else {
                throw new Error(`There no product with id ${id}`);
            }
        } catch (error) {
            console.error(`Error while deleting product with id ${id}:`, error);
            throw new Error(`Impossible to delete product with id ${id}`);
        }
    }


}
