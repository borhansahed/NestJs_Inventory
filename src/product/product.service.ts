import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }
  findOne(id: number): Promise<Product> {
    return this.productRepo.findOne({ where: { id: id } });
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
