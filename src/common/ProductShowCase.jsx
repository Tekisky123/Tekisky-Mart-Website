import React from 'react';

const ProductShowcase = ({ category, title, imgSrcDefault, imgSrcHover, badge, price, originalPrice, rating }) => {
  return (
    <div className="showcase">
      <div className="showcase-banner">
        <img src={imgSrcDefault} alt={title} width="300" className="product-img default" />
        <img src={imgSrcHover} alt={title} width="300" className="product-img hover" />

        {badge && <p className={`showcase-badge ${badge.className}`}>{badge.text}</p>}

        <div className="showcase-actions">
          <button className="btn-action">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
          <button className="btn-action">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
          <button className="btn-action">
            <ion-icon name="repeat-outline"></ion-icon>
          </button>
          <button className="btn-action">
            <ion-icon name="bag-add-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div className="showcase-content">
        <a href="#" className="showcase-category">{category}</a>
        <a href="#">
          <h3 className="showcase-title">{title}</h3>
        </a>

        <div className="showcase-rating">
          {rating &&
            Array.from({ length: rating.fullStars }, (_, index) => (
              <ion-icon key={index} name="star"></ion-icon>
            ))}
          {rating &&
            Array.from({ length: rating.emptyStars }, (_, index) => (
              <ion-icon key={index} name="star-outline"></ion-icon>
            ))}
        </div>

        <div className="price-box">
          <p className="price">{`$${price}`}</p>
          {originalPrice && <del>{`$${originalPrice}`}</del>}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
