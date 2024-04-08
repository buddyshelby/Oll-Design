import React from "react";
import style from './web-loader.module.css'

export default function WebLoader() {
    return (
        <div className="relative w-screen h-screen bg-[#f0f0f0]">
            <div className={`flex justify-center align-items-center h-full ${style['the--cubic']}`}>
                <img
                    src="assets/logo/logo-square.png"
                    alt="logo"
                    className="w-3/12"
                />
                <img
                    src="assets/logo/logo-square.png"
                    alt="logo"
                    className="w-3/12"
                />
            </div>
        </div>
    );
}
