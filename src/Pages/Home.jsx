import React from "react";
import Banner from "../common/Banner";
import ProductMain from "../Pages/MainProduct";
import "../App.css";
import DealOfTheDay from "../common/DealOfTheDay";

const Home = () => {
  const bannersData = [
    {
      imgSrc:
        "https://img.freepik.com/free-photo/small-bowl-dates-handful-marble-background-high-quality-photo_114579-53295.jpg",
      subtitle: "Trending item",
      title: " Indulge in Pure Sweetness: Elevate your taste buds with Kimia Dates ",
      price: "200.00",
      link: "/",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/dried-dates-kurma_114579-35149.jpg",
      subtitle: "Trending item",
      title: "Perfect for Every Occasion: Whether it's a solo treat, a family gathering",
      price: "250.00",
      link: "/shop/womens-fashion",
    },
    {
      imgSrc:
        "https://i.pinimg.com/736x/53/7b/54/537b541f0cb00f7db66d6f4866f9e140.jpg",
      subtitle: "Trending accessories",
      title: "Nature's sweetness awaits!",
      price: "150.00",
      link: "/shop/accessories",
    },
    // Add more banner objects as needed
  ];
  return (
    <>
      <Banner banners={bannersData} />
    <DealOfTheDay/>
      
      <ProductMain />
    </>
  );
};

export default Home;
