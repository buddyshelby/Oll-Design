import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";

import MediaQuery from "@/Components/MediaQuery";
import Navbar from "@/Utils/Navbar/Navbar";
import WebLoader from "@/Components/WebLoader";

import classes from "./Page.module.css";

const Page = ({ onLoad = false, children }) => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(
        Object.values(i18n.store.data)[0].translation
    );
    const [isLoader, setIsLoader] = useState();
    const currentPath = window.location.pathname;

    let content = (
        <div className="flex">
            <Navbar language={isLanguage} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-16 mb-6">{children}</div>
                </div>
            </div>
        </div>
    );

    if (currentPath === "/") {
        content = (
            <div className="flex-column">
                {/* <div className="relative flex items-center justify-center h-screen overflow-hidden">
                    <video autoPlay loop muted className="absolute z-10">
                        <source src="assets/video/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-16">
                        <a href="#section-scroll">
                            <div className={classes["scroll-down"]}></div>
                        </a>
                    </div>
                </div> */}
                <div className="relative flex" id="section-scroll">
                    <Navbar language={isLanguage} />
                    <div className="w-full h-full relative">
                        <video autoPlay loop muted className="w-screen h-screen object-cover">
                            <source src="assets/video/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute w-full bottom-16">
                            <a href="#section-scroll">
                                <div className={classes["scroll-down"]}></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "ja") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "en-US") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.ch.translation);
        } else {
            setIsLanguage(Object.values(i18n.store.data)[0].translation);
        }
    }, [i18n.language]);

    useEffect(() => {
        if (onLoad === true) {
            setTimeout(() => {
                setIsLoader(false);
            }, 2000);

            setIsLoader(true);
        }
    }, [onLoad])

    return (
        <Router>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        <Head title="Oll Design" />
                        {matches ? (
                            currentPath === "/" ? (
                                <div className="relative flex-col">
                                    <div className="relative w-full">
                                        <div className="absolute row h-fit z-10" style={{ backgroundColor: 'rgba(223,223,223, 0.7)', width: 'calc(100vw + 12px)' }}>
                                            <Navbar language={isLanguage} />
                                        </div>
                                        <div className="w-full h-full relative">
                                            <video autoPlay loop muted className="w-screen h-screen object-cover">
                                                <source src="assets/video/video.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className="absolute w-full bottom-16">
                                                <a href="#section-scroll">
                                                    <div className={classes["scroll-down"]}></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="container-fluid">
                                    <div className="row">
                                        <Navbar language={isLanguage} />
                                    </div>
                                    <div className="row">{children}</div>
                                </div>
                            )
                        ) : (
                            <>{isLoader ? <WebLoader /> : content}</>
                        )}
                    </>
                )}
            </MediaQuery>
        </Router>
    );
};

export default Page;
