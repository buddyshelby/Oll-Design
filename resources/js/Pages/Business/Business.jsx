import React, { useState, useEffect , useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Card from "@/Components/Card";
import EllipsisText from "@/Components/Ellipsis";
import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Business.module.css";

const Business = () => {
    const [collapse, setCollapse] = useState(true);
    const elementRef = useRef(null);
    // const [scrollPercentage, setScrollPercentage] = useState(0);

    // const toggleCollapse = () => {
    //     setCollapse(!collapse);
    // };

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         const windowHeight = window.innerHeight;
    //         const fullHeight = document.body.scrollHeight;

    //         const totalPageScroll = fullHeight - windowHeight;
    //         const currentScrollPercentage =
    //             (scrollPosition / totalPageScroll) * 100;

    //         setScrollPercentage(currentScrollPercentage);
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    // console.log(scrollPercentage.toFixed());

    

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        {matches ? (
                            <>
                                <div className="mb-2">
                                    <div className="text-2xl font-black">
                                        <span>
                                            GOOD DESIGN MAKES YOU HAPPY.
                                        </span>
                                    </div>
                                    <div className="text-1xl font-normal">
                                        <span>Here’s what we do:</span>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <Card
                                        color={"bg-[#F4F3F3]"}
                                        rounded={"rounded-[16px]"}
                                        padding={"p-4"}
                                    >
                                        <div className={classes["card-list"]}>
                                            <div
                                                className={`${classes["card-placement"]} drop-shadow-xl`}
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-component"
                                                        ]
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
                                                                expand={
                                                                    collapse
                                                                }
                                                                text="Offering a new dimension to architectural vision, our Perspective service provides innovative visualizations that bring your projects to life. Experience a comprehensive view with detailed renderings and immersive presentations that capture the essence of your design before it's built."
                                                            />
                                                            <div
                                                                className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                                onClick={
                                                                    toggleCollapse
                                                                }
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${classes["card-placement"]} drop-shadow-xl`}
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-component"
                                                        ]
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
                                                                expand={
                                                                    collapse
                                                                }
                                                                text="We specialize in creating bespoke and top-notch designs tailored to your specific requirements, professional and high quality results that exceed your expectations."
                                                            />
                                                            <div
                                                                className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                                onClick={
                                                                    toggleCollapse
                                                                }
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${classes["card-placement"]} drop-shadow-xl`}
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-component"
                                                        ]
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
                                                                expand={
                                                                    collapse
                                                                }
                                                                text="Crafting visual stories, our Graphic service delivers striking graphic solutions that embody your brand's identity. From logos to layouts, we blend art and strategy to create graphic elements that are not only visually captivating but also communicate your message effectively."
                                                            />
                                                            <div
                                                                className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                                onClick={
                                                                    toggleCollapse
                                                                }
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${classes["card-placement"]} drop-shadow-xl`}
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "card-component"
                                                        ]
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
                                                                expand={
                                                                    collapse
                                                                }
                                                                text="Guiding you through the maze of design decisions, our Consultation service offers expert advice tailored to your unique needs. We listen, analyze, and provide strategic recommendations to ensure your architectural and design projects are both aesthetically pleasing and functionally sound."
                                                            />
                                                            <div
                                                                className="flex justify-end absolute right-3 bottom-3 cursor-pointer"
                                                                onClick={
                                                                    toggleCollapse
                                                                }
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </>
                        ) : (
                            <div className="container">
                                <div className="my-4">
                                    <div
                                        ref={elementRef}
                                        style={{ marginTop: "300vh" }}
                                    >
                                        {/* Konten elemen yang akan diberi animasi */}
                                        <h1>
                                            Fade Out Up on Scroll with GSAP
                                            ScrollTrigger
                                        </h1>
                                    </div>
                                    <div className="text-6xl font-black text-center mb-10">
                                        <span>
                                            GOOD DESIGN <br /> MAKES YOU HAPPY.
                                        </span>
                                    </div>
                                    <div className="text-base font-normal text-center">
                                        <span>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Sint
                                            maiores inventore corrupti culpa,
                                            aperiam amet voluptate minus
                                            eligendi quos, distinctio fugiat
                                            reiciendis provident perspiciatis
                                            veritatis possimus quidem nobis.
                                            Repellat labore perferendis
                                            explicabo eum, ea asperiores et quia
                                            veniam nihil deserunt assumenda ut
                                            placeat, vero minima voluptas
                                            similique sapiente nobis accusantium
                                            impedit dignissimos error laboriosam
                                            ullam eaque tenetur. Eius architecto
                                            similique provident ipsam nihil
                                            doloremque fugit a quidem sint
                                            velit, voluptate tempora repellat
                                            eveniet id modi? Aliquam nesciunt
                                            quae amet exercitationem suscipit
                                            enim adipisci veritatis blanditiis
                                            repellendus, facilis quod. Iure
                                            ipsa, labore necessitatibus nobis
                                            quaerat ad magnam! Dolor impedit
                                            exercitationem sunt!
                                        </span>
                                    </div>
                                    <div className="text-base font-normal text-center">
                                        <span>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Sint
                                            maiores inventore corrupti culpa,
                                            aperiam amet voluptate minus
                                            eligendi quos, distinctio fugiat
                                            reiciendis provident perspiciatis
                                            veritatis possimus quidem nobis.
                                            Repellat labore perferendis
                                            explicabo eum, ea asperiores et quia
                                            veniam nihil deserunt assumenda ut
                                            placeat, vero minima voluptas
                                            similique sapiente nobis accusantium
                                            impedit dignissimos error laboriosam
                                            ullam eaque tenetur. Eius architecto
                                            similique provident ipsam nihil
                                            doloremque fugit a quidem sint
                                            velit, voluptate tempora repellat
                                            eveniet id modi? Aliquam nesciunt
                                            quae amet exercitationem suscipit
                                            enim adipisci veritatis blanditiis
                                            repellendus, facilis quod. Iure
                                            ipsa, labore necessitatibus nobis
                                            quaerat ad magnam! Dolor impedit
                                            exercitationem sunt!
                                        </span>
                                    </div>
                                </div>
                                <div className="text-2xl font-black text-center mb-6">
                                    - What we do -
                                </div>
                                <div className="flex gap-2">
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Prespective
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Prespective
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Store Design
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Store Design
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Graphic Design
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Graphic Design
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Design Consult
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Design Consult
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Prespective
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Prespective
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Store Design
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Store Design
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Graphic Design
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Graphic Design
                                        </div>
                                    </div>
                                    <div className={classes["box-component"]}>
                                        <div className={classes["box-icon"]}>
                                            Logo Design Consult
                                        </div>
                                        <div className={classes["box-title"]}>
                                            Design Consult
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </MediaQuery>
        </Page>
    );
};

export default Business;
