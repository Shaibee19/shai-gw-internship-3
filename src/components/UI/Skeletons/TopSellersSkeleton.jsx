import SkeletonShimmer from "./SkeletonShimmer";
import "../../../css/HomeComponents.css";

const TopSellerSkeleton = () => {
  return (
    <li className="author_list_item--skeleton">
      <SkeletonShimmer className="author_list_pp--skeleton" />
      <SkeletonShimmer className="author_list_info--skeleton" />
    </li>
  );
};

export default TopSellerSkeleton;
