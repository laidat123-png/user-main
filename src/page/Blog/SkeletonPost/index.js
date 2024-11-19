import Skeleton from 'react-loading-skeleton'; // Import component Skeleton từ thư viện react-loading-skeleton

// Định nghĩa component SkeletonPost
export const SkeletonPost = () => {
    return (
        <div>
            <div className="skeleton-post">
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
                <Skeleton height={30} /> {/* Hiển thị khung xương với chiều cao 30px */}
                <Skeleton width="30%" /> {/* Hiển thị khung xương với chiều rộng 30% */}
                <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
                <Skeleton height={50} /> {/* Hiển thị khung xương với chiều cao 50px */}
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
            </div>
            <div className="skeleton-post">
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
                <Skeleton height={30} /> {/* Hiển thị khung xương với chiều cao 30px */}
                <Skeleton width="30%" /> {/* Hiển thị khung xương với chiều rộng 30% */}
                <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
                <Skeleton height={50} /> {/* Hiển thị khung xương với chiều cao 50px */}
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
            </div>
            <div className="skeleton-post">
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
                <Skeleton height={30} /> {/* Hiển thị khung xương với chiều cao 30px */}
                <Skeleton width="30%" /> {/* Hiển thị khung xương với chiều rộng 30% */}
                <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
                <Skeleton height={50} /> {/* Hiển thị khung xương với chiều cao 50px */}
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
            </div>
            <div className="skeleton-post">
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
                <Skeleton height={30} /> {/* Hiển thị khung xương với chiều cao 30px */}
                <Skeleton width="30%" /> {/* Hiển thị khung xương với chiều rộng 30% */}
                <Skeleton height={200} /> {/* Hiển thị khung xương với chiều cao 200px */}
                <Skeleton height={50} /> {/* Hiển thị khung xương với chiều cao 50px */}
                <Skeleton width="20%" /> {/* Hiển thị khung xương với chiều rộng 20% */}
            </div>
        </div>
    )
}