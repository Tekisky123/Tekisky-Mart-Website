import React from 'react';
import BestSallerShowCase from '../common/BestSallerShowCase';

const BestSallerSlider = () => {
  return (
    <div className="product-featured">
      <h1 style={{textAlign:"center"}} className="title">Deal of the day</h1>
      <div className="showcase-wrapper has-scrollbar">
        {/* First Product */}
        <BestSallerShowCase
          imgSrc="https://www.bigbasket.com/media/uploads/p/l/20000727_13-fresho-dates-kimia-with-seed.jpg"
          title="Shampoo, Conditioner & Facewash Packs"
          rating={
            <>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
            </>
          }
          description="Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor"
          price="$150.00"
          originalPrice="$200.00"
          soldCount={20}
          availableCount={40}
          days={360}
          hours={24}
          minutes={59}
          seconds={0}
        />

        {/* Second Product */}
        <BestSallerShowCase
          imgSrc="https://nuttyyogi.com/cdn/shop/products/Medjool_dates.jpg?v=1701759187"
          title="Rose Gold Diamonds Earring"
          rating={
            <>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
              <ion-icon name="star-outline"></ion-icon>
            </>
          }
          description="Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor"
          price="$1990.00"
          originalPrice="$2000.00"
          soldCount={15}
          availableCount={40}
          days={360}
          hours={24}
          minutes={59}
          seconds={0}
        />
      </div>
    </div>
  );
};

export default BestSallerSlider;
