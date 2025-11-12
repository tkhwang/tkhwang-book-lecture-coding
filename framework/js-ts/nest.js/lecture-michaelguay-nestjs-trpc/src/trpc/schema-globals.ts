import { productSchema } from 'src/products/products.schema';

// Expose generated Zod schemas to global scope so codegen results can reference them.
globalThis.productSchema = productSchema;
