import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";
import Slider from "react-slick";

const HotCollections = () => {
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
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
    );
    setApiData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={id.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={id.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{id.title}</h4>
                      </Link>
                      <span>ERC-{id.code}</span>
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

export default HotCollections;
