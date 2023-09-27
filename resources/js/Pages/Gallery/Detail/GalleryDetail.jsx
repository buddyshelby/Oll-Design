import React from "react";
import { img } from "../../../Static/index";


import classes from "./GalleryDetail.module.css";

const GalleryDetail = () => {
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
                                    <p>Emon Works</p>
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
                                    <p>Logo</p>
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
                                    <p>Design: Oll Design</p>
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
                                    <p>Oll Design, Inc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.desctription} mt-16`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque enim minima eos praesentium, cum labore voluptatum
                        incidunt soluta aut, veniam laboriosam dignissimos sint
                        quaerat eaque fugit rem impedit? Facilis, odio unde
                        deserunt corrupti quisquam repudiandae reprehenderit ea
                        aut error eveniet labore, aliquid qui natus numquam
                        accusamus a eos quo ad commodi inventore. Explicabo
                        temporibus aliquid consectetur possimus eveniet in ab
                        rerum animi aspernatur hic. Ratione, illo! Quis dolorem
                        magni fugiat, dignissimos nam provident tempore,
                        laudantium quia sit porro consequuntur sint laboriosam
                        soluta voluptatibus perspiciatis doloribus inventore
                        optio quas unde architecto dolores officiis fugit.
                        Voluptatibus temporibus nulla ex! Veritatis, assumenda
                        inventore.
                    </div>
                </div>
                <div className="row">
                    <div className={`${classes["contents-images"]} mt-8`}>
                        <div className={classes.images}>
                            <img src={img[0].url[0]} alt="test" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryDetail;
