import React, { useEffect } from "react";
import { img } from "../../../Static/index";

import classes from "./GalleryDetail.module.css";

const GalleryDetail = (props) => {
    const detail = props.detailPages[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={classes["gallery-detail"]}>
            <div className="container">
                <div className="px-4">
                    <div className="row">
                        <div className="col">
                            <div className={classes["title-contents"]}>
                                <div className={classes.content}>
                                    <p>title</p>
                                </div>
                                <div className={classes.content}>
                                    <p>-</p>
                                </div>
                                <div className={classes.content}>
                                    <p>{detail.works_title}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={classes["title-contents"]}>
                                <div className={classes.content}>
                                    <p>contents</p>
                                </div>
                                <div className={classes.content}>
                                    <p>-</p>
                                </div>
                                <div className={classes.content}>
                                    <p>{detail.works_content}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={classes["title-contents"]}>
                                <div className={classes.content}>
                                    <p>credit</p>
                                </div>
                                <div className={classes.content}>
                                    <p>-</p>
                                </div>
                                <div className={classes.content}>
                                    <p>{detail.works_credit}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={classes["title-contents"]}>
                                <div className={classes.content}>
                                    <p>client</p>
                                </div>
                                <div className={classes.content}>
                                    <p>-</p>
                                </div>
                                <div className={classes.content}>
                                    <p>{detail.works_client}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.desctription} mt-16`}>
                        {detail.description}
                    </div>
                </div>
                <div className="row">
                    <div className={`${classes["contents-images"]} mt-8`}>
                        {detail.url.map((img, index) => (
                            <div className={classes.images} key={index}>
                                <img src={img} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryDetail;
