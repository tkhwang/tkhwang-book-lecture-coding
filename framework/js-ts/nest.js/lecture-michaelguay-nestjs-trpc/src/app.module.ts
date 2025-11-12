import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { TrpcModule } from 'src/trpc/trpc.module';

@Module({
  imports: [TrpcModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
