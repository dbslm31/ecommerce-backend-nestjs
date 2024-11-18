import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {

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

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    stock: number;

    @Column({
        type: DataType.STRING,
    })
    img_url: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    is_active: boolean;

}