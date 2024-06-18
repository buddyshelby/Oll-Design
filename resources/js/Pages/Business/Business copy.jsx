import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import listIcon from "/public/assets/icon/Pages/Business/IconStorage";

import Card from "@/Components/Card";
import EllipsisText from "@/Components/Ellipsis";
import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Business.module.css";

const Business = () => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(
        Object.values(i18n.store.data)[0].translation
    );
    const [collapse, setCollapse] = useState(true);
    const titleRef = useRef(null);

    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "ja") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "en-US") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "ch") {
            setIsLanguage(i18n.store.data.ch.translation);
        } else {
            setIsLanguage(Object.values(i18n.store.data)[0].translation);
        }
    }, [i18n.language]);

    const checkTitlePosition = () => {
        if (titleRef.current) {
            return (
                titleRef.current.offsetTop + titleRef.current.clientHeight + 170
            );
        }
    };

    const wheelControl = (e) => {
        e.isDefaultPrevented();
        const topOfViewport = window.scrollY;
        const bottomOfViewport = window.scrollY + window.innerHeight;
        const titleTrigger = checkTitlePosition();
        const boxDiv = document.getElementsByClassName(
            classes["box-component"]
        );
        const boxDivTransform = document.getElementsByClassName(
            classes["box-component--transform"]
        );
        const checkDirectMouse = e.deltaY;

        const handleAnimation = (element) => {
            for (let index = 0; index < boxDivTransform.length; index++) {
                const element = boxDivTransform[index];
                element.style.display = "flex";

                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translate(0)";
                    element.style.transition = ".5s";
                }, 1500);
            }

            element.offsetWidth;
            element.classList.add(classes["hide"]);
            setTimeout(() => {
                if (
                    boxDivTransform[0].parentElement.parentElement
                        .previousSibling
                )
                    boxDivTransform[0].parentElement.parentElement.previousSibling.remove();
            }, 1500);
        };

        if (bottomOfViewport > titleTrigger) {
            for (let index = 0; index < boxDiv.length; index++) {
                const element = boxDiv[index];
                element.addEventListener(
                    "animationstart",
                    handleAnimation(element, "notTransform")
                );
            }
        }
    };

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        {matches ? (
                            <div className="my-4 px-4">
                                <div className="text-4xl font-black text-center mb-6">
                                    <span>
                                        GOOD DESIGN <br /> MAKES YOU HAPPY.
                                    </span>
                                </div>
                                <div className="text-base font-normal text-center mb-4">
                                    <span>
                                        {isLanguage.business.description1}
                                    </span>
                                </div>
                                <div className="text-base font-normal text-center mb-4">
                                    <span>
                                        {isLanguage.business.description2}
                                    </span>
                                </div>
                                <div className="text-xl font-black text-center mb-4">
                                    - What we do -
                                </div>
                                <div className="relative">
                                    <div className="w-full flex flex-column items-center">
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "perspective"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Perspective
                                            </div>
                                            <div
                                                className={classes["box-desc"]}
                                            >
                                                {
                                                    isLanguage.business
                                                        .prespective
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "storeDesign"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Store Design
                                            </div>
                                            <div
                                                className={classes["box-desc"]}
                                            >
                                                {
                                                    isLanguage.business
                                                        .storedesign
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "graphDesign"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Graphic Design
                                            </div>
                                            <div
                                                className={classes["box-desc"]}
                                            >
                                                {
                                                    isLanguage.business
                                                        .graphicdesign
                                                }
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "designConsult"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Design Consult
                                            </div>
                                            <div
                                                className={classes["box-desc"]}
                                            >
                                                {
                                                    isLanguage.business
                                                        .designconsult
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="my-4 px-10"
                                style={{ maxWidth: "75vw" }}
                            >
                                <div
                                    className="container"
                                    onWheel={wheelControl}
                                    onTouchMove={wheelControl}
                                >
                                    <div className="text-6xl font-black text-center mb-10">
                                        <span>
                                            GOOD DESIGN <br /> MAKES YOU HAPPY.
                                        </span>
                                    </div>
                                    <div className="text-base font-normal text-center">
                                        <span>
                                            {isLanguage.business.description1}
                                        </span>
                                    </div>
                                    <div className="text-base font-normal text-center">
                                        <span>
                                            {isLanguage.business.description2}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="text-2xl font-black text-center mb-6"
                                    ref={titleRef}
                                >
                                    - What we do -
                                </div>
                                <div className="w-full relative">
                                    <div className="w-full flex gap-2 absolute">
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "perspective"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Perspective
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "storeDesign"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Store Design
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "graphDesign"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Graphic Design
                                            </div>
                                        </div>
                                        <div
                                            className={classes["box-component"]}
                                        >
                                            <div
                                                className={classes["box-icon"]}
                                            >
                                                <img
                                                    src={listIcon(
                                                        "designConsult"
                                                    )}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div
                                                className={classes["box-title"]}
                                            >
                                                Design Consult
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col sticky">
                                        <div className="flex gap-2">
                                            <div
                                                className={
                                                    classes[
                                                        "box-component--transform"
                                                    ]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "box-icon--transform"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        src={listIcon(
                                                            "perspective"
                                                        )}
                                                        alt=""
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-title--transform"
                                                        ]
                                                    }
                                                >
                                                    Prespective
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-desc--transform"
                                                        ]
                                                    }
                                                >
                                                    {
                                                        isLanguage.business
                                                            .prespective
                                                    }
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes[
                                                        "box-component--transform"
                                                    ]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "box-icon--transform"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        src={listIcon(
                                                            "storeDesign"
                                                        )}
                                                        alt=""
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-title--transform"
                                                        ]
                                                    }
                                                >
                                                    Store Design
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-desc--transform"
                                                        ]
                                                    }
                                                >
                                                    {
                                                        isLanguage.business
                                                            .storedesign
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div
                                                className={
                                                    classes[
                                                        "box-component--transform"
                                                    ]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "box-icon--transform"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        src={listIcon(
                                                            "graphDesign"
                                                        )}
                                                        alt=""
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-title--transform"
                                                        ]
                                                    }
                                                >
                                                    Graphic Design
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-desc--transform"
                                                        ]
                                                    }
                                                >
                                                    {
                                                        isLanguage.business
                                                            .graphicdesign
                                                    }
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes[
                                                        "box-component--transform"
                                                    ]
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "box-icon--transform"
                                                        ]
                                                    }
                                                >
                                                    <img
                                                        src={listIcon(
                                                            "designConsult"
                                                        )}
                                                        alt=""
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-title--transform"
                                                        ]
                                                    }
                                                >
                                                    Design Consult
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "box-desc--transform"
                                                        ]
                                                    }
                                                >
                                                    {
                                                        isLanguage.business
                                                            .designconsult
                                                    }
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
