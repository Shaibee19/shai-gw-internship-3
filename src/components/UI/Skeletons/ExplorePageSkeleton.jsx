import SkeletonShimmer from "./SkeletonShimmer";
import "../../../css/HomeComponents.css";

const ExplorePageSkeleton = () => {
  return (
    <div className="explore_card--skeleton">
      <SkeletonShimmer className="explore_img--skeleton" />

      <div className="explore_info--skeleton">
        <SkeletonShimmer className="explore_title--skeleton" />
        <SkeletonShimmer className="explore_price--skeleton" />
      </div>

      <div className="explore_footer--skeleton">
        <SkeletonShimmer className="explore_pp--skeleton" />
        <SkeletonShimmer className="explore_likes--skeleton" />
      </div>
    </div>
  );
};

export default ExplorePageSkeleton;
