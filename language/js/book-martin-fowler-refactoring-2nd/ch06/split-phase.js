function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate

  const price = applyShipping(basePrice, shippingMethod, quantity, discount)
  return price

  function applyShipping() {
    const shippingPerCase =
      basePrice > shippingMethod.discountThreshold ? shippingMethod.discountedFee : shippingMethod.feePerCase
    const shippingCost = quantity * shippingPerCase
    const price = basePrice - discount + shippingCost
    return price
  }
}
