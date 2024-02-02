import React from "react";
import Banner from "../common/Banner";
import ProductMain from "../Pages/MainProduct";
import "../App.css";
import DealOfTheDay from "../common/DealOfTheDay";

const Home = () => {
  const bannersData = [
    {
      imgSrc:
        "https://media.istockphoto.com/id/1432450558/photo/dates-in-a-white-bowl.jpg?s=170667a&w=0&k=20&c=jN3E_e0mE3k8oDUHkAZck2tb9JyC76Ns5zeiy8ySc-M=",
      subtitle: "Trending item",
      title: " Indulge in Pure Sweetness: Elevate your taste buds with Kimia Dates ",
      price: "200.00",
      link: "/category/OTHERS",
    },
    {
      imgSrc:
        "https://www.shutterstock.com/image-photo/stack-colorful-clothes-pile-clothing-600nw-2203081765.jpg",
      subtitle: "Trending item",
      title: "Perfect for Every Occasion: Whether it's a solo treat, a family gathering",
      price: "250.00",
      link: "/shop/womens-fashion",
    },
    {
      imgSrc:
        "https://nichestory.eu/wp-content/uploads/2022/09/44blg-single.jpg",
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
