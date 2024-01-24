import React from 'react'
import Banner from '../common/Banner';

const Home = () => {
    const bannersData = [
        {
          imgSrc: "https://img.freepik.com/free-photo/small-bowl-dates-handful-marble-background-high-quality-photo_114579-53295.jpg",
          subtitle: "Trending item",
          title: "Women's latest fashion sale",
          price: "20.00",
          link: "/shop/womens-fashion",
        },
        {
          imgSrc: "https://img.freepik.com/free-photo/dried-dates-kurma_114579-35149.jpg",
          subtitle: "Trending item",
          title: "Women's latest fashion sale",
          price: "20.00",
          link: "/shop/womens-fashion",
        },
        {
          imgSrc: "https://i.pinimg.com/736x/53/7b/54/537b541f0cb00f7db66d6f4866f9e140.jpg",
          subtitle: "Trending accessories",
          title: "Modern sunglasses",
          price: "15.00",
          link: "/shop/accessories",
        },
        // Add more banner objects as needed
      ];
  return (
    <Banner banners={bannersData} />
  )
}

export default Home