import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";

import MediaQuery from "@/Components/MediaQuery";
import Navbar from "@/Utils/Navbar/Navbar";
import WebLoader from "@/Components/WebLoader";

const Page = ({ onLoad = false, children }) => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(i18n.store.data.jp.translation);
    const [isLoader, setIsLoader] = useState();

    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else {
            setIsLanguage(i18n.store.data.ch.translation);
        }

        if (onLoad === true) {
            setTimeout(() => {
                setIsLoader(false)
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
                            <div className="container-fluid">
                                <div className="row">
                                    <Navbar language={isLanguage} />
                                </div>
                                <div className="row">{children}</div>
                            </div>
                        ) : (
                            <>
                                {isLoader ? (
                                    <WebLoader />
                                ) : (
                                    <div className="container-fluid">
                                        <div className="px-12">
                                            <div className="row">
                                                <div className="col-2 col-md-3">
                                                    <Navbar
                                                        language={isLanguage}
                                                    />
                                                </div>
                                                <div className="col-10 col-md-9 mt-16 mb-6">
                                                    {children}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </MediaQuery>
        </Router>
    );
};

export default Page;
