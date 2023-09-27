import React from 'react'
import classes from "./ImgGroupper.module.css";

const ImgGroupper = (props) => {
  const getValueGroupper = (e) => {
    props.onGetFilter(e.target.hash);
  };

  return (
    <div className={classes["img-groupper"]}>
        {props.data.map((item) => (
            <div className={classes["img-groupper-item"]} key={item.id}>
              <a href={item.navigate} onClick={getValueGroupper}>{item.badge}</a>
            </div>
        ))}
    </div>
  )
}

export default ImgGroupper