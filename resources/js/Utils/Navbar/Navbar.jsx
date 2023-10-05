import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { brand, menu, socialMedia, lang } from "../../Static/index";

import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [ isHover, setIsHover ] = useState(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleMouseOver = (e) => {
        switch (e.target.id) {
            case "1": setIsHover(1); break;
            case "2": setIsHover(2); break;
            case "3": setIsHover(3); break;
            case "4": setIsHover(4); break;
        }
    }

    const handleMouseOut = () => {
        setIsHover(null);
    };

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
                        <button key={item.id} onClick={() => changeLanguage(item.lang.toString().toLowerCase())}>{item.lang}</button>
                    ))}
                </div>
                <div className={classes["sidebar-title"]}>
                    {/* <a href="" id="1" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{isHover === 1 ? t("navbar.projects") : t("navbar_jp.projects")}</a>
                    <a href="" id="2" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{isHover === 2 ? t("navbar.company_profile") : t("navbar_jp.company_profile")}</a>
                    <a href="" id="3" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{isHover === 3 ? t("navbar.design-works") : t("navbar_jp.design_works")}</a> */}
                    {i18n.store.data.jp.translation.navbar_jp.map((m) => (
                        <a href={m.url} className="text-sm" id={m.id} key={m.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                            {isHover === m.id ? m.title_hover.toUpperCase() : m.title}
                        </a>
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
