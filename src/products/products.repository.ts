import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../models/product.model';

@Injectable()
export class ProductsRepository {
    constructor(@InjectModel(Product) private productModel: typeof Product) { }


    async create(data: { name: string, description: string, price: number, stock: number, img_url: string, is_active: boolean }): Promise<Product> {
        return this.productModel.create(data);
    }


    async findByEmail(email: string, options?: any): Promise<Product | null> {
        return this.productModel.findOne({ where: { email }, ...options });
    }


    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productModel.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<Product>): Promise<void> {
        await this.productModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const product = await this.findOne(id);
        if (product) {
            await product.destroy();
        }
    }
}
