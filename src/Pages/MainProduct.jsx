import React, { useEffect, useState } from 'react';
import ProductShowcase from '../common/ProductShowCase';
import axios from 'axios';
// import ProductShowcase from './ProductShowcase'; // Make sure to adjust the path

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://tekiskymart.onrender.com/admin/getproduct');
        setProducts(response?.data?.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="product-main">
      <h1 style={{textAlign:"center"}} className="title">Our Products</h1>

      <div className="product-grid">

           {products.map((product) => (
          <ProductShowcase
            key={product?._id}
            category={product?.productCategory}
            title={product?.productName}
            imgSrcDefault={product?.imageURL[0]}
            imgSrcHover={product?.imageURL[1]||product?.imageURL[0]}
            badge={{ text: '15%', className: '' }}
            price={product?.productDetails[0]?.offerPrice}
            originalPrice={product?.productDetails[0]?.mrp}
            rating={{ fullStars: 3, emptyStars: 2 }}
          />
        ))}

      </div>
    </div>
  );
};

export default ProductMain;
