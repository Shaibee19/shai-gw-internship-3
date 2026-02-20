import SkeletonShimmer from "./SkeletonShimmer";
import "../../../css/HomeComponents.css";

const HotCollectionsSkeleton = () => {
  return (
    <div className="nft_coll--skeleton">
      <SkeletonShimmer className="nft_wrap--skeleton" />
      <SkeletonShimmer className="nft_coll_pp--skeleton" />
        <i className="fa fa-check"></i>
      <div className="nft_coll_info--skeleton">
        <SkeletonShimmer className="span--skeleton" />
      </div>
    </div>
  );
};

export default HotCollectionsSkeleton;
