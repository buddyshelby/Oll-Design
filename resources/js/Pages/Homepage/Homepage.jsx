import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";

import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Homepage.module.css";

const Company = () => {
    let wordLength = 0
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(Object.values(i18n.store.data)[0].translation);

    const [maxSizeDiv, setMaxSizeDiv] = useState(0)
    const elementAll = document.querySelectorAll('div');

    useEffect(() => {
        const checkWord = Array.from(elementAll).find(item => item.innerHTML === maxSizeDiv)
        if (checkWord !== undefined)
            setMaxSizeDiv(checkWord.clientWidth + 16)
    }, [maxSizeDiv])

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

    const instagracmClick = () => {
        window.open('https://www.instagram.com/olldesign_1010', '_blank')
    }

    return (
        <Page>
            <div className="w-full h-full">
                tes
            </div>
        </Page>
    );
};

export default Company;
