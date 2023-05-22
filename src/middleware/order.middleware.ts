/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderMiddleWare implements NestMiddleware {
  constructor(private readonly orderRepo: OrderService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const product = await this.orderRepo.productRepo.findOne(+id);
    const isExist = await this.orderRepo.userRepo.findByEmail(req.body.email);

    if (!isExist || !product)
      return res.status(401).send('User | product not Found');

    if (isExist && product) {
      req.body = {
        ...product,
        quantity: 1,
      };
      next();
    }
    next();
  }
}
