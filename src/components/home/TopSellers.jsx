import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomeComponents.css";

const TopSellers = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`,
    );
    setApiData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list author_list--skeleton">
              {loading 
              ? new Array(12).fill(0).map((_, index) => (
                <div className="" key={index}>
                <div>
                  <li class="author_list_item--skeleton"> 
                    <div class="author_list_pp--skeleton"></div> 
                    <i className="fa fa-check"></i>
                    <div class="author_list_info--skeleton"></div> 
                  </li> 
                </div>
              </div>
              ))
              : apiData.map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
