import React, { useState } from "react";

import Card from "@/Components/Card";
import EllipsisText from "@/Components/Ellipsis";
import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Business.module.css";

const Business = () => {
    const [collapse, setCollapse] = useState(true);

    const toggleCollapse = () => {
        setCollapse(!collapse);
    };

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        {matches ? (
                            <p>Mobile view</p>
                        ) : (
                            <div className="container-fluid">
                                <Card
                                    color={"bg-[#b1b1b1]"}
                                    rounded={"rounded-[16px]"}
                                    padding={"p-4"}
                                >
                                    <div className={classes["card-list"]}>
                                        <div
                                            className={`${classes["card-placement"]} drop-shadow-xl`}
                                        >
                                            <div
                                                className={
                                                    classes["card-component"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-sub-component"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes[
                                                                "component-front"
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes[
                                                                    "card-section"
                                                                ]
                                                            }
                                                        >
                                                            Perspective
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${classes["component-back"]} flex flex-column gap-3 relative`}
                                                    >
                                                        <span className="text-4xl font-bold">
                                                            Perspective
                                                        </span>
                                                        <EllipsisText
                                                            expand={collapse}
                                                            text="Offering a new dimension to architectural vision, our Perspective service provides innovative visualizations that bring your projects to life. Experience a comprehensive view with detailed renderings and immersive presentations that capture the essence of your design before it's built."
                                                        />
                                                        <div
                                                            className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                            onClick={
                                                                toggleCollapse
                                                            }
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`${classes["card-placement"]} drop-shadow-xl`}
                                        >
                                            <div
                                                className={
                                                    classes["card-component"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-sub-component"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes[
                                                                "component-front"
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes[
                                                                    "card-section"
                                                                ]
                                                            }
                                                        >
                                                            Design
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${classes["component-back"]} flex flex-column gap-3 relative`}
                                                    >
                                                        <span className="text-4xl font-bold">
                                                            Design
                                                        </span>
                                                        <EllipsisText
                                                            expand={collapse}
                                                            text="We specialize in creating bespoke and top-notch designs tailored to your specific requirements, professional and high quality results that exceed your expectations."
                                                        />
                                                        <div
                                                            className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                            onClick={
                                                                toggleCollapse
                                                            }
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`${classes["card-placement"]} drop-shadow-xl`}
                                        >
                                            <div
                                                className={
                                                    classes["card-component"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-sub-component"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes[
                                                                "component-front"
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes[
                                                                    "card-section"
                                                                ]
                                                            }
                                                        >
                                                            Graphic
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${classes["component-back"]} flex flex-column gap-3 relative`}
                                                    >
                                                        <span className="text-4xl font-bold">
                                                            Graphic
                                                        </span>
                                                        <EllipsisText
                                                            expand={collapse}
                                                            text="Crafting visual stories, our Graphic service delivers striking graphic solutions that embody your brand's identity. From logos to layouts, we blend art and strategy to create graphic elements that are not only visually captivating but also communicate your message effectively."
                                                        />
                                                        <div
                                                            className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                            onClick={
                                                                toggleCollapse
                                                            }
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`${classes["card-placement"]} drop-shadow-xl`}
                                        >
                                            <div
                                                className={
                                                    classes["card-component"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-sub-component"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes[
                                                                "component-front"
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes[
                                                                    "card-section"
                                                                ]
                                                            }
                                                        >
                                                            Consultation
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${classes["component-back"]} flex flex-column gap-3 relative`}
                                                    >
                                                        <span className="text-4xl font-bold">
                                                            Consultation
                                                        </span>
                                                        <EllipsisText
                                                            expand={collapse}
                                                            text="Guiding you through the maze of design decisions, our Consultation service offers expert advice tailored to your unique needs. We listen, analyze, and provide strategic recommendations to ensure your architectural and design projects are both aesthetically pleasing and functionally sound."
                                                        />
                                                        <div
                                                            className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                            onClick={
                                                                toggleCollapse
                                                            }
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </>
                )}
            </MediaQuery>
        </Page>
    );
};

export default Business;
