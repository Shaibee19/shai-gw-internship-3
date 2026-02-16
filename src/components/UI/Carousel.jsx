import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Carousel({ settings, children }) {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-next custom-arrow" onClick={onClick}>
        ❯
      </div>
    );
  };
  
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="slick-arrow slick-prev custom-arrow" onClick={onClick}>
        ❮
      </div>
    );
  };
  
  const defaultSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 }, },
      { breakpoint: 768, settings: { slidesToShow: 2, }, },
      { breakpoint: 480, settings: { slidesToShow: 1, }, },
    ],
  };

  const finalSettings = { ...defaultSettings, ...settings };

  return <Slider {...finalSettings}>{children}</Slider>;
}

export default Carousel;