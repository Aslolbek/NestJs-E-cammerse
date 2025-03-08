/* eslint-disable prettier/prettier */
import { Basket } from 'src/basket/entities/basket.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string; 

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user';

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  district: string;

  @OneToMany(() => Basket, (basket) => basket.user)
  basket: Basket[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
