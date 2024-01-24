import React from 'react';
import ProductShowcase from '../../common/ProductShowCase';
// import ProductShowcase from './ProductShowcase'; // Make sure to adjust the path

const ProductMain = () => {
  return (
    <div className="product-main">
      <h2 className="title">New Products</h2>

      <div className="product-grid">
        {/* Product 1 */}
        <ProductShowcase
          category="jacket"
          title="Mens Winter Leathers Jackets"
          imgSrcDefault="./assets/images/products/jacket-3.jpg"
          imgSrcHover="./assets/images/products/jacket-4.jpg"
          badge={{ text: '15%', className: '' }}
          price="48.00"
          originalPrice="75.00"
          rating={{ fullStars: 3, emptyStars: 2 }}
        />
        {/* Add more ProductShowcase components for other products */}
      </div>
    </div>
  );
};

export default ProductMain;
