import React from 'react';
import './ProductItem.css';

const ProductItem = ({ className }) => {

  return (
    <div className={'product ' + className}>
      <div className={'img'}/>
    </div>
  );
};

export default ProductItem;