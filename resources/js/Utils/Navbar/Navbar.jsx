import React, { useState, useEffect, useRef } from "react";
import { brand, menu, socialMedia, lang } from "../../Static/index";
import { useTranslation } from "react-i18next";
import MediaQuery from "@/Components/MediaQuery";

import classes from "./Navbar.module.css";
import SocialCard from "../SocialCard/SocialCard";

const Navbar = ({ language, setDeskNavWidth }) => {
    const { i18n } = useTranslation();
    const [isHover, setIsHover] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSocial, setIsSocial] = useState(false);
    const isLanguage = language;
    const deskNavRef = useRef(null)

    // Fungsi untuk menghitung persentase scroll
    const calculateScrollPercentage = () => {
        // Menghitung tinggi total dokumen dan tinggi viewport
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // Menghitung jumlah scroll yang sudah dilakukan
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

        // Menghitung persentase scroll
        const scrollPercentage =
            (scrollTop / (documentHeight - windowHeight)) * 100;

        return scrollPercentage;
    };

    // Event listener untuk mendeteksi scroll pada halaman
    const handleScroll = () => {
        // Hitung persentase scroll
        const scrollPercentage = calculateScrollPercentage();

        // Jika pengguna telah scroll 30% atau lebih
        if (scrollPercentage >= 30) {
            setIsSocial(true); // Tampilkan gambar
        }
    };

    const generateHoverData = () => {
        const hoverData = {};
        for (let i = 0; i <= isLanguage.navbar_jp.length; i++) {
            hoverData[i.toString()] = i;
        }
        return hoverData;
    };

    const instagracmClick = () => {
        window.open('https://www.instagram.com/olldesign_1010', '_blank')
    }

    const changeLanguage = async (lng) => {
        i18n.changeLanguage(lng)
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Menggunakan useEffect untuk menambahkan dan menghapus event listener
    useEffect(() => {
        // Tambahkan event listener
        window.addEventListener("scroll", handleScroll);

        // Hapus event listener saat komponen akan dibongkar
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const langClickHandler = () => {
        if (setDeskNavWidth)
            if (deskNavRef.current) {
                setDeskNavWidth(deskNavRef.current.clientWidth)

                console.log(deskNavRef.current?.clientWidth);
                
            }
    }

    useEffect(() => {
        langClickHandler()
    }, [deskNavRef.current?.clientWidth])

    return (
        <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                    {matches && (
                        <div className={classes["mobile-navbar-container"]}>
                            <div className={classes["mobile-navbar"]}>
                                <div className={`${classes["mobile-brand"]} relative w-max`}>
                                    <a href="/">
                                        <h1 className="text-transparent">{brand}</h1>
                                        <img className="w-full h-full absolute left-0 top-0 object-contain" src="/assets/images/OLL_DESIGN.png" alt="" />
                                    </a>
                                </div>
                                {/* <div className="border-1 border-black w-5 h-5">

                                </div> */}
                                <div
                                    className={`${classes.language} space-x-2`}
                                >
                                    {lang.map((item, index) => (
                                        <button
                                            key={index}
                                            className="border-1 border-black w-8 h-8"
                                            onClick={() =>
                                                changeLanguage(
                                                    item.lang
                                                        .toString()
                                                        .toLowerCase()
                                                )
                                            }
                                        >
                                            {item.lang}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className={`${
                                        classes["mobile-menu-toggle"]
                                    } ${
                                        isMobileMenuOpen ? classes.active : ""
                                    }`}
                                    onClick={toggleMobileMenu}
                                >
                                    {/* Hamburger */}
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </button>
                                {isMobileMenuOpen && (
                                    <div className={classes["mobile-menu"]}>
                                        {/* <div
                                            className={`${classes.language} mt-2`}
                                        >
                                            {lang.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        changeLanguage(
                                                            item.lang
                                                                .toString()
                                                                .toLowerCase()
                                                        )
                                                    }
                                                >
                                                    {item.lang}
                                                </button>
                                            ))}
                                        </div> */}
                                        <div
                                            className={
                                                classes["mobile-sidebar-title"]
                                            }
                                        >
                                            {isLanguage.navbar_jp.map(
                                                (m, index) => (
                                                    <a
                                                        href={m.url}
                                                        className="text-sm"
                                                        id={m.id}
                                                        key={index}
                                                    >
                                                        {isHover === m.id
                                                            ? m.title_hover.toUpperCase()
                                                            : m.title.toUpperCase()}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                        <div
                                            className={
                                                classes[
                                                    "mobile-sidebar-socialmedia"
                                                ]
                                            }
                                        >
                                            {socialMedia.map((sm, index) => (
                                                <a
                                                    href={sm.url}
                                                    key={index}
                                                    target="_blank"
                                                >
                                                    {sm.icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {!matches && (
                        // Tampilan Desktop
                        <div className={classes.sidebar} ref={deskNavRef}>
                            <div className="relative w-full h-full flex justify-center">
                                <div className={classes["sidebar-content"]}>
                                    <div className={`${classes["sidebar-brand"]} relative w-max`}>
                                        <a href="/">
                                            <h1 className="text-transparent">{brand}</h1>
                                            <img className="w-full h-full absolute left-0 top-0 object-contain" src="/assets/images/OLL_DESIGN.png" alt="" />
                                        </a>
                                    </div>
                                    <div className={`${classes.language} mt-2`}>
                                        {lang.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={ async () => {
                                                    await changeLanguage(
                                                        item.lang
                                                        .toString()
                                                        .toLowerCase()
                                                    )
                                                    setTimeout(() => {
                                                        langClickHandler()
                                                    }, 100);
                                                }
                                                }
                                            >
                                                {item.lang}
                                            </button>
                                        ))}
                                    </div>
                                    <div className={classes["sidebar-title"]}>
                                        {isLanguage.navbar_jp.map((m, index) => (
                                            <a
                                                href={m.url}
                                                id={m.id}
                                                key={index}
                                            >
                                                {isHover === m.id
                                                    ? m.title_hover.toUpperCase()
                                                    : m.title.toUpperCase()}
                                            </a>
                                        ))}
                                    </div>
                                    {/* <div
                                        className={classes["sidebar-socialmedia"]}
                                    >
                                        {socialMedia.map((sm) => (
                                            <a
                                                href={sm.url}
                                                key={sm.id}
                                                target="_blank"
                                            >
                                                {sm.icon}
                                            </a>
                                        ))}
                                    </div> */}
                                </div>
                            {/* {isSocial && (
                                <div className={classes["sidebar-social"]}>
                                    <SocialCard hover={isSocial} />
                                </div>
                            )} */}
                                <div className={`absolute w-full h-auto bottom-0 cursor-pointer`} onClick={instagracmClick}>
                                    <img
                                        className="w-full h-full rounded-2xl"
                                        src="assets/images/instagram.jpeg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </MediaQuery>
    );
};

export default Navbar;
