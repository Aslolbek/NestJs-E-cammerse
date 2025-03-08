/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'Baskets'})
export class Basket {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.basket, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, (product) => product.basket, { onDelete: 'CASCADE' })
    product: Product;

    @Column({ type: 'int', default: 1 })
    quantity: number;
}
