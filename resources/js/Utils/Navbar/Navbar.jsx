import React from "react";
import classes from "./Navbar.module.css";
import { brand, menu, socialMedia, lang } from "../../Static/index";

import { useTranslation, withTranslation, Trans } from "react-i18next";

const Navbar = () => {
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
                        <button key={item.id}>{item.lang}</button>
                    ))}
                </div>
                <div className={classes["sidebar-title"]}>
                    {menu.map((m) => (
                        <a href={m.url} key={m.id}>
                            {m.menu}
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
