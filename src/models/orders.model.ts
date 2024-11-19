import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/user.model';


export enum OrderStatus {
    CART = 'cart',
    PENDING = 'pending',
    SHIPPED = 'shipped',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

@Table
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.ENUM(...Object.values(OrderStatus)),
        allowNull: false,
        defaultValue: OrderStatus.CART,
    })
    status: OrderStatus;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    total: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    orderDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    shippedDate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    trackingNumber: string;
}
