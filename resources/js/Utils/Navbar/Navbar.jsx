import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import { brand, menu, socialMedia, lang } from "../../Static/index";

import { useTranslation } from "react-i18next";
import MediaQuery from "@/Components/MediaQuery";

const Navbar = ({ language }) => {
    const { i18n } = useTranslation();
    const [isHover, setIsHover] = useState(null);

    const isLanguage = language;

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
    return (
        <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                    {matches ? (
                        <p>Navbar Mobile</p>
                    ) : (
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
                                                    item.lang
                                                        .toString()
                                                        .toLowerCase()
                                                )
                                            }
                                        >
                                            {item.lang}
                                        </button>
                                    ))}
                                </div>
                                <div className={classes["sidebar-title"]}>
                                    {isLanguage.navbar_jp.map((m) => (
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
                                    ))}
                                </div>
                                <div className={classes["sidebar-socialmedia"]}>
                                    {socialMedia.map((sm) => (
                                        <a
                                            href={sm.url}
                                            key={sm.id}
                                            target="_blank"
                                        >
                                            {sm.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </MediaQuery>
    );
};

export default Navbar;
