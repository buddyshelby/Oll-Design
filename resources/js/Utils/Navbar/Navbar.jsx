import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { brand, menu, socialMedia, lang } from "../../Static/index";

import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { i18n } = useTranslation();
    const [isHover, setIsHover] = useState(null);
    const [isLanguage, setIsLanguage] = useState(
        i18n.store.data.jp.translation
    );

    // console.log(i18n, 'parent is language');
    // console.log(i18n.store.data.jp.translation, 'set is language');
    // console.log(isLanguage, 'isLanguage');

    const generateHoverData = () => {
        const hoverData = {};
        for (let i = 0; i <= isLanguage.navbar_jp.length; i++) {
            hoverData[i.toString()] = i;
        }
        return hoverData;
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleMouseOver = (e) => {
        const hoverData = generateHoverData();
        const targetId = e.target.id;

        if (hoverData.hasOwnProperty(targetId)) {
            setIsHover(hoverData[targetId]);
        }
    };

    const handleMouseOut = () => {
        setIsHover(null);
    };

    useEffect(() => {
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else {
            setIsLanguage(i18n.store.data.ch.translation);
        }
    });

    return (
        <div className={classes.sidebar}>
            <div className={classes["sidebar-content"]}>
                <div className={classes["sidebar-brand"]}>
                    <a href="/">
                        <h1>{brand}</h1>
                    </a>
                </div>
                <div className={`${classes.language} mt-2`}>
                    {lang.map((item) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                changeLanguage(
                                    item.lang.toString().toLowerCase()
                                )
                            }
                        >
                            {item.lang}
                        </button>
                    ))}
                </div>
                <div className={classes["sidebar-title"]}>
                    {/* {isLanguage.navbar_jp.map((m) => (
                        <a
                            href={m.url}
                            className="text-sm"
                            id={m.id}
                            key={m.id}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            {isHover === m.id
                                ? m.title_hover.toUpperCase()
                                : m.title.toUpperCase()}
                        </a>
                    ))} */}
                    {isLanguage.navbar_jp.map((m) => (
                        <Link
                            to={m.url}
                            className="text-sm"
                            id={m.id}
                            key={m.id}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            {isHover === m.id
                                ? m.title_hover.toUpperCase()
                                : m.title.toUpperCase()}
                        </Link>
                    ))}
                </div>
                <div className={classes["sidebar-socialmedia"]}>
                    {socialMedia.map((sm) => (
                        <a href={sm.url} key={sm.id} target="_blank">
                            {sm.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
