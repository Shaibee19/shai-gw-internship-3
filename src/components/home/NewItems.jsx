import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const NewItems = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState();
  const timerSeconds = document.querySelector(".timer__seconds");
  const timerMinutes = document.querySelector(".timer__minutes");
  const timerHours = document.querySelector(".timer__hours");

  let startTime = Date.now();
  let cancelId;

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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
    );
    setApiData(data);
    setLoading(false);
  }

  function updateTimer(id) {
    console.log(`${id.expiryDate}`);
    // let secondsElapsed = (id.expiryDate - startTime) / 1000;
  
    // let secondsLeft = secondsElapsed
    // if (hoursLeft < 0) {
    //   hoursLeft = 0;
    //   cancelAnimationFrame(cancelId);
    //   cancelId = null;
    // }
    // let minutesLeft = secondsLeft / 60
    // let hoursLeft = minutesLeft / 24;

    // let secondsText = Math.floor(secondsLeft) % 60;
    // let minutesText = Math.floor(minutesLeft) % 60;
    // let hoursText = hoursLeft % 1000;

    // if (minutesText.toString().length < 2) {
    //   minutesText = minutesText.toString().padStart(2, '0')
    // }
    // if (secondsText.toString().length < 2) {
    //   secondsText = secondsText.toString().padStart(2, '0')
    // }
    // if (hoursText.toString().length < 3) {
    //   hoursText = hoursText.toString().padStart(3, '0')
    // }

    // timerSeconds.innerHTML = secondsText
    // timerMinutes.innerHTML = minutesText;
    // timerHours.innerHTML = hoursText;

    // if (cancelId) {
    //   cancelId = requestAnimationFrame(updateTimer)
    // }
  };

  useEffect(() => {
    fetchData();
    updateTimer();
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
              : apiData.map((id, index) => (
                  <div className="" key={index}>
                    <div
                    // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            // {/* // to=`/${id.authorId}` */}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${id.authorId}`}
                          >
                            <img className="lazy" src={id.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">
                          <span className="timer__hours">5</span>
                          :
                          <span className="timer__minutes">30</span>
                          :
                          <span className="timer__seconds">32</span>
                        </div>
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

                          <Link to="/item-details">
                            {/* // to=`/${nftId}` */}
                            <img
                              src={id.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            {/* // to=`/${nftId}` */}
                            <h4>{id.title}</h4>
                          </Link>
                          <div className="nft__item_price">${id.price}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{id.likes}</span>
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
