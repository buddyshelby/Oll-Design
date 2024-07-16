import React, { useState, useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";

import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Company.module.css";

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
            <div className="col-12 mt-16 mb-6">
                <MediaQuery query="(max-width: 768px)">
                    {({ matches }) => (
                        <>
                            {matches ? (
                                <div className="mobile-Container p-2">
                                    <div
                                        className={`${classes.mobileContainer} relative bg-white rounded-md p-4`}
                                    >
                                    {/* <div className="top-0 absolute h-full" style={{ width: '1px', left: maxSizeDiv === 0 ? 0 : `${maxSizeDiv}px`, backgroundColor: '#003832' }}/> */}
                                        {isLanguage.company.profile.map((c) => {

                                            if (c.title.length > wordLength) {
                                                wordLength = c.title.length
                                                setMaxSizeDiv(c.title)
                                            }

                                            return (
                                                <div
                                                    className={`${classes.company}`}
                                                    key={c.id}
                                                >
                                                    <div
                                                        style={{ borderRightColor: '#C4C4C4' }}
                                                        className={`${classes["mobile-company-title"]} flex items-center w-full h-full text-wrap border-r`}
                                                    >
                                                        {c.title}
                                                    </div>
                                                    <div
                                                        className={`${classes["mobile-company-content"]}`}
                                                    >
                                                        {c.desc.map((d, index) => (
                                                            <Fragment key={index}>
                                                                <div
                                                                    className={`${classes.content} pl-3`}
                                                                >
                                                                    {d.address.split('|').map((item, index) => <Fragment key={index}>{item}<br /></Fragment>)}
                                                                </div>
                                                            </Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {/* <div className={`${classes.company} my-6`}>
                                            <div
                                                className={
                                                    classes["mobile-company-title"]
                                                }
                                            >
                                                {isLanguage.company.business.title}
                                            </div>
                                            <div
                                                className={
                                                    classes[
                                                        "mobile-company-content"
                                                    ]
                                                }
                                            >
                                                {isLanguage.company.business.desc.map(
                                                    (b) => (
                                                        <div
                                                            className={`${classes.content} mb-2`}
                                                            key={b.id}
                                                        >
                                                            <span>
                                                                {b.business}
                                                            </span>
                                                            <div
                                                                className={
                                                                    classes.list
                                                                }
                                                            >
                                                                {b.sub_business.map(
                                                                    (sb) => (
                                                                        <p
                                                                            key={
                                                                                sb.id
                                                                            }
                                                                        >
                                                                            {
                                                                                sb.name
                                                                            }
                                                                        </p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div> */}
                                        {/* {isLanguage.company.contact.map((con) => (
                                            <div
                                                className={classes.company}
                                                key={con.id}
                                            >
                                                <div
                                                    className={
                                                        classes[
                                                            "mobile-company-title"
                                                        ]
                                                    }
                                                >
                                                    {con.contact_to.type}
                                                </div>
                                                <div
                                                    className={
                                                        classes[
                                                            "mobile-company-content"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={classes.content}
                                                    >
                                                        {con.contact_to.body}
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                    <div className="mt-4 d-flex flex-wrap">
                                        <div className="col-8">
                                            <div className={classes.maps}>
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6558.120259057075!2d135.3075695!3d34.7288787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f2da2951e797%3A0x5d303c1180ce7c91!2sOLL%20DESIGN%20Co%2C.%20Ltd.!5e0!3m2!1sen!2sid!4v1721133532847!5m2!1sen!2sid"
                                                    frameBorder="0"
                                                    style={{
                                                        borderRadius: "8px",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                    allowFullScreen=""
                                                    aria-hidden="false"
                                                    tabIndex="0"
                                                ></iframe>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className={
                                                    classes[
                                                        "mobile-small-gallery-company"
                                                    ]
                                                }
                                            >
                                                <div className={`${classes.images} cursor-pointer`} onClick={instagracmClick}>
                                                    <img
                                                        className="w-full h-full rounded-2xl"
                                                        src="assets/images/instagram.jpeg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="container-fluid">
                                    <div className="bg-white relative rounded-md p-4">
                                    {/* <div className="top-0 absolute h-full" style={{ width: '1px', left: maxSizeDiv === 0 ? 0 : `${maxSizeDiv}px`, backgroundColor: '#003832' }}/> */}
                                        {isLanguage.company.profile.map((c, index) => {
                                            
                                            if (c.title.length > wordLength) {
                                                wordLength = c.title.length
                                                setMaxSizeDiv(c.title)
                                            }

                                            return (
                                                <div
                                                className={`${classes.company}`}
                                                    key={c.id}
                                                >
                                                    <div
                                                        style={{ borderRightColor: '#C4C4C4' }}
                                                        className={`${classes["company-title"]} flex items-center h-full border-r border-r-black`}
                                                    >
                                                        {c.title}
                                                    </div>
                                                    <div
                                                        className={
                                                            classes["company-content"]
                                                        }
                                                    >
                                                        {c.desc.map((d, index) => (
                                                            <Fragment key={index}>
                                                                <div
                                                                    className={`${classes.content} pl-4`}
                                                                >
                                                                    {d.address.split('|').map((item, index) => <Fragment key={index}>{item}<br /></Fragment>)}
                                                                </div>
                                                            </Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {/* <div className={`${classes.company} my-6`}>
                                            <div
                                                className={classes["company-title"]}
                                            >
                                                {isLanguage.company.business.title}
                                            </div>
                                            <div
                                                className={
                                                    classes["company-content"]
                                                }
                                            >
                                                {isLanguage.company.business.desc.map(
                                                    (b, index) => (
                                                        <div
                                                            className={`${classes.content} mb-2`}
                                                            key={index}
                                                        >
                                                            <span>
                                                                {b.business}
                                                            </span>
                                                            <div
                                                                className={
                                                                    classes.list
                                                                }
                                                            >
                                                                {b.sub_business.map(
                                                                    (sb, index) => (
                                                                        <p
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                sb.name
                                                                            }
                                                                        </p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div> */}
                                        {/* {isLanguage.company.contact.map((con, index) => (
                                            <div
                                                className={classes.company}
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        classes["company-title"]
                                                    }
                                                >
                                                    {con.contact_to.type}
                                                </div>
                                                <div
                                                    className={
                                                        classes["company-content"]
                                                    }
                                                >
                                                    <div
                                                        className={classes.content}
                                                    >
                                                        {con.contact_to.body}
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-8">
                                            <div className={classes.maps}>
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6558.120259057075!2d135.3075695!3d34.7288787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f2da2951e797%3A0x5d303c1180ce7c91!2sOLL%20DESIGN%20Co%2C.%20Ltd.!5e0!3m2!1sen!2sid!4v1721133532847!5m2!1sen!2sid"
                                                    frameBorder="0"
                                                    style={{
                                                        border: 0,
                                                        minWidth: "100%",
                                                        minHeight: "100%",
                                                    }}
                                                    allowFullScreen=""
                                                    aria-hidden="false"
                                                    tabIndex="0"
                                                ></iframe>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className={`${classes["small-gallery-company"]}`}
                                            >
                                                <div className={`${classes.images} w-full h-full cursor-pointer`} onClick={instagracmClick}>
                                                    <img
                                                        className="w-full h-full rounded-2xl"
                                                        src="assets/images/instagram.jpeg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </MediaQuery>
            </div>
        </Page>
    );
};

export default Company;
