import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import classes from "./ImgGroupper.module.css";

const ImgGroupper = (props) => {
    const { i18n } = useTranslation();
    const [isHover, setIsHover] = useState(null);
    const [isGroup, setIsGroup] = useState([]);

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

    return (
        <div className={classes["img-groupper"]}>
            {isGroup.map((i) => (
                <div className={classes["img-groupper-item"]} key={i.id}>
                    <a
                        href={i.ShortTags}
                        id={i.id}
                        onClick={getValueGroupper}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {isHover === i.id
                            ? i18n.language === "jp"
                                ? i.TagsName.toUpperCase()
                                : i.TagsNameJp.toUpperCase()
                            : (i18n.language === "jp"
                                  ? i.TagsNameJp
                                  : i.TagsName
                              ).toUpperCase()}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ImgGroupper;
