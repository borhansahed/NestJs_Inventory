import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, +id);
  }

  @Get()
  find() {
    return 'Add your email to check you order list';
  }

  @Get(':email')
  findAll(@Param('email') email: string) {
    return this.orderService.findAll(email);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
