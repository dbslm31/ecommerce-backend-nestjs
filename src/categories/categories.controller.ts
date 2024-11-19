import { Controller, UseGuards, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CategoryService } from './categories.service';
import { Category } from '../models/category.model';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles('admin')
    async createCategory(@Body() body: { name: string, description: string }): Promise<Category> {
        return this.categoryService.createCategory(body.name, body.description);
    }

    @Get()
    async findAllCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Category | null> {
        return this.categoryService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @Roles('admin')
    async updateCategory(@Param('id') id: number, @Body() data: Partial<Category>): Promise<void> {
        return this.categoryService.updateCategory(id, data);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles('admin')
    async deleteCategory(@Param('id') id: number): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }
}
