import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product/entities/product.entity';
import { AdminModule } from './admin/admin.module';
import { OrderMiddleWare } from './middleware/order.middleware';
import { OrderController } from './order/order.controller';
import { CheckUserMiddleware } from './middleware/checkUser.middieware';
import { ProductService } from './product/product.service';
import { UserService } from './user/user.service';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'test',
      entities: [User, Product, Order],
      logging: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
