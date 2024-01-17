import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import MediaQuery from "@/Components/MediaQuery";

import Page from "../Page";

import classes from "./Company.module.css";

const Company = () => {
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(
        i18n.store.data.jp.translation
    );

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
            setIsLanguage(i18n.store.data.jp.translation);
        }
    }, [i18n.language]);

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
                {({ matches }) => (
                    <>
                        {matches ? (
                            <div className="mobile-Container p-2">
                                <div
                                    className={`${classes.mobileContainer} bg-white rounded-md p-4`}
                                >
                                    {isLanguage.company.profile.map((c) => (
                                        <div
                                            className={classes.company}
                                            key={c.id}
                                        >
                                            <div
                                                className={
                                                    classes[
                                                        "mobile-company-title"
                                                    ]
                                                }
                                            >
                                                {c.title}
                                            </div>
                                            <div
                                                className={
                                                    classes[
                                                        "mobile-company-content"
                                                    ]
                                                }
                                            >
                                                {c.desc.map((d) => (
                                                    <React.Fragment key={d.id}>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                        >
                                                            {d.address}
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                        >
                                                            {d.telp}
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                        >
                                                            {d.fax}
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <div className={`${classes.company} my-6`}>
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
                                    </div>
                                    {isLanguage.company.contact.map((con) => (
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
                                    ))}
                                </div>
                                <div className="mt-4 d-flex flex-wrap">
                                    <div className="col-8">
                                        <div className={classes.maps}>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.0304836186056!2d135.3057121155833!3d34.729625989175524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f2d06eae0a45%3A0xd5de03e561edccac!2z5pel5pysLCDjgJI2NTktMDA2NyDlhbXluqvnnIzoiqblsYvluILojLblsYvkuYvnlLrvvJHvvJHiiJLvvJHvvJE!5e0!3m2!1sja!2sus!4v1495449729213"
                                                frameborder="0"
                                                style={{
                                                    borderRadius: "8px",
                                                    width: "100%",
                                                }}
                                                allowfullscreen=""
                                                aria-hidden="false"
                                                tabindex="0"
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
                                            <div className={classes.images}>
                                                <img
                                                    src="https://olldesign.jp/images/company/img3.gif"
                                                    alt=""
                                                />
                                            </div>
                                            <div className={classes.images}>
                                                <img
                                                    src="https://olldesign.jp/images/company/img4.gif"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="container-fluid">
                                <div className="bg-white rounded-md p-4">
                                    {isLanguage.company.profile.map((c) => (
                                        <div
                                            className={classes.company}
                                            key={c.id}
                                        >
                                            <div
                                                className={
                                                    classes["company-title"]
                                                }
                                            >
                                                {c.title}
                                            </div>
                                            <div
                                                className={
                                                    classes["company-content"]
                                                }
                                            >
                                                {c.desc.map((d) => (
                                                    <>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                            key={d.id}
                                                        >
                                                            {d.address}
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                            key={d.id}
                                                        >
                                                            {d.telp}
                                                        </div>
                                                        <div
                                                            className={
                                                                classes.content
                                                            }
                                                            key={d.id}
                                                        >
                                                            {d.fax}
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <div className={`${classes.company} my-6`}>
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
                                    </div>
                                    {isLanguage.company.contact.map((con) => (
                                        <div
                                            className={classes.company}
                                            key={con.id}
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
                                    ))}
                                </div>
                                <div className="row mt-4">
                                    <div className="col-8">
                                        <div className={classes.maps}>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.0304836186056!2d135.3057121155833!3d34.729625989175524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f2d06eae0a45%3A0xd5de03e561edccac!2z5pel5pysLCDjgJI2NTktMDA2NyDlhbXluqvnnIzoiqblsYvluILojLblsYvkuYvnlLrvvJHvvJHiiJLvvJHvvJE!5e0!3m2!1sja!2sus!4v1495449729213"
                                                frameborder="0"
                                                style={{
                                                    border: 0,
                                                    minWidth: "100%",
                                                    minHeight: "100%",
                                                }}
                                                allowfullscreen=""
                                                aria-hidden="false"
                                                tabindex="0"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div
                                            className={
                                                classes["small-gallery-company"]
                                            }
                                        >
                                            <div className={classes.images}>
                                                <img
                                                    src="https://olldesign.jp/images/company/img3.gif"
                                                    alt=""
                                                />
                                            </div>
                                            <div className={classes.images}>
                                                <img
                                                    src="https://olldesign.jp/images/company/img4.gif"
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
        </Page>
    );
};

export default Company;
