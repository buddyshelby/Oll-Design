import React, { useEffect } from "react";

import { useTranslation, Trans } from "react-i18next";

import classes from "./GalleryDetail.module.css";

const GalleryDetail = (props) => {
    const { i18n } = useTranslation();
    const detail = props.detailPages[0];

    const lang = i18n.language;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={classes["gallery-detail"]}>
            <div className="row">
                <div className="col">
                    <div className={classes["title-contents"]}>
                        <div className={classes.content}>
                            <p>
                                <Trans i18nKey="gallery_header_details.title">
                                    title
                                </Trans>
                            </p>
                        </div>
                        <div className={classes.content}>
                            <p>-</p>
                        </div>
                        <div className={classes.content}>
                            <p>{detail.WorksTitle}</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className={classes["title-contents"]}>
                        <div className={classes.content}>
                            <p>
                                <Trans i18nKey="gallery_header_details.contents">
                                    contents
                                </Trans>
                            </p>
                        </div>
                        <div className={classes.content}>
                            <p>-</p>
                        </div>
                        <div className={classes.content}>
                            <p>{detail.WorksContent}</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className={classes["title-contents"]}>
                        <div className={classes.content}>
                            <p>
                                <Trans i18nKey="gallery_header_details.credit">
                                    credit
                                </Trans>
                            </p>
                        </div>
                        <div className={classes.content}>
                            <p>-</p>
                        </div>
                        <div className={classes.content}>
                            <p>{detail.WorksCredit}</p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className={classes["title-contents"]}>
                        <div className={classes.content}>
                            <p>
                                <Trans i18nKey="gallery_header_details.client">
                                    client
                                </Trans>
                            </p>
                        </div>
                        <div className={classes.content}>
                            <p>-</p>
                        </div>
                        <div className={classes.content}>
                            <p>{detail.WorksClient}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${classes.desctription} mt-16`}>
                {lang === "jp"
                    ? detail.DescriptionJp
                    : lang === "en"
                    ? detail.DescriptionEn
                    : detail.DescriptionCh}
            </div>
            <div className="row p-2">
                <div className={`${classes["contents-images"]} mt-8`}>
                    {detail.Img.map((img, index) => (
                        <div className={classes.images} key={index}>
                            <img src={`storage/` + img} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryDetail;
