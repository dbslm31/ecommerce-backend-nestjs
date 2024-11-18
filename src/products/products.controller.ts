import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/models/product.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles('admin')
    async createProduct(@Body() body: { name: string, description: string, price: number, stock: number, img_url: string, is_active: boolean }): Promise<Product> {
        return this.productService.createProduct(body.name, body.description, body.price, body.stock, body.img_url, body.is_active);
    }

    @Get()
    async findAllProducts(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product | null> {
        return this.productService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @Roles('admin')
    async updateProduct(@Param('id') id: number, @Body() data: Partial<Product>): Promise<void> {
        return this.productService.updateProduct(id, data);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles('admin')
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}
