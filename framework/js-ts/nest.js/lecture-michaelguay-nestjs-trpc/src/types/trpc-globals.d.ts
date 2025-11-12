declare global {
  var productSchema: (typeof import('src/products/products.schema'))['productSchema'];
}

export {};
