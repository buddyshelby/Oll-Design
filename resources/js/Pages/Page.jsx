import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";

import MediaQuery from "@/Components/MediaQuery";
import Navbar from "@/Utils/Navbar/Navbar";
import WebLoader from "@/Components/WebLoader";

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
                <div className="relative flex items-center justify-center h-screen overflow-hidden">
                    <video autoPlay loop muted className="absolute z-10">
                        <source src="assets/video/video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="flex">
                    <Navbar language={isLanguage} />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 mt-16 mb-6">{children}</div>
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

        if (onLoad === true) {
            setTimeout(() => {
                setIsLoader(false);
            }, 2000);

            setIsLoader(true);
        }
    }, [i18n.language, onLoad]);

    return (
        <Router>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        <Head title="Oll Design" />
                        {matches ? (
                            <div className="flex-column">
                                <div className="relative h-screen">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        className="absolute inset-0 w-full h-full object-cover object-left"
                                    >
                                        <source
                                            src="assets/video/video.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <Navbar language={isLanguage} />
                                    </div>
                                    <div className="row">{children}</div>
                                </div>
                            </div>
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
