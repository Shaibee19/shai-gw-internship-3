import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";
import Carousel from "../UI/Carousel.jsx";
import HotCollectionsSkeleton from "../UI/Skeletons/HotCollectionsSkeleton.jsx";

const HotCollections = () => {
  const { data: apiData, loading } = useFetch(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
  );

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel>
            {loading
              ? new Array(4)
                  .fill(0)
                  .map((_, index) => <HotCollectionsSkeleton key={index} />)
              : apiData.map((item, index) => (
                  <div className="" key={index}>
                    <div
                    // className="col-lg-3 col-md-6 col-sm-6 col-xs-12" - Removed to fit Carousel layout
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
