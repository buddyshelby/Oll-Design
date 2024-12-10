import React, { useEffect, useRef } from "react";

export default function WebLoader({ setImageShow }) {

    const imageRef = useRef(null)

    const imageLoader = () => {
        if (imageRef.current) {
            imageRef.current.style.opacity = '1'
            setTimeout(() => {
                imageRef.current.style.opacity = '0'
            }, 3000);
        }
        setTimeout(() => {
            // setImageShow(true)
        }, 2000);
    }

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.style.transition = '1s'
            imageRef.current.style.opacity = '0'
        }
    }, [imageRef])

    return (
        <div className="relative w-screen h-screen bg-[#f0f0f0]">
            <div className="flex justify-center align-items-center h-full">
                <img
                    ref={imageRef}
                    onLoad={imageLoader}
                    src="assets/logo/logo-square.png"
                    alt="logo"
                    className="w-3/12"
                />
            </div>
        </div>
    );
}
