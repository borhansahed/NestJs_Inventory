import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderMiddleWare } from 'src/middleware/order.middleware';
import { CheckUserMiddleware } from 'src/middleware/checkUser.middieware';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrderMiddleWare)
      .forRoutes({ path: 'order/:id', method: RequestMethod.POST });
  }
}
