import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    public readonly productRepo: ProductService,
    public readonly userRepo: UserService,
  ) {}
  create(createOrderDto: CreateOrderDto, id: number): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll(email: string) {
    return this.orderRepository.find({
      where: {
        email: email,
      },
    });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id: id } });
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}
