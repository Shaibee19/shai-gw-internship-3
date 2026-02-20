import "../../../css/SkeletonShimmer.css";

const SkeletonShimmer = ({ className = "", children }) => {
  return (
    <div className={`skeleton__shimmer--wrapper ${className}`}>
      {children}
    </div>
  );
};

export default SkeletonShimmer;
