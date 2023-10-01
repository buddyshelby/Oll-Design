import React, { useState, useEffect } from "react";
import Navbar from "@/Utils/Navbar/Navbar";
import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Gallery from "@/Pages/Gallery/Gallery";

import { imgGroupper, img } from "../Static/index";

import GalleryDetail from "./Gallery/Detail/GalleryDetail";

import Test from './Test';

const Home = () => {
    const [filter, setFilter] = useState("#all");

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

    return (
        <>
            <div className="container-fluid px-12">
                <div className="row">
                    <div className="col-2">
                        <Navbar />
                    </div>
                    <div className="col-10">
                        <div className="mt-16" />
                        {/* <ImgGroupper
                            data={imgGroupper}
                            onGetFilter={getFilter}
                        />
                        <Gallery imgData={filterImg} /> */}

                        {/* <GalleryDetail /> */}

                        <Test />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
