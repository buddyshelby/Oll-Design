import React, { useEffect } from "react";

import classes from "./GalleryDetail.module.css";

const GalleryDetail = (props) => {

    const detailPages = props.detailPages[0]

    const dateObject = new Date(detailPages.Date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString();
    
    return (
        <div className="w-full relative flex flex-col items-center">
            {/* Photo Jumbotron  */}
            <div className={`w-full text-white bg-cover bg-center bg-no-repeat ${classes['bg-jumbotron']}`} style={{ height: '60vh', backgroundImage: `url("storage/${detailPages.Img[0]}")` }} />
            <div style={{ maxWidth: '680px' }}>
                <div className="my-6 flex flex-col">
                    <span>JAPAN {year}</span>
                    <span>{detailPages.Name}</span>
                </div>
                <div className="mb-5">
                    <span>{`${year}.${month}`}</span>
                </div>
                <div className="mb-5 flex flex-col">
                    <span>{detailPages.City_Name}</span>
                    <span>Completed</span>
                </div>

                <div className="mb-16">
                    <span>{detailPages.DescriptionEn}</span>
                </div>

                {/* Image Showup */}
                <div>
                    {detailPages.Img.map((item, index) => {
                        return (
                            <div key={index}>
                                <img src={`storage/${item}`} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default GalleryDetail;
