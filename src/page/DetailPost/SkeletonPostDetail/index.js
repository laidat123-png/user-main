import Skeleton from "react-loading-skeleton";


export const SkeletonPostDetail = () => {
    return (
        <div className="skeleton-post">
            <Skeleton width="20%" />
            <Skeleton height={30} />
            <Skeleton width="30%" />
            <Skeleton height={200} />
            <Skeleton height={1000} />
            <Skeleton height={150} />
            <Skeleton height={50} />
        </div>
    )
}