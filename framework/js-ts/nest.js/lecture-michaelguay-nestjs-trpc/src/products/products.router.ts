import { Input, Mutation, Router } from 'nestjs-trpc';
import { type Product, productSchema } from 'src/products/products.schema';
import { ProductsService } from 'src/products/products.service';

@Router({ alias: 'products' })
export class ProductsRouter {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation({
    input: productSchema,
    output: productSchema,
  })
  createProduct(@Input() productData: Product) {
    return this.productsService.createProduct(productData);
  }
}
