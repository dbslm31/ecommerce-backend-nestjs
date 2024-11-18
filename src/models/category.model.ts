import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.model'

@Table
export class Category extends Model<Category> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @HasMany(() => Product)
    products: Product[];
}
