import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Post()
    // @Roles('admin')
    // async
}
