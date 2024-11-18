import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/models/category.model';

@Injectable()
export class ProductsRepository {
    constructor(@InjectModel(Category) private categoryModel: typeof Category) { }


    async create(data: { name: string, description: string, price: number, stock: number, img_url: string, is_active: boolean }): Promise<Category> {
        return this.categoryModel.create(data);
    }


    async findByEmail(email: string, options?: any): Promise<Category | null> {
        return this.categoryModel.findOne({ where: { email }, ...options });
    }


    async findAll(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    async findOne(id: number): Promise<Category | null> {
        return this.categoryModel.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<Category>): Promise<void> {
        await this.categoryModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const category = await this.findOne(id);
        if (category) {
            await category.destroy();
        }
    }
}
