import React, { useState } from "react";
import Navbar from "@/Utils/Navbar/Navbar";
import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Gallery from "@/Pages/Gallery/Gallery";

import { useTranslation } from "react-i18next";

import GalleryDetail from "./Gallery/Detail/GalleryDetail";

import Test from "./Test";

const Home = () => {
    const { i18n } = useTranslation();
    const [filter, setFilter] = useState("#all");
    const [isPageId, setIsPageId] = useState(0);
    
    let data;

    if (i18n.language === "jp") {
        data = i18n.store.data.jp.translation
    } else if (i18n.language === "en") {
        data = i18n.store.data.en.translation
    } else {
        data = i18n.store.data.ch.translation
    }

    const getDetailId = (selected) => {
        setIsPageId(selected);
    };

    const getFilter = (selected) => {
        setFilter(selected);
    };

    const filterImg = data.gallery.filter((imgFilter) => {
        if (filter === "#all") {
            return data.gallery;
        } else {
            return imgFilter.navigate === filter;
        }
    });

    const onDetailPageId = data.gallery.filter((pages) => {
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
                        {isPageId === 0 ? (
                            <>
                                <ImgGroupper
                                    data={data.gallery_groups}
                                    onGetFilter={getFilter}
                                />
                                <Gallery
                                    imgData={filterImg}
                                    onGetDetailId={getDetailId}
                                />
                            </>
                        ) : (
                            <GalleryDetail detailPages={onDetailPageId} />
                        )}
                        {/* <Test /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
