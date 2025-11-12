import { Module } from '@nestjs/common';
import { ProductsRouter } from 'src/products/products.router';
import { ProductsService } from 'src/products/products.service';

@Module({
  providers: [ProductsService, ProductsRouter],
})
export class ProductsModule {}
