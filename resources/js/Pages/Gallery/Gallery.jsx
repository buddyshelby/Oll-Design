import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MediaQuery from "@/Components/MediaQuery";

import "swiper/css";
import "./Swiper.css";
import classes from "./Gallery.module.css";

const Gallery = (props) => {
    const [isData, setIsData] = useState([]);

    useEffect(() => {
        setIsData(props.imgData);

        // Initialize ScrollTrigger after the component mounts
        gsap.registerPlugin(ScrollTrigger);

        // ScrollTrigger animations
        gsap.defaults({ ease: "power3" });

        // Function to animate each gallery item
        const animateGalleryItem = (item) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                stagger: { each: 0.15, grid: [1, 3] },
                overwrite: true,
            });
        };

        // Function to set initial state for gallery items
        const setInitialGalleryState = (item) => {
            gsap.set(item, { opacity: 0, y: -100, overwrite: true });
        };

        // Batch the gallery items with ScrollTrigger
        ScrollTrigger.batch(`.${classes["gallery-item"]}`, {
            onEnter: (batch) => batch.forEach(animateGalleryItem),
            onLeave: (batch) => batch.forEach(setInitialGalleryState),
            onEnterBack: (batch) => batch.forEach(animateGalleryItem),
            onLeaveBack: (batch) => batch.forEach(setInitialGalleryState),
        });

        // Refresh ScrollTrigger when the component updates
        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(`.${classes["gallery-item"]}`, { opacity: 0, y: -100 });
        });
    }, [props.imgData]);

    const onGetPageIdHandler = (e) => {
        props.onGetDetailId(e.currentTarget.id);
    };

    return (
        <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                    {matches ? (
                        <div className={classes["mobile-gallery"]}>
                            {isData.map((img) => (
                                <div
                                    id={img.id}
                                    key={img.id}
                                    onClick={onGetPageIdHandler}
                                >
                                    <Swiper
                                        autoplay={{
                                            delay: 3000 + img.id * 10,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay]}
                                        className="mySwiper"
                                        key={img.id}
                                    >
                                        {img.Img.map((i, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={`storage/` + i}
                                                    alt="images"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div
                                        className={`${classes["mobile-gallery-title"]} mt-2`}
                                    >
                                        {img.Name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={`${classes.gallery} mt-6`}>
                            {isData.map((img) => (
                                <div
                                    className={classes["gallery-item"]}
                                    id={img.id}
                                    key={img.id}
                                    onClick={onGetPageIdHandler}
                                >
                                    <Swiper
                                        autoplay={{
                                            delay: 3000 + img.id * 10,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay]}
                                        className="mySwiper"
                                        key={img.id}
                                    >
                                        {img.Img.map((i, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={`storage/` + i}
                                                    alt="images"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="gallery-title">
                                        <h2>{img.Name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </MediaQuery>
    );
};

export default Gallery;
