import Skeleton from "react-loading-skeleton"; // Import component Skeleton từ thư viện react-loading-skeleton

// Định nghĩa component SkeletonPostDetail
export const SkeletonPostDetail = () => {
    return (
        <div className="skeleton-post">
            <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
            <Skeleton height={30} /> {/* Hiển thị khung xương với chiều cao 30px */}
            <Skeleton width="30%" /> {/* Hiển thị khung xương với chiều rộng 30% */}
            <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
            <Skeleton height={1000} /> {/* Hiển thị khung xương với chiều cao 1000px */}
            <Skeleton height={150} /> {/* Hiển thị khung xương với chiều cao 150px */}
            <Skeleton height={50} /> {/* Hiển thị khung xương với chiều cao 50px */}
        </div>
    )
}