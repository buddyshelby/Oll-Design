import React, { useState, useEffect } from "react";
import axios from "axios";

import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Page from "./Page";

import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "@/Pages/Gallery/Detail/GalleryDetail";
import HomeSkeleton from "@/Components/HomeSkeleton";

const Home = () => {
    const [isData, setIsData] = useState([]);
    const [isPageId, setIsPageId] = useState(0);
    const [filter, setFilter] = useState("#all");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const newFilteredData = isData.filter((item) => {
            return filter === "#all" || item.ShortTags === filter;
        });
        setFilteredData(newFilteredData);
    }, [isData, filter]);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/galleryList"
            );
            setIsData(res.data.galleryList);
            setIsLoading(false);
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

    const onDetailPageId = isData.filter((pages) => {
        return pages.id === parseInt(isPageId);
    });

    return (
        <Page onLoad={isLoading}>
            <>
                {isPageId === 0 ? (
                    <>
                        <ImgGroupper onGetFilter={getFilter} />
                        {isLoading ? (
                            <HomeSkeleton count={isData.length} />
                        ) : (
                            <Gallery
                                imgData={filteredData}
                                onGetDetailId={getDetailId}
                            />
                        )}
                    </>
                ) : (
                    <GalleryDetail detailPages={onDetailPageId} />
                )}
            </>
        </Page>
    );
};

export default Home;
