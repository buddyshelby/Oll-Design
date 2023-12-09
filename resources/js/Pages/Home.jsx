import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import MediaQuery from "@/Components/MediaQuery";
import Page from "./Page";

import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "@/Pages/Gallery/Detail/GalleryDetail";

const Home = () => {
    const { i18n } = useTranslation();
    const [isData, setIsData] = useState([]);
    const [filter, setFilter] = useState("#all");
    const [isPageId, setIsPageId] = useState(0);
    const [isLanguage, setIsLanguage] = useState(i18n.store.data.jp.translation);

    useEffect(() => {
        fetchData();
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else {
            setIsLanguage(i18n.store.data.ch.translation);
        }
    }, [i18n.language]);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/galleryList"
            );
            setIsData(res.data.galleryList);
        } catch (e) {
            console.error("Error fetching imagings:", e);
        }
    };

    const getDetailId = (selected) => {
        setIsPageId(selected);
    };

    const getFilter = (selected) => {
        setFilter(selected);
    };

    const filterImg = isData.filter((imgFilter) => {
        if (filter === "#all") {
            return isData;
        } else {
            return imgFilter.navigate === filter;
        }
    });

    const onDetailPageId = isData.filter((pages) => {
        return pages.id === parseInt(isPageId);
    });

    return (
        <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <Page>
                    {matches ? (
                        <p>Mobile view.</p>
                    ) : (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    isPageId === 0 ? (
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
                                        <GalleryDetail
                                            detailPages={onDetailPageId}
                                        />
                                    )
                                }
                            />
                        </Routes>
                    )}
                </Page>
            )}
        </MediaQuery>
    );
};

export default Home;
