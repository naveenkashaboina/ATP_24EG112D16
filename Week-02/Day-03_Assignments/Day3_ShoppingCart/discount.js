// iii. discount.js - Coupon and discount logic

// Available coupons
const coupons = {
  'WELCOME10': { type: 'percentage', value: 10, minAmount: 1000 },
  'FLAT500': { type: 'flat', value: 500, minAmount: 5000 },
  'ELECTRONICS20': { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};

// Validate coupon
export function validateCoupon(couponCode, cartTotal, cartItems) {
  const coupon = coupons[couponCode];
  if (!coupon) {
    return { valid: false, message: 'Invalid coupon code' };
  }

  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: `Minimum amount of ₹${coupon.minAmount} required` };
  }

  if (coupon.category) {
    const hasCategoryItem = cartItems.some(item => item.category === coupon.category);
    if (!hasCategoryItem) {
      return { valid: false, message: `Coupon valid only for ${coupon.category} items` };
    }
  }

  return { valid: true, message: 'Coupon applied successfully' };
}

// Calculate discount amount
export function calculateDiscount(couponCode, cartTotal) {
  const coupon = coupons[couponCode];
  if (!coupon) return 0;

  if (coupon.type === 'percentage') {
    return (cartTotal * coupon.value) / 100;
  } else if (coupon.type === 'flat') {
    return coupon.value;
  }
  return 0;
}

// Apply discount
export function applyDiscount(cartTotal, couponCode, cartItems) {
  const validation = validateCoupon(couponCode, cartTotal, cartItems);

  if (!validation.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: validation.message
    };
  }

  const discount = calculateDiscount(couponCode, cartTotal);
  const finalTotal = cartTotal - discount;

  return {
    originalTotal: cartTotal,
    discount,
    finalTotal,
    message: `Coupon ${couponCode} applied successfully`
  };
}
