import React, { useState, useEffect, useRef } from "react";

import Page from "../Page";

import classes from "./Homepage.module.css";
import MediaQuery from "@/Components/MediaQuery";
import axios from "axios";
import { sleep } from "@/Utils/Sleep/sleep";
import { useTranslation } from "react-i18next";
// import DownArrow from '/public/assets/icon/Pages/Homepage/arrow_down.jsx'

const Homepage = () => {

    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(Object.values(i18n.store.data)[0].translation);

    const [isData, setIsData] = useState([]);
    const [imageSlideData, setImageSlideData] = useState([]);
    const [firstQuestionDesc, setFirstQuestionDesc] = useState(0)
    const firstQuestionRef = useRef(null)
    const mainContainerRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState([])
    const imageSlideRef = useRef(null)
    
    const [loadingText, setLoadingText] = useState(0)
    const loadingRef = useRef(null)
    
    const testOnLoad = (event, index) => {
        const checkExistingImage = imageLoaded.filter(item => item.target.src === event.target.src).length
        event['id'] = index
        
        if (checkExistingImage === 0) {
            setImageLoaded([
                ...imageLoaded,
                event
            ])
        }
    }

    const handleResize = () => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
        if (mainContainerRef.current) {
            mainContainerRef.current.parentElement.margin = '0'
            mainContainerRef.current.parentElement.parentElement.margin = '0'
            mainContainerRef.current.parentElement.parentElement.parentElement.classList.remove("container-fluid")
        }
    };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
    }, [firstQuestionRef.current?.clientWidth])
    
    useEffect(() => {
        if (mainContainerRef.current) {
            mainContainerRef.current.parentElement.style.margin = '0'
            mainContainerRef.current.parentElement.style.padding = '0'
            mainContainerRef.current.parentElement.parentElement.style.padding = '0'
            mainContainerRef.current.parentElement.parentElement.style.margin = '0'
            mainContainerRef.current.parentElement.parentElement.parentElement.classList.remove("container-fluid")
        }
    }, [mainContainerRef.current])

    const fetchData = async () => {
        try {
            const res = await axios.get(
                "https://olldesign.jp/api/galleryList"
            );
            setIsData(res.data.galleryList.sort((a, b) => new Date(a.Date) - new Date(b.Date)));
        } catch (e) {
            console.error("Error fetching imagings:", e);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setImageSlideData(isData.filter(item => item.TagsID === '2').slice(0, 2))
        console.log(isData);
        
    }, [isData])

    let timeoutLoading;

    useEffect(() => {

        if (imageLoaded.length === 0) {
            timeoutLoading = setTimeout ( async () => {
                if (loadingRef.current) {
                    loadingRef.current.style.fontSize = '3vw'
                    loadingRef.current.innerText = 'Data Image Currently Can\'t be proceed.'
                    await sleep(3000)
                    loadingRef.current.style.transition = '2s'
                    loadingRef.current.style.opacity = '0'
                    loadingRef.current.style.display = 'none'
                }
            }, 10000);
        } else {
            clearTimeout(timeoutLoading)
            const totalData = imageLoaded.length / imageSlideData.length * 100
    
            const loopLoading = async () => {
                for (let index = loadingText; index <= totalData; index++) {
                    await sleep(10)
                    if (index <= 100) {
                        setLoadingText(index)
                    }
                }
            }
    
            loopLoading()
        }
        
    }, [imageLoaded, isData])

    useEffect(() => {
        const afterLoading = async () => {
            if (loadingRef.current) {
                loadingRef.current.style.transition = '2s'
                loadingRef.current.style.opacity = '0'
                await sleep(2001)
                loadingRef.current.style.display = 'none'
            }
        }
        if (loadingText === 100) {
            afterLoading()
        }
    }, [loadingText])

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                {matches ?
                
                <div ref={mainContainerRef} className="w-full h-full flex flex-col items-center" style={{ padding: '4vw 2vw 0 2vw', opacity: firstQuestionDesc === 0 ? '0' : '1', backgroundColor: '#D8DC24' }}>
                    <div className="w-fit flex h-max">
                        <div className="flex justify-center items-center" style={{ padding: '0 2vw 0 0', fontSize: '15vw', color: '#10643C' }}>
                            Q
                        </div>
                        <div className="flex flex-col">
                            <div ref={firstQuestionRef} style={{ fontSize: '4vw', letterSpacing: '0.2vw' }} className="w-fit">グラフィックだけはしてくれないの？</div>
                            <div className="flex" style={{ width: `${firstQuestionDesc}px`, fontSize: '2.4vw', letterSpacing: '0.2vw' }}>
                            設計業務だけに付随する事業だと思われがちで、よくこの質問をお客様か
                            ら頂きますが応えはもちろん「はい、よろこんで」。
                            それが当グラフィック事業専用ページを開設した経緯です。
                            </div>
                        </div>
                    </div>
                </div>

                :

                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '4vw 0 0 0', opacity: firstQuestionDesc === 0 ? '0' : '1', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    {/* <div ref={loadingRef} className="absolute left-0 top-0 w-full h-screen flex justify-center items-center text-slate-800 z-20 text-opacity-20" style={{ backgroundColor: '#D8DC24', fontSize: '20vw' }}>
                        {loadingText}
                    </div> */}
                    <div className="first w-fit flex h-max" style={{ marginBottom: '2vw' }}>
                        <div className="relative flex justify-center items-center z-10" style={{ width: '10vw', height: '10vw', padding: '0 2vw 0 0', fontSize: '8vw', color: '#10643C' }}>
                            <img className={`w-full h-full object-contain`} src="assets/homepage/Q Mark.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div ref={firstQuestionRef} style={{ fontSize: '2.3vw', letterSpacing: '0.2vw' }} className="w-fit">
                                {/* グラフィックだけはしてくれないの？ */}
                                <img className={`object-contain`} style={{ width: '40vw' }} src="assets/homepage/Q title JP.png" alt="" />
                            </div>
                            <div className="flex justify-center items-center" style={{ width: `${firstQuestionDesc}px`, fontSize: '1.4vw' }}>
                            設計業務だけに付随する事業だと思われがちで、よくこの質問をお客様か
                            ら頂きますが応えはもちろん「はい、よろこんで」。
                            それが当グラフィック事業専用ページを開設した経緯です。
                            </div>
                        </div>
                    </div>
                    <div className="second w-fit flex h-max" style={{ marginBottom: '0.5vw' }}>
                        <div style={{ fontSize: '2.4vw', fontWeight: 'bold', textShadow: '0.1vw 0.2vw 0.4vw rgba(0, 0, 0, 0.5)' }}>
                            {/* &nbsp;&nbsp;設計企業の「グラフィックデザイン事務所」 */}
                            <img className={`object-contain`} style={{ width: '50vw' }} src="assets/homepage/Top JP.png" alt="" />
                        </div>
                    </div>
                    <div className="third border-2 border-black" style={{ padding: '0.5vw', marginBottom: '2vw' }}>
                        <div style={{ width: '47vw' }} className="flex h-auto">
                            <div className="w-full h-full flex">
                                {imageSlideData.map((item, index) => {
                                    const date = new Date(item.Date)
                                    date.setMonth(date.getMonth() + 1)
                                    const month = date.getMonth()
                                    const year = date.getFullYear()
                                    return (
                                        <div key={`${item}${index}`} className="w-1/2">
                                            <div ref={imageSlideRef} className="relative w-full flex justify-center items-center overflow-hidden" style={{ opacity: '1', height: '10vw', marginBottom: '0.5vw' }}>
                                                <img onLoad={(e) => testOnLoad(e, item.id)} className={`absolute w-full h-full object-cover blur-sm pointer-events-none`} src={`https://olldesign.jp/storage/${item.Img[0]}`} alt="" />
                                                <img className={`w-fit h-full object-contain pointer-events-none ${classes['imageSlide']}`} src={`https://olldesign.jp/storage/${item.Img[0]}`} alt="" />
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <div className="flex flex-col" style={{ width: '95%', fontSize: '0.9vw' }}>
                                                    <div className="relative flex w-full">
                                                        <div>
                                                            {item.Name}
                                                        </div>
                                                        <div className="absolute right-0">
                                                            {year}.{month}
                                                        </div>
                                                    </div>
                                                    <div className="border-slate-600" style={{ border: '0.1vw solid' }} />
                                                    <div>
                                                        {item.City_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="third border-2 border-black" style={{ padding: '0.5vw', marginBottom: '2vw' }}>
                        <div style={{ width: '47vw', height: '14vw' }} className="flex">

                        </div>
                    </div>
                    <div className="fourth w-fit flex flex-col items-center h-max" style={{ marginBottom: '2vw', }}>
                        <div style={{ fontSize: '1.5vw', fontWeight: '500', letterSpacing: '0.1vw' }}>
                            &nbsp;弊社のグラフィック事業ができること
                        </div>
                        <div className="flex justify-between" style={{ width: '48.5vw', fontSize: '1.1vw', fontWeight: '500' }}>
                                <div className="flex flex-col justify-center items-center" style={{ width: '23%' }}>
                                    <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '0.2vw', marginBottom: '0.6vw' }}>
                                        ブランディング
                                    </div>
                                    <div style={{ width: '1.8vw', height:'auto' }}>
                                        <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                        {/* <DownArrow /> */}
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '2vw', }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw' }}>
                            <img className={`object-contain`} style={{ width: '48.5vw' }} src="assets/homepage/Idea JP.png" alt="" />
                        </div>
                    </div>
                </div>

                }
                </>
            )}
            </MediaQuery>
        </Page>
    );
};

export default Homepage;
