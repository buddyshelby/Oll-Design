import React, { useState, useEffect } from "react";
import axios from "axios";

import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Page from "../Page";

import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "@/Pages/Gallery/Detail/GalleryDetail";
import HomeSkeleton from "@/Components/HomeSkeleton";

const ITEMS_PER_PAGE = 999999;

const Portofolio = () => {
    const [isData, setIsData] = useState([]);
    const [isPageId, setIsPageId] = useState(0);
    const [filter, setFilter] = useState("#all");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [navDate, setNavDate] = useState([])
    const [galleryDetailView, setGalleryDetailView] = useState(false)
    const [imageShow, setImageShow] = useState(false)
    const [hideLoad, setHideLoad] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fill = ['all']
        isData.forEach(item => {

            const dateObject = new Date(item.Date);
            const year = Number(dateObject.getFullYear()) < 2021 ? 2021 : dateObject.getFullYear()

            fill.push(year)
        })
        fill.push('Graphic Design')
        fill.sort((a, b) => b - a)
        setNavDate([...new Set (fill)])
    }, [isData])

    useEffect(() => {
        const newFilteredData = isData.filter((item) => {

            const dateObject = new Date(item.Date)
            const year = filter === '#Graphic%20Design'
                ? (item.TagsID === "2"
                    ? `Graphic%20Design`
                    : dateObject.getFullYear())
                : (Number(dateObject.getFullYear()) < 2021 
                    ? 2021 
                    : dateObject.getFullYear())
            
            return filter === "#all" || `#${year}` === filter;
        });
        setFilteredData(newFilteredData);
    }, [isData, filter]);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "https://olldesign.jp/api/galleryList"
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
        <Page imageShow={imageShow} hideLoad={hideLoad} galleryDetailView={galleryDetailView}>
            <div className={`${!galleryDetailView ? 'md:mt-16' : ''}`}>
                {isPageId === 0 ? (
                    <>
                        <ImgGroupper onGetFilter={getFilter} navDate={navDate} />
                        {isLoading ? (
                            <HomeSkeleton count={isData.length} />
                        ) : (
                            <Gallery
                                setImageShow={setImageShow}
                                setHideLoad={setHideLoad}
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

export default Portofolio;
