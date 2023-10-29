import React from "react";

import Card from "@/Components/Card";

import classes from "./Business.module.css";

const Business = () => {
    return (
        <div className="container-fluid">
            <Card color={"bg-[#b1b1b1]"} rounded={"rounded-sm"} padding={"p-4"}>
                <div className={classes["card-list"]}>
                    <div className={classes["card-placement"]}>
                        <div className={classes["card-component"]}>
                            <div className={classes["card-sub-component"]}>
                                <div className={classes["component-front"]}>
                                    <div className={classes["card-header"]}>
                                        Logo
                                    </div>
                                    <div className={classes["card-section"]}>
                                        DESIGN
                                    </div>
                                    <div className={classes["card-footer"]}>
                                        SEE MORE &rarr;
                                    </div>
                                </div>
                                <div className={classes["component-back"]}>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Veniam qui nobis ipsam
                                        quos illum facere natus praesentium
                                        saepe ullam voluptate?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes["card-placement"]}>
                        <div className={classes["card-component"]}>
                            <div className={classes["card-sub-component"]}>
                                <div className={classes["component-front"]}>
                                    <div className={classes["card-header"]}>
                                        Logo
                                    </div>
                                    <div className={classes["card-section"]}>
                                        GRAPHIC
                                    </div>
                                    <div className={classes["card-footer"]}>
                                        SEE MORE &rarr;
                                    </div>
                                </div>
                                <div className={classes["component-back"]}>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Veniam qui nobis ipsam
                                        quos illum facere natus praesentium
                                        saepe ullam voluptate?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes["card-placement"]}>
                        <div className={classes["card-component"]}>
                            <div className={classes["card-sub-component"]}>
                                <div className={classes["component-front"]}>
                                    <div className={classes["card-header"]}>
                                        Logo
                                    </div>
                                    <div className={classes["card-section"]}>
                                        PRESPECTIVE
                                    </div>
                                    <div className={classes["card-footer"]}>
                                        SEE MORE &rarr;
                                    </div>
                                </div>
                                <div className={classes["component-back"]}>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Veniam qui nobis ipsam
                                        quos illum facere natus praesentium
                                        saepe ullam voluptate?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Business;
