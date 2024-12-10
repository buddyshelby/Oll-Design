import React from "react";

import classes from "./SocialCard.module.css";

const SocialCard = () => {
    return (
        <div className={classes["social-card"]}>
            <img
                src="assets/images/olldesign-instagram.jpg"
                alt="olldesign-instagram.jpg"
            />
        </div>
    );
};

export default SocialCard;
