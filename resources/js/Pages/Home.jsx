import React, { useState, useEffect } from "react";
import Navbar from "@/Utils/Navbar/Navbar";
import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Gallery from "@/Pages/Gallery/Gallery";

import { imgGroupper, img } from "../Static/index";

import GalleryDetail from "./Gallery/Detail/GalleryDetail";

import Test from "./Test";

const Home = () => {
    const [filter, setFilter] = useState("#all");
    const [isPageId, setIsPageId] = useState(0);

    const getDetailId = (selected) => {
        setIsPageId(selected);
    };

    const getFilter = (selected) => {
        setFilter(selected);
    };

    const filterImg = img.filter((imgFilter) => {
        if (filter === "#all") {
            return img;
        } else {
            return imgFilter.navigate === filter;
        }
    });

    const onDetailPageId = img.filter((pages) => {
        return pages.id === parseInt(isPageId);
    });

    return (
        <>
            <div className="container-fluid px-12">
                <div className="row">
                    <div className="col-2 col-md-3">
                        <Navbar />
                    </div>
                    <div className="col-10 col-md-9">
                        <div className="mt-16" />
                        {isPageId !== 0 ? (
                            <GalleryDetail detailPages={onDetailPageId} />
                        ) : (
                            <>
                                <ImgGroupper
                                    data={imgGroupper}
                                    onGetFilter={getFilter}
                                />
                                <Gallery
                                    imgData={filterImg}
                                    onGetDetailId={getDetailId}
                                />
                            </>
                        )}
                        {/* <GalleryDetail /> */}

                        {/* <Test /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
