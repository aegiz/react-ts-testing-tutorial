import { useEffect, useState } from 'react';
import { ProductType } from '../types';
import styles from './Product.module.css';

export interface Props {
  product: ProductType;
  discount?: number;
  handleRemove: (string) => void;
  handleAdd: (string) => void;
  handleSubtract: (string) => void;
}

const Product: React.FC<Props> = ({
  product,
  discount,
  handleRemove,
  handleAdd,
  handleSubtract,
}) => {
  const { image, name, color, quantity, price, id, promoAvailable } = product;
  const discountAvailable = discount && promoAvailable;
  const regularPrice = quantity * price;
  const actualPrice =
    regularPrice * (discountAvailable ? (100 - discount) / 100 : 1);
  const subtractDisabled = quantity === 1;

  return (
    <li className={styles.wrapper}>
      <div>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {name}
          <span>{color}</span>
        </div>
        <div className={styles.quantity}>
          <button
            type="button"
            disabled={subtractDisabled}
            onClick={() => handleSubtract(id)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => handleAdd(id)}>
            +
          </button>
        </div>

        <div className={styles.price}>
          {discountAvailable && (
            <span className={styles.discount}>{regularPrice.toFixed(2)}</span>
          )}
          $ {actualPrice.toFixed(2)}{' '}
        </div>
      </div>
      <button
        className={styles['remove-button']}
        onClick={() => handleRemove(id)}
      >
        X
      </button>
    </li>
  );
};

export default Product;
