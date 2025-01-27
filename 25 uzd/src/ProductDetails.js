import React from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <Link to="/products">Back to Product List</Link>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
