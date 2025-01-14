import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import ImgGroupper from "@/Utils/ImageGroupper/ImgGroupper";
import Page from "./Page";

import Gallery from "@/Pages/Gallery/Gallery";
import GalleryDetail from "@/Pages/Gallery/Detail/GalleryDetail";
import HomeSkeleton from "@/Components/HomeSkeleton";
import { sleep } from "@/Utils/Sleep/sleep";

const ITEMS_PER_PAGE = 9999999;

const Home = () => {
    const [isData, setIsData] = useState([]);
    const [isPageId, setIsPageId] = useState(0);
    const [filter, setFilter] = useState("#all");
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [navDate, setNavDate] = useState([])
    const [galleryDetailView, setGalleryDetailView] = useState(false)
    const [imageShow, setImageShow] = useState(false)
    const [hideLoad, setHideLoad] = useState(false)
    const [loadPercent, setLoadPercent] = useState(0)
    const [imageLoaded, setImageLoaded] = useState([])
    const [totalImage, setTotalImage] = useState(0)

    const allImage = (event) => {
        setImageLoaded((prevLoaded) => [
            ...prevLoaded,
            event
        ]);
    }

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
        isData.forEach( async (item, index) => {
            // const getRandomImage = Math.floor(Math.random() * item.Img.length)
            // item['randomImage'] = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`

            item.Img.forEach(item => {
                const img = new Image();
                img.src = `https://olldesign.jp/storage/${item}`;
                
                img.onload = () => {
                    allImage(img.src)
                };
            })

            setTotalImage(prev => (prev + item.Img.length))
        })
    }, [isData])

    useEffect(() => {
        console.log(totalImage);
        
    }, [totalImage])

    useEffect(() => {
        if (imageLoaded.length !== 0) {
            const uniqueSortedArray = [...new Set(imageLoaded)].sort((a, b) => a - b);
            const totalData = uniqueSortedArray.length / totalImage * 100
            const loopLoading = async () => {
                for (let index = loadPercent; index <= totalData; index++) {
                    await sleep(10)
                    if (index <= 100) {
                        setLoadPercent(index)
                    }
                    if (index === 100) {
                        setHideLoad(true)
                        setImageShow(true)
                    }
                }
            }
    
            loopLoading()
        }
        
    }, [imageLoaded])

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
            setIsLoading(false);
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

    const onDetailPageId = isData.filter((pages) => {
        return pages.id === parseInt(isPageId);
    });

    const dislayList = filteredData.slice(
        0 * ITEMS_PER_PAGE,
        (0 + 1) * ITEMS_PER_PAGE
    )

    return (
        <Page imageShow={imageShow} hideLoad={hideLoad} loadPercent={loadPercent} galleryDetailView={galleryDetailView}>
            <div>
                {isPageId === 0 ? (
                    <>
                        <ImgGroupper onGetFilter={getFilter} navDate={navDate} />
                        {isLoading ? (
                            <HomeSkeleton count={isData.length} />
                        ) : (
                            <Gallery
                                setImageShow={setImageShow}
                                setHideLoad={setHideLoad}
                                setLoadPercent={setLoadPercent}
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
