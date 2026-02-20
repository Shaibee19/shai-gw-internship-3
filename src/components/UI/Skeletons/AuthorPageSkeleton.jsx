import SkeletonShimmer from "./SkeletonShimmer";
import "../../../css/HomeComponents.css";

const AuthorPageSkeleton = () => {
  return (
    <div className="author_header--skeleton">
      <SkeletonShimmer className="author_pp--skeleton" />

      <div className="author_info--skeleton">
        <SkeletonShimmer className="author_name--skeleton" />
        <SkeletonShimmer className="author_username--skeleton" />
        <SkeletonShimmer className="author_wallet--skeleton" />
      </div>

      <div className="author_actions--skeleton">
        <SkeletonShimmer className="author_followers--skeleton" />
        <SkeletonShimmer className="author_button--skeleton" />
      </div>
    </div>
  );
};

export default AuthorPageSkeleton;
