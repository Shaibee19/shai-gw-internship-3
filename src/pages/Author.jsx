import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  const { data: apiData, loading } = useFetch(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
  );

  const handleFollowToggle = () => { 
    setFollowing(prevFollowing => { 
      setFollowers(prevFollowers => 
        prevFollowing ? prevFollowers - 1 : prevFollowers + 1 
      ); 
      return !prevFollowing; 
    }); 
  };

useEffect(() => {
  if (apiData) {
    setFollowers(apiData.followers);
  }
}, [apiData]);

if (loading || !apiData) {
  return <div>Loading...</div>
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {!loading &&
              // ? (skeleton.jsx) :
                apiData && (
                  <div className="">
                    <div className="col-md-12">
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <img src={apiData.authorImage} alt="" />

                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4>
                                {apiData.authorName}
                                <span className="profile_username">
                                  @{apiData.tag}
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  {apiData.address}
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="profile_follower">
                              {followers} followers
                            </div>
                            <button to="#" className="btn-main" onClick={handleFollowToggle}>
                              {following ? "Unfollow" : "Follow"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="de_tab tab_simple">
                        {/* <AuthorItems authorId={authorId} /> */}
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
