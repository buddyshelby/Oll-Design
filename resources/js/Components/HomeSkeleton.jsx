import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomeSkeleton({ count }) {
    const skeletonElements = Array.from({ length: count }).map((_, index) => (
        <div className="col my-2" key={index}>
            <Skeleton width={400} height={200} />
            <Skeleton width={400} />
            <Skeleton width={400} />
        </div>
    ));

    return (
        <div className="container-fluid">
            <div className="row">{skeletonElements}</div>
        </div>
    );
}
