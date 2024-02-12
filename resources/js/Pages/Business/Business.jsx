import React, { useState, useEffect , useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import listIcon from '/public/assets/icon/Pages/Business/IconStorage'


import Card from "@/Components/Card";
import EllipsisText from "@/Components/Ellipsis";
import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Business.module.css";

const Business = () => {

    const [collapse, setCollapse] = useState(true);
    const elementRef = useRef(null);
    const titleRef = useRef(null);
    const [programTransformation, setProgramTransformation] = useState(true)
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

    const checkTitlePosition = () => {
        if (titleRef.current) {
            return titleRef.current.offsetTop + titleRef.current.clientHeight + 170;
        }
    }

    const wheelControl = (e) => {
        e.isDefaultPrevented()
        const topOfViewport = window.scrollY
        const bottomOfViewport = window.scrollY + window.innerHeight
        const titleTrigger = checkTitlePosition()
        const boxDiv = document.getElementsByClassName(classes["box-component"])
        const boxDivTransform = document.getElementsByClassName(classes["box-component--transform"])
        const checkDirectMouse = e.deltaY

        const handleAnimation = (element) => {

            for (let index = 0; index < boxDivTransform.length; index++) {
                const element = boxDivTransform[index];
                element.style.display = 'flex'

                setTimeout(() => {
                    element.style.opacity = '1'
                    element.style.transform = 'translate(0)'
                    element.style.transition = '.5s'
                }, 1500);
            }

            element.offsetWidth
            element.classList.add(classes["hide"]);
            setTimeout(() => {
                if (boxDivTransform[0].parentElement.parentElement.previousSibling)
                boxDivTransform[0].parentElement.parentElement.previousSibling.remove()
            }, 1500);
        }

        
        if (bottomOfViewport > titleTrigger) {
            for (let index = 0; index < boxDiv.length; index++) {
                const element = boxDiv[index];
                element.addEventListener('animationstart', handleAnimation(element, 'notTransform'))
            }
        }
    }

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
                            <div className="container" onWheel={wheelControl} onTouchMove={wheelControl}>
                                <div className="my-4">
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
                                <div className="text-2xl font-black text-center mb-6" ref={titleRef}>
                                    - What we do -
                                </div>
                                <div className="w-full relative">
                                    <div className="w-full flex gap-2 absolute">
                                        <div className={classes["box-component"]}>
                                            <div className={classes["box-icon"]}>
                                                <img src={listIcon('perspective')} alt="" className="w-full h-full" />
                                            </div>
                                            <div className={classes["box-title"]}>
                                                Perspective
                                            </div>
                                        </div>
                                        <div className={classes["box-component"]}>
                                            <div className={classes["box-icon"]}>
                                                <img src={listIcon('storeDesign')} alt="" className="w-full h-full" />
                                            </div>
                                            <div className={classes["box-title"]}>
                                                Store Design
                                            </div>
                                        </div>
                                        <div className={classes["box-component"]}>
                                            <div className={classes["box-icon"]}>
                                                <img src={listIcon('graphDesign')} alt="" className="w-full h-full" />
                                            </div>
                                            <div className={classes["box-title"]}>
                                                Graphic Design
                                            </div>
                                        </div>
                                        <div className={classes["box-component"]}>
                                            <div className={classes["box-icon"]}>
                                                <img src={listIcon('designConsult')} alt="" className="w-full h-full" />
                                            </div>
                                            <div className={classes["box-title"]}>
                                                Design Consult
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col absolute">
                                        <div className="flex gap-2">
                                            <div className={classes["box-component--transform"]}>
                                                <div className={classes["box-icon--transform"]}>
                                                    <img src={listIcon('perspective')} alt="" className="w-full h-full" />
                                                </div>
                                                <div className={classes["box-title--transform"]}>
                                                    Prespective
                                                </div>
                                            </div>
                                            <div className={classes["box-component--transform"]}>
                                                <div className={classes["box-icon--transform"]}>
                                                    <img src={listIcon('storeDesign')} alt="" className="w-full h-full" />
                                                </div>
                                                <div className={classes["box-title--transform"]}>
                                                    Store Design
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className={classes["box-component--transform"]}>
                                                <div className={classes["box-icon--transform"]}>
                                                    <img src={listIcon('graphDesign')} alt="" className="w-full h-full" />
                                                </div>
                                                <div className={classes["box-title--transform"]}>
                                                    Graphic Design
                                                </div>
                                            </div>
                                            <div className={classes["box-component--transform"]}>
                                                <div className={classes["box-icon--transform"]}>
                                                    <img src={listIcon('designConsult')} alt="" className="w-full h-full" />
                                                </div>
                                                <div className={classes["box-title--transform"]}>
                                                    Design Consult
                                                </div>
                                            </div>
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
