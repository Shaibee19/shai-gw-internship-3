import SkeletonShimmer from "./SkeletonShimmer";
import "../../../css/HomeComponents.css";

const NewItemsSkeleton = () => {
  return (
    <div className="newitem--skeleton">
      <SkeletonShimmer className="newitem_img--skeleton" />

      <div className="newitem_info--skeleton">
        <SkeletonShimmer className="newitem_title--skeleton" />
        <SkeletonShimmer className="newitem_price--skeleton" />
      </div>

      <div className="newitem_footer--skeleton">
        <SkeletonShimmer className="newitem_pp--skeleton" />
        <SkeletonShimmer className="newitem_likes--skeleton" />
      </div>
    </div>
  );
};

export default NewItemsSkeleton;
