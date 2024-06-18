import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import MediaQuery from "@/Components/MediaQuery";

import classes from "./ImgGroupper.module.css";

const ImgGroupper = (props) => {
    const { i18n } = useTranslation();
    const [isHover, setIsHover] = useState(null);
    const [isGroup, setIsGroup] = useState([]);
    const [isSortCollapsed, setIsSortCollapsed] = useState(false);

    useEffect(() => {
        fetchGroupper();
    }, []);

    const fetchGroupper = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tags");
            setIsGroup(res.data);
        } catch (e) {
            console.error("Error fetching tags:", e);
        }
    };

    const onGenerateHoverData = () => {
        const hoverData = {};
        for (let i = 0; i <= isGroup.length; i++) {
            hoverData[i.toString()] = i;
        }
        return hoverData;
    };

    const handleMouseOver = (e) => {
        const hoverData = onGenerateHoverData();
        const targetId = e.target.id;

        if (hoverData.hasOwnProperty(targetId)) {
            setIsHover(hoverData[targetId]);
        }
    };

    const handleMouseOut = () => {
        setIsHover(null);
    };

    const getValueGroupper = (e) => {
        props.onGetFilter(e.target.hash);
    };

    const onChangeSortFilter = () => {
        setIsSortCollapsed(!isSortCollapsed);
    };

    return (
        <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                    {matches ? (
                        <div className="relative flex flex-column mt-2">
                            <div onClick={onChangeSortFilter}>
                                {isSortCollapsed ? (
                                    <div className="flex justify-end align-middle">
                                        <img
                                            src={`assets/icon/sort-ascending.svg`}
                                            alt="sort-up"
                                            className="transition transform rotate-0 ease-out"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-end align-middle">
                                        <img
                                            src={`assets/icon/sort-ascending.svg`}
                                            alt="sort-down"
                                            className="transition transform rotate-180 ease-out"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={`${isSortCollapsed && 'flex flex-column gap-2 absolute right-0 top-[1.75rem] bg-white p-2 rounded-sm z-10'}`}>
                                {isSortCollapsed && (
                                    <>
                                        {isGroup.map((i) => (
                                            <div className="" key={i.id}>
                                                <a
                                                    href={i.ShortTags}
                                                    id={i.id}
                                                    onClick={getValueGroupper}
                                                    onMouseOver={
                                                        handleMouseOver
                                                    }
                                                    onMouseOut={handleMouseOut}
                                                    className="mx-4 my-6"
                                                >
                                                    {isHover === i.id
                                                        ? i18n.language === "jp"
                                                            ? i.TagsName.toUpperCase()
                                                            : i.TagsNameJp.toUpperCase()
                                                        : (i18n.language ===
                                                          "jp"
                                                              ? i.TagsNameJp
                                                              : i.TagsName
                                                          ).toUpperCase()}
                                                </a>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={classes["img-groupper"]}>
                            {props.navDate.map((item, index) => (
                                <div
                                    className={classes["img-groupper-item"]}
                                    key={index}
                                >
                                    <a
                                        href={`#${item}`}
                                        id={index}
                                        onClick={getValueGroupper}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    >{String(item).toUpperCase()}
                                        {/* {JSON.stringify(props.imgData[0].Date)} */}
                                        {/* {isHover === i.id
                                            ? i18n.language === "jp"
                                                ? i.TagsName.toUpperCase()
                                                : i.TagsNameJp.toUpperCase()
                                            : (i18n.language === "jp"
                                                  ? i.TagsNameJp
                                                  : i.TagsName
                                              ).toUpperCase()} */}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </MediaQuery>
    );
};

export default ImgGroupper;
