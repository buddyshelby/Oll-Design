import React, { useState, useEffect, useRef, Fragment } from "react";
import { useTranslation } from "react-i18next";

import Page from "../Page";
import Loading from "../Loading/Loading";
import Graph from "./Graph";

import classes from "./Business.module.css";

const Business = () => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(
        Object.values(i18n.store.data)[0].translation
    );
    const [isLoading, setIsLoading] = useState({
        load: true,
        opacity: true
    })

    const desc2ndRef = useRef(null)

    const dataGraph = Object.keys(isLanguage.business[1].graphic)

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

    const imageLoadHandler = () => {
        setIsLoading({
            load: true,
            opacity: false,
        })
    }

    return (
        <Page>
            <div className="w-full relative flex flex-col items-center">
                {isLoading['load'] && <div className={`w-full h-screen absolute flex justify-center items-center ${isLoading['opacity'] ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`}>
                    <Loading />
                </div>}
                <div className={`w-9/12 transition-all duration-1000`} style={{ maxWidth: '895px', opacity: isLoading['opacity'] ? '0' : '100' }}>
                    <div className="w-full h-max relative flex flex-col justify-center items-center text-center">
                        <img className="w-full" src="/assets/images/Background.png" alt="" onLoad={imageLoadHandler} />
                        <div className="absolute top-0 mt-14 flex flex-col justify-center items-center">
                            <span className="font-normal text-3xl xl:text-5xl 2xl:text-6xl text-pink-600" style={{ fontFamily: '"Archivo Black", sans-serif', fontStyle: 'normal' }}>{ isLanguage.business[0].header.split('|||')[0] }</span>
                            <span className="font-semibold text-2xl xl:text-4xl 2xl:text-5xl text-pink-500 mt-2" style={{ fontFamily: '"Noto Sans Gothic", sans-serif', fontStyle: 'normal' }}>{ isLanguage.business[0].header.split('|||')[1] }</span>
                        </div>
                    </div>
                    <div className="w-full h-max relative flex flex-col justify-center text-justify text-sm 2xl:text-base mt-4" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        {isLanguage.business[0].desc.split('|||').map((item, index) => (
                            <Fragment key={index} >{ item } <br /></Fragment>
                        ))}
                    </div>
                    <div className="w-full h-max xl:text-lg 2xl:text-2xl relative flex flex-col mt-14 justify-center font-semibold text-pink-500" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        <div>{ isLanguage.business[1].header }</div>
                        <hr className="w-full opacity-50 text-black mt-2" style={{ height: '2px' }} />
                        <hr className="w-full opacity-50 text-black mt-1" style={{ height: '2px' }} />
                    </div>
                    <div className="w-full h-max relative flex flex-col md:flex-row justify-center text-justify text-sm 2xl:text-base mt-4" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        <div className="w-full md:w-1/2 h-fit mr-0 md:mr-4" ref={desc2ndRef}>
                            {isLanguage.business[1].desc.split('|||').map((item, index) => (
                                <Fragment key={index} >{ item } <br /></Fragment>
                            ))}
                        </div>
                        <div className="w-full md:w-1/2 relative flex flex-col items-center">
                            <div className="mt-4 md:mt-0">
                                <Graph dataGraph={dataGraph} />
                            </div>
                            <div className="w-fit mt-4 flex flex-col justify-center">
                                {dataGraph.map((item, index) => (
                                    <span key={index}>
                                        <span style={{ color: isLanguage.business[1].graphic[item][0] }}>{item}</span> : {isLanguage.business[1].graphic[item][1]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-max xl:text-lg 2xl:text-2xl relative flex flex-col mt-14 justify-center font-semibold text-pink-500" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        <div>{ isLanguage.business[2].header }</div>
                        <hr className="w-full opacity-50 text-black mt-2" style={{ height: '2px' }} />
                        <hr className="w-full opacity-50 text-black mt-1" style={{ height: '2px' }} />
                    </div>
                    <div className="w-full h-max xl:text-lg 2xl:text-2xl relative flex flex-col md:flex-row mt-4 font-extralight text-pink-500 space-y-2 md:space-y-0 md:space-x-2" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        {isLanguage.business[2].select.map((item, index) => (
                            <div className="text-white rounded-3xl p-2 flex justify-center items-center text-center" key={index} style={{ backgroundColor: '#231f20' }}>
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-max relative flex flex-col justify-center text-justify text-sm 2xl:text-base mt-4" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        {isLanguage.business[2].desc.split('|||').map((item, index) => (
                            <Fragment key={index} >{ item } <br /></Fragment>
                        ))}
                    </div>
                    <div className="w-full h-max relative flex flex-col text-sm 2xl:text-base my-4 space-y-4" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                        {isLanguage.business[2].select_2.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-7 h-7 border-2 border-black rounded-sm">
                                    <span className="material-icons text-pink-600" style={{ scale: '2.1' }}>
                                        done
                                    </span>
                                </div>
                                <span className="ml-3 text-lg md:text-lg xl:text-2xl font-semibold text-slate-900">{ item }</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Business;
