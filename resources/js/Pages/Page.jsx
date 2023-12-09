import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";

import MediaQuery from "@/Components/MediaQuery";
import Navbar from "@/Utils/Navbar/Navbar";

const Page = ({ children }) => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(i18n.store.data.jp.translation);

    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else {
            setIsLanguage(i18n.store.data.ch.translation);
        }
    }, [i18n.language]);

    return (
        <Router>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        <Head title="Oll Design" />
                        {matches ? (
                            <p>Mobile view</p>
                        ) : (
                            <div className="container-fluid px-12">
                                <div className="row">
                                    <div className="col-2 col-md-3">
                                        <Navbar language={isLanguage} />
                                    </div>
                                    <div className="col-10 col-md-9 mt-16 mb-6">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </MediaQuery>
        </Router>
    );
};

export default Page;
