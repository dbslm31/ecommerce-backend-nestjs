import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/models/category.model';
import { Product } from '../models/product.model';

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category) private categoryModel: typeof Category, @InjectModel(Product) private productModel: typeof Product,) { }


    async create(data: { name: string, description: string }): Promise<Category> {
        return this.categoryModel.create(data);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    async findOne(id: number): Promise<Category | null> {
        return this.categoryModel.findOne({ where: { id }, include: [{ model: Product }] });
    }

    async update(id: number, data: Partial<Category>): Promise<void> {
        await this.categoryModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const category = await this.findOne(id);
        if (category) {
            await this.productModel.update(
                { categoryId: null },
                { where: { categoryId: id } },
            );

            await category.destroy();
        }
    }
}
