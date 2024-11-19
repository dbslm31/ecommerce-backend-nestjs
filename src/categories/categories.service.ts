import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async createCategory(name: string, description: string): Promise<Category> {
        try {
            const newCategory = await this.categoryRepository.create({
                name,
                description
            });
            return newCategory;
        } catch (error) {
            console.error('Error while creating new category:', error);
            throw new Error('Impossible to create new category');
        }
    }


    async findAll(): Promise<Category[]> {
        try {
            const categories = await this.categoryRepository.findAll();
            return categories;
        } catch (error) {
            console.error('Error while fetching all categories:', error);
            throw new Error('Impossible to fetch all categories');
        }
    }



    async findOne(id: number): Promise<Category | null> {
        try {
            const category = await this.categoryRepository.findOne(id);

            if (!category) {
                throw new NotFoundException(`Category  with id ${id} not found`);
            }

            if (category.products && category.products.length === 0) {
                console.log('No products linked to this category');
            }

            return category;
        } catch (error) {
            console.error(`Error while fetching category with id ${id}:`, error);
            throw new Error(`Impossible to fetch category with id ${id}`);
        }

    }

    async updateCategory(id: number, data: Partial<Category>): Promise<void> {
        try {
            await this.categoryRepository.update(id, data);
        } catch (error) {
            console.error(`Error while updating category with id ${id}:`, error);
            throw new Error(`Impossible to update category with id ${id}`);
        }
    }


    async deleteCategory(id: number): Promise<void> {
        try {
            const category = await this.categoryRepository.findOne(id);

            if (category) {
                await category.destroy();
            } else {
                throw new NotFoundException(`There no category with id ${id}`);
            }
        } catch (error) {
            console.error(`Error while deleting category with id ${id}:`, error);
            throw new Error(`Impossible to delete category with id ${id}`);
        }
    }


}
