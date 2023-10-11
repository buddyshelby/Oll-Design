import React, { useState, useEffect } from "react";
import Navbar from "@/Utils/Navbar/Navbar";
import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "./Gallery/Detail/GalleryDetail";
import Company from "./Company/Company";

import { useTranslation } from "react-i18next";


const Home = () => {
    const { i18n } = useTranslation();
    const [filter, setFilter] = useState("#all");
    const [isPageId, setIsPageId] = useState(0);
    const [isLanguage, setIsLanguage] = useState(i18n.store.data.jp.translation);

    const getDetailId = (selected) => {
        setIsPageId(selected);
    };

    const getFilter = (selected) => {
        setFilter(selected);
    };

    const filterImg = isLanguage.gallery.filter((imgFilter) => {
        if (filter === "#all") {
            return isLanguage.gallery;
        } else {
            return imgFilter.navigate === filter;
        }
    });

    const onDetailPageId = isLanguage.gallery.filter((pages) => {
        return pages.id === parseInt(isPageId);
    });
    
    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation)
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation)
        } else {
            setIsLanguage(i18n.store.data.jp.translation)
        }
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
                                    data={isLanguage.gallery_groups}
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

                        {/* <Company data={isLanguage.company} /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
