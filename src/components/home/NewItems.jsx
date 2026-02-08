import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./HomeComponents.css";

// ----------------------------------
// Countdown Component
// ----------------------------------

function Countdown({expiryDate}) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, expiryDate - Date.now());
  });

  useEffect(() => {
    let frameId; 
    
    function tick() { 
      const now = Date.now(); 
      const diff = expiryDate - now; 
      
      setTimeLeft(Math.max(0, diff)); 
      
      if (diff > 0) {
        frameId = requestAnimationFrame(tick); 
      } 
    } 
    
    frameId = requestAnimationFrame(tick); 
    
    return () => cancelAnimationFrame(frameId); 
  }, [expiryDate]); 
  
  // Convert ms → h/m/s 
  const totalSeconds = Math.floor(timeLeft / 1000); 
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0"); 
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"); 
  const seconds = String(totalSeconds % 60).padStart(2, "0"); 
  
  return ( 
    <div className="de_countdown">
      <span className="timer__hours">{hours}h </span>
      <span className="timer__minutes">{minutes}m </span>
      <span className="timer__seconds">{seconds}s</span>
    </div>
  );
}

// ----------------------------------
// Main Component
// ----------------------------------

const NewItems = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState();
  
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
  
  const settings = {
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
  
  useEffect(() => {
  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
    );
    setApiData(data);
    setLoading(false);
  }
  fetchData();
  }, []);
  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                <div className="" key={index}>
                    <div>
                      <div className="nft_coll--skeleton">
                        <div className="nft_wrap--skeleton"></div>
                        <div className="nft_coll_pp--skeleton">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info--skeleton">
                          <div className="span--skeleton"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                : apiData.map((item, index) => (
                  <div className="" key={index}>
                    <div
                    // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorId}`}
                            >
                            <img className="lazy" src={item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
                        
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                              />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">${item.price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>

        </div>
      </div>
    </section>
  );
};

export default NewItems;