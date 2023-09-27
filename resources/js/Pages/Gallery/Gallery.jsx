import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./Swiper.css";
import classes from "./Gallery.module.css";

const Gallery = (props) => {
    const onPageRoute = () => {
        window.location.href ='/Detail/GalleryDetail';
    }
    return (
        <div className={`${classes.gallery} mt-6`}>
            {props.imgData.map((img) => (
                <div
                    className={classes["gallery-item"]}
                    key={img.id}
                    onClick={onPageRoute}
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
                        {img.url.map((i, index) => (
                            <SwiperSlide key={index}>
                                <img src={i} alt="images" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="gallery-title">
                        <h2>{img.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
