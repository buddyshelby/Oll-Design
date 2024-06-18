import React, { useState, useEffect } from "react";
import axios from "axios";

import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Page from "./Page";

import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "@/Pages/Gallery/Detail/GalleryDetail";
import HomeSkeleton from "@/Components/HomeSkeleton";

const ITEMS_PER_PAGE = 9999999;

const Home = () => {
    const [isData, setIsData] = useState([]);
    const [isPageId, setIsPageId] = useState(0);
    const [filter, setFilter] = useState("#all");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [navDate, setNavDate] = useState([])
    const [galleryDetailView, setGalleryDetailView] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fill = ['all']
        isData.forEach(item => {

            const dateObject = new Date(item.Date);
            const year = dateObject.getFullYear();

            fill.push(year)
        })
        setNavDate([...new Set (fill)])
    }, [isData])

    useEffect(() => {
        const newFilteredData = isData.filter((item) => {

            const dateObject = new Date(item.Date);
            const year = dateObject.getFullYear();

            return filter === "#all" || `#${year}` === filter;
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

    const dislayList = filteredData.slice(
        0 * ITEMS_PER_PAGE,
        (0 + 1) * ITEMS_PER_PAGE
    )

    return (
        <Page onLoad={isLoading} galleryDetailView={galleryDetailView}>
            <div>
                {isPageId === 0 ? (
                    <>
                        <ImgGroupper onGetFilter={getFilter} navDate={navDate} />
                        {isLoading ? (
                            <HomeSkeleton count={isData.length} />
                        ) : (
                            <Gallery
                                imgData={dislayList}
                                onGetDetailId={getDetailId}
                                setGalleryDetailView={setGalleryDetailView}
                            />
                        )}
                    </>
                ) : (
                    <GalleryDetail detailPages={onDetailPageId} getDetailId={getDetailId} setGalleryDetailView={setGalleryDetailView} />
                )}
            </div>
        </Page>
    );
};

export default Home;
