import React, { useState } from "react";
import classes from "./ImgGroupper.module.css";

const ImgGroupper = (props) => {
    const [isHover, setIsHover] = useState(null);

    const onGenerateHoverData = () => {
        const hoverData = {};
        for (let i = 0; i <= props.data.length; i++) {
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
            {props.data.map((item) => (
                <div className={classes["img-groupper-item"]} key={item.id}>
                    <a
                        href={item.navigate}
                        id={item.id}
                        onClick={getValueGroupper}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {isHover === item.id ? item.badge_hover.toUpperCase() : item.badge}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ImgGroupper;
