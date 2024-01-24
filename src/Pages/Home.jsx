import React from 'react'
import Banner from '../common/Banner';

const Home = () => {
    const bannersData = [
        {
          imgSrc: "https://media.istockphoto.com/id/542563100/photo/bowl-of-dried-dates.jpg?b=1&s=612x612&w=0&k=20&c=2FPYT-UIB2RVcZB_2oUjgyjAMuaqCWKt8FcESIbr5qs=",
          subtitle: "Trending item",
          title: "Women's latest fashion sale",
          price: "20.00",
          link: "/shop/womens-fashion",
        },
        {
          imgSrc: "https://media.istockphoto.com/id/516816754/photo/raw-organic-medjool-dates.webp?b=1&s=170667a&w=0&k=20&c=lwwvcvLPvRCrMby0vWJNp8Woe343H6cT6ywy63TBxcA=",
          subtitle: "Trending item",
          title: "Women's latest fashion sale",
          price: "20.00",
          link: "/shop/womens-fashion",
        },
        {
          imgSrc: "https://static.vecteezy.com/system/resources/thumbnails/001/223/614/small/dried-dates-on-minimal-background.jpg",
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