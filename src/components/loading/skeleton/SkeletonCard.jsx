import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = ({
    classSkeletonTitle,
    classSkeletonContainer,
    length = 6,
    height = '22vw',
}) => {
    return (
        <div
            className={`${classSkeletonContainer} container-skeleton grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4`}
        >
            {Array(length)
                .fill()
                .map((item, index) => (
                    <div key={index} className='wrapper-skeleton'>
                        <Skeleton height={height} />
                        <Skeleton height={25} className={classSkeletonTitle} />
                    </div>
                ))}
        </div>
    )
}

export { SkeletonCard }
