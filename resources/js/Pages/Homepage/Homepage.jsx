import React, { useState, useEffect, useRef } from "react";

import Page from "../Page";

import classes from "./Homepage.module.css";
import MediaQuery from "@/Components/MediaQuery";
import axios from "axios";
import { sleep } from "@/Utils/Sleep/sleep";
import { useTranslation } from "react-i18next";
import { animationGraphicDesign } from "./Animation";

const Homepage = () => {

    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(Object.values(i18n.store.data)[0].translation);

    const [isData, setIsData] = useState([]);
    const [focusOnPeople, setFocusOnPeople] = useState('not halo');
    const [imageSlideData, setImageSlideData] = useState([]);
    const [firstQuestionDesc, setFirstQuestionDesc] = useState(0)
    const firstQuestionRef = useRef(null)
    const mainContainerRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState([])
    const imageSlideRef = useRef(null)
    
    const [loadingText, setLoadingText] = useState(0)
    const loadingRef = useRef(null)

    const imageLoadedLocal = []

    useEffect(() => {
        if (mainContainerRef.current) {
            const peopleRunnerBoxElement = mainContainerRef.current.children[4].children[0]
            peopleRunnerBoxElement.addEventListener( 'touchstart' , (e) => {
                peopleRunnerBoxElement.style.marginLeft = `${peopleRunnerBoxElement.offsetLeft}px`
            })
        }
    }, [mainContainerRef.current])

    const peopleBoxSlideMove = (e) => {

        console.log(e);
        
    }
    
    const imageProjectOnLoad = (event, index) => {
        const checkExistingImage = imageLoaded.filter(item => item.randomImage === event.randomImage).length
        event['id'] = index
        
        if (checkExistingImage === 0) {
            imageLoadedLocal.push(event)
            setImageLoaded([
                ...imageLoadedLocal,
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
        if (i18n.language === "jp") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "ja") {
            setIsLanguage(i18n.store.data.jp.translation);
        } else if (i18n.language === "en") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "en-US") {
            setIsLanguage(i18n.store.data.en.translation);
        } else if (i18n.language === "ch") {
            setIsLanguage(i18n.store.data.ch.translation);
        } else {
            setIsLanguage(Object.values(i18n.store.data)[0].translation);
        }
    }, [i18n.language]);

    useEffect(() => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
    }, [firstQuestionRef.current?.clientWidth])
    
    useEffect(() => {
        if (mainContainerRef.current) {
            // mainContainerRef.current.parentElement.style.margin = '0'
            // mainContainerRef.current.parentElement.style.padding = '0'
            // mainContainerRef.current.parentElement.parentElement.style.overflow = 'hidden'
            // mainContainerRef.current.parentElement.parentElement.style.padding = '0'
            // mainContainerRef.current.parentElement.parentElement.style.margin = '0'
            // mainContainerRef.current.parentElement.parentElement.parentElement.classList.remove("container-fluid")
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
        setTimeout(() => {
            setFocusOnPeople('halo')
        }, 10000);
    }, [])

    useEffect(() => {
        setImageSlideData(isData.filter(item => item.TagsID === '2').slice(0, 2))
    }, [isData])

    useEffect(() => {
        for (let index = 0; index < 100; index++) {
            
        }
        imageSlideData.forEach( async (item, index) => {
            const getRandomImage = Math.floor(Math.random() * item.Img.length)
            item['randomImage'] = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`

            const img = new Image();
            img.src = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`;
            
            img.onload = () => {
                imageProjectOnLoad(item, index)
            };
        })
        
    }, [imageSlideData])

    let timeoutLoading;

    useEffect(() => {

        if (imageLoaded.length === 0) {
            timeoutLoading = setTimeout ( async () => {
                if (loadingRef.current) {
                    loadingRef.current.style.fontSize = '3vw'
                    loadingRef.current.innerText = 'Data Image Can\'t be proceed properly.'
                    await sleep(3000)
                    loadingRef.current.style.transition = '2s'
                    loadingRef.current.style.opacity = '0'
                    await sleep(2000)
                    loadingRef.current.style.display = 'none'
                }
            }, 10000);
        }
        
        if (imageLoaded.length !== 0) {
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
            animationGraphicDesign(mainContainerRef, focusOnPeople)
        }
        if (loadingText === 100) {
            afterLoading()
        }
    }, [loadingText])

    useEffect(() => {

        if (mainContainerRef.current) {
            const peopleBoxElement = mainContainerRef.current.children[4]
            if (peopleBoxElement.style.opacity !== '0' || peopleBoxElement.style.opacity !== '') {
                const peopleRunnerBoxElement = mainContainerRef.current.children[4].children[0]
                
                const runnerTouchStartHandler = (e) => {
                    const peopleComputedTranslate = parseFloat(window.getComputedStyle(peopleRunnerBoxElement).translate)
                    peopleRunnerBoxElement.style.translate = `${peopleComputedTranslate}px`;
                    peopleRunnerBoxElement.style.transition = '100ms linear'
                    const firstTouch = e.changedTouches[0].clientX;
                    let currentTouch = 0
                    let timeoutTryToRun = setTimeout(() => {
                        const runnerWidth = peopleRunnerBoxElement.clientWidth;
                        const boxWidth = peopleBoxElement.clientWidth;

                        peopleRunnerBoxElement.style.transition = '30s linear'
                        setTimeout(() => {
                            peopleRunnerBoxElement.style.translate  = `calc(-${runnerWidth}px  + ${boxWidth}px)`
                        }, 100);
                    }, 5000);
                    
                    const runnerTouchMoveHandler = async (e) => {
                        clearTimeout(timeoutTryToRun)
                        const peopleComputedTranslate = parseFloat(window.getComputedStyle(peopleRunnerBoxElement).translate)
                        
                        let positionTouch = 0;
                        const runnerWidth = peopleRunnerBoxElement.clientWidth
                        const boxWidth = peopleBoxElement.clientWidth
                        const sizeBox = (-runnerWidth + boxWidth)
                        const currentTranslate = parseFloat(peopleComputedTranslate)
        
                        if (currentTouch === 0) {
                            positionTouch = (firstTouch - e.changedTouches[0].clientX) * 8
                        } else {
                            positionTouch = (currentTouch - e.changedTouches[0].clientX) * 8
                        }
    
                        const checkOffsideRight = (currentTranslate - positionTouch) < sizeBox
                        const checkOffsideLeft = (currentTranslate - positionTouch) > 0
                        
                        currentTouch = e.changedTouches[0].clientX
                        if (checkOffsideRight) {
                            peopleRunnerBoxElement.style.translate = `${sizeBox}px`
                        } else if (checkOffsideLeft) {
                            peopleRunnerBoxElement.style.translate = `0px`
                        } else {
                            peopleRunnerBoxElement.style.translate = `${peopleComputedTranslate - positionTouch}px`
                        }
                        await sleep(500)
                    }
        
                    window.addEventListener('touchmove', runnerTouchMoveHandler)
        
                    const touchEndHandler = () => {
                
                        window.removeEventListener('touchmove', runnerTouchMoveHandler)
                        peopleRunnerBoxElement.style.transition = '50ms linear'
                        console.log(peopleRunnerBoxElement.style.translate);
                        clearTimeout(timeoutTryToRun)
                        timeoutTryToRun = setTimeout(() => {
                            const runnerWidth = peopleRunnerBoxElement.clientWidth;
                            const boxWidth = peopleBoxElement.clientWidth;
    
                            peopleRunnerBoxElement.style.transition = '30s linear'
                            setTimeout(() => {
                                peopleRunnerBoxElement.style.translate  = `calc(-${runnerWidth}px  + ${boxWidth}px)`
                            }, 100);
                        }, 5000);
                        currentTouch = 0
        
                    }
        
                    window.addEventListener('touchend', touchEndHandler)
                    return () => {
                        window.removeEventListener('touchend', touchEndHandler)
                    }
                }
        
                peopleRunnerBoxElement.addEventListener('touchstart', runnerTouchStartHandler)
            }
        }
    }, [mainContainerRef.current])

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                {matches ?
                
                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center overflow-hidden" style={{ padding: '10vw 0 0 0', opacity: firstQuestionDesc === 0 ? '0' : '1', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    <div ref={loadingRef} className="fixed left-0 top-0 w-full h-screen flex justify-center items-center text-slate-800 z-20 text-opacity-20" style={{ backgroundColor: '#D8DC24', fontSize: '20vw' }}>
                        {loadingText}
                    </div>
                    <div className="first w-fit flex h-max" style={{ marginBottom: '4vw' }}>
                        <div className="relative flex justify-center items-center z-10" style={{ width: '15vw', height: '15vw', padding: '0 2vw 0 0', fontSize: '8vw', color: '#10643C', transition: '1s', opacity: '0', transform: 'translate(0, -15vw)' }}>
                            <img className={`w-full h-full object-contain`} src={isLanguage.homepage[0]['QMark']} alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div ref={firstQuestionRef} style={{ transition: '1s', opacity: '0', transform: 'translate(10vw, 0)' }} className="w-fit">
                                <img className={`object-contain`} style={{ width: '62vw' }} src={isLanguage.homepage[0]['QHeader']} alt="" />
                            </div>
                            <div className="flex justify-center items-center" style={{ width: `${firstQuestionDesc}px`, fontSize: '2vw', transition: '1s', opacity: '0', transform: 'translate(-20vw, 0)' }}>
                                {isLanguage.homepage[0]['QDesc']}
                            </div>
                        </div>
                    </div>
                    <div className="second w-fit flex h-max text-center" style={{ marginBottom: '0.5vw', transition: '1s', scale: '0', opacity: '0' }}>
                        <div style={{ fontSize: '2.4vw', fontWeight: 'bold', textShadow: '0.1vw 0.2vw 0.4vw rgba(0, 0, 0, 0.5)' }}>
                            <img className={`object-contain`} style={{ width: '81vw' }} src={isLanguage.homepage[1]['TopJP']} alt="" />
                        </div>
                    </div>
                    <div className="third" style={{  border: '0.1vw solid black', padding: '0.5vw', marginBottom: '4vw', transition: '1s', scale: '0', opacity: '0' }}>
                        <div style={{ width: '76vw' }} className="flex h-auto">
                            <div className="w-full h-full flex flex-col">
                                {imageSlideData.map((item, index) => {
                                    const date = new Date(item.Date)
                                    date.setMonth(date.getMonth() + 1)
                                    const month = date.getMonth()
                                    const year = date.getFullYear()
                                    return (
                                        <div key={`${item}${index}`} className="w-full" style={{ padding: '2vw' }}>
                                            <div ref={imageSlideRef} className="relative w-full flex justify-center items-center overflow-hidden" style={{ opacity: '1', height: '30vw', marginBottom: '0.5vw' }}>
                                                <img className={`absolute w-full h-full object-cover blur-sm pointer-events-none`} src={item['randomImage']} alt="" />
                                                <img className={`w-fit h-full object-contain pointer-events-none ${classes['imageSlide']}`} src={item['randomImage']} alt="" />
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <div className="flex flex-col" style={{ width: '95%', fontSize: '3vw' }}>
                                                    <div className="relative flex w-full">
                                                        <div>
                                                            {item.Name}
                                                        </div>
                                                        <div className="absolute right-0">
                                                            {year}.{month}
                                                        </div>
                                                    </div>
                                                    <div className="border-slate-600" style={{ borderTop: '0.1vw solid' }} />
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
                    <div className="fourth relative overflow-hidden" style={{ width: '77vw', border: '0.1vw solid black', marginBottom: '4vw', transition: '1s', transform: 'translate(10vw)', opacity: '0' }}>
                        <div style={{ width: '200vw', height: '28vw', willChange: 'translate' }} className="flex" >
                            <div className="w-full h-full absolute left-0 top-0">
                                <img className={`w-full  h-full object-cover`} src="assets/homepage/Background.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/A_1.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/A_2.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/A_3.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/A_4.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/B_1.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/B_2.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/B_3.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src="assets/homepage/B_4.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="fifth w-fit flex flex-col items-center h-max" style={{ marginBottom: '6vw', }}>
                        <div className="text-center" style={{ fontSize: '4.2vw', fontWeight: '500', letterSpacing: '0.1vw', marginBottom: '2vw', opacity: '0', translate: '0 20vw', transition: '1s' }}>
                        &nbsp;{isLanguage.homepage[2]['ideaTitle']}
                        </div>
                        <div className="flex flex-col justify-between" style={{ width: '77vw', fontSize: '3vw', fontWeight: '500' }}>
                            {isLanguage.homepage[2]['children'].map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="flex flex-col justify-center items-center" style={{ width: '100%', opacity: '0', translate: '0 20vw', transition: '1s' }}>
                                        <div className="w-full h-full flex justify-center items-center text-center" style={{ border: '0.1vw solid black', padding: '1vw', marginBottom: '2vw' }}>
                                            {item}
                                        </div>
                                        <div style={{ width: '5vw', height:'auto', marginBottom: '2vw' }}>
                                            <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '12vw', }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw' }}>
                            <img className={`object-contain`} style={{ width: '77vw' }} src={isLanguage.homepage[3]['ideaHeader']} alt="" />
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        <div style={{ width: '77vw' }}>
                            {isLanguage.homepage[3]['childrenDetail'].map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-full h-fit flex flex-col justify-center items-center" style={{ marginBottom: '10vw' }}>
                                        <div className="relative flex justify-center items-end" style={{width: '55vw', height: '25vw', border: '0.1vw solid black', padding: '0 0.3vw 1.3vw 0.3vw', marginBottom: '3vw', fontSize: '4vw' }}>
                                            <div className="absolute" style={{ width: '25vw', top: '-12vw' }}>
                                                <img className={`w-full object-contain`} src={item.img} alt="" />
                                            </div>
                                            <div className="font-medium text-center" style={{ fontSize: '4vw' }}>
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="w-full h-fit flex flex-col" style={{ marginBottom: '5vw' }}>
                                            <div style={{ fontSize: '4.5vw', fontWeight: '600' }} className="w-full text-center">
                                                {item.header}
                                            </div>
                                            <div className="font-medium text-justify" style={{ fontSize: '3vw' }}>
                                                {item.desc.split('|||').map((item2, index2) => {
                                                    return (
                                                        <div key={`${item2}${index2}`}>
                                                            {item2}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="eighth" style={{ width: '76vw', marginBottom: '10vw' }}>
                        <div className="font-bold" style={{ fontSize: '3.3vw' }}>
                            {isLanguage.homepage[4]['header']}
                        </div>
                        <div style={{ fontSize: '2.7vw' }}>
                            {isLanguage.homepage[4]['desc'].split('|||').map((item, index) => {
                                return (
                                    <div key={`${item}${index}`}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                :

                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '4vw 0 0 0', opacity: firstQuestionDesc === 0 ? '0' : '1', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    <div ref={loadingRef} className="fixed top-0 w-full h-screen flex justify-center items-center text-slate-800 z-20 text-opacity-20" style={{ backgroundColor: '#D8DC24', fontSize: '20vw' }}>
                        {loadingText}
                    </div>
                    <div className="first w-fit flex h-max" style={{ marginBottom: '2vw' }}>
                        <div className="relative flex justify-center items-center z-10" style={{ width: '10vw', height: '10vw', padding: '0 2vw 0 0', fontSize: '8vw', color: '#10643C', transition: '1s', opacity: '0' }}>
                            <img className={`w-full h-full object-contain`} src={isLanguage.homepage[0]['QMark']} alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div ref={firstQuestionRef} style={{ fontSize: '2.3vw', letterSpacing: '0.2vw', marginBottom: '2vw', transition: '1s', opacity: '0' }} className="w-fit">
                                <img className={`object-contain`} style={{ width: '40vw' }} src={isLanguage.homepage[0]['QHeader']} alt="" />
                            </div>
                            <div className="flex justify-center items-center text-justify" style={{ width: `${firstQuestionDesc}px`, fontSize: '1.4vw', transition: '1s', opacity: '0' }}>
                                {isLanguage.homepage[0]['QDesc']}
                            </div>
                        </div>
                    </div>
                    <div className="second w-fit flex h-max" style={{ marginBottom: '0.5vw' }}>
                        <div style={{ fontSize: '2.4vw', fontWeight: 'bold', textShadow: '0.1vw 0.2vw 0.4vw rgba(0, 0, 0, 0.5)' }}>
                            <img className={`object-contain`} style={{ width: '50vw' }} src={isLanguage.homepage[1]['TopJP']} alt="" />
                        </div>
                    </div>
                    <div className="third" style={{  border: '0.1vw solid black', padding: '0.5vw', marginBottom: '2vw' }}>
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
                                                <img className={`absolute w-full h-full object-cover blur-sm pointer-events-none`} src={item['randomImage']} alt="" />
                                                <img className={`w-fit h-full object-contain pointer-events-none ${classes['imageSlide']}`} src={item['randomImage']} alt="" />
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
                                                    <div className="border-slate-600" style={{ borderTop: '0.1vw solid' }} />
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
                    <div className="fourth relative" style={{ border: '0.1vw solid black', marginBottom: '2vw', padding: '2vw 0 0 0' }}>
                        <div style={{ width: '48vw', height: '14vw' }} className="flex">
                            <div className="w-full h-full absolute left-0 top-0">
                                <img className={`w-full  h-full object-cover`} src="assets/homepage/Background.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} src="assets/homepage/A_1.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} src="assets/homepage/A_2.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} src="assets/homepage/A_3.png" alt="" />
                            </div>
                            <div className="w-1/4 h-full relative">
                                <img className={`w-full  h-full object-contain`} src="assets/homepage/A_4.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="fifth w-fit flex flex-col items-center h-max" style={{ marginBottom: '2vw', }}>
                        <div style={{ fontSize: '1.5vw', fontWeight: '500', letterSpacing: '0.1vw', marginBottom: '0.7vw' }}>
                            &nbsp;{isLanguage.homepage[2]['ideaTitle']}
                        </div>
                        <div className="flex justify-between" style={{ width: '48.5vw', fontSize: '1.1vw', fontWeight: '500' }}>
                            {isLanguage.homepage[2]['children'].map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="flex flex-col justify-center items-center" style={{ width: '23%' }}>
                                        <div className="w-full h-full flex justify-center items-center text-center" style={{ border: '0.1vw solid black', padding: '0.2vw', marginBottom: '0.6vw' }}>
                                            {item}
                                        </div>
                                        <div style={{ width: '1.8vw', height:'auto' }}>
                                            <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '4vw', }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw' }}>
                            <img className={`object-contain`} style={{ width: '48.5vw' }} src={isLanguage.homepage[3]['ideaHeader']} alt="" />
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        <div style={{ width: '48vw' }}>
                            {isLanguage.homepage[3]['childrenDetail'].map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-full h-fit flex justify-center items-center" style={{ marginBottom: '2vw' }}>
                                        <div className="relative flex justify-center items-end" style={{width: '13.8vw', height: '5vw', border: '0.1vw solid black', paddingBottom: '0.3vw', marginRight: '1vw', fontSize: '0.8vw' }}>
                                            <div className="absolute" style={{ width: '5vw', top: '-2.4vw' }}>
                                                <img className={`object-contain`} style={{ width: '48.5vw' }} src={item.img} alt="" />
                                            </div>
                                            <div className="font-medium text-center">
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <div style={{ fontSize: '1.3vw', fontWeight: '600' }} className="w-full">
                                                {item.header}
                                            </div>
                                            <div className="font-medium" style={{ fontSize: '0.8vw' }}>
                                                {item.desc.split('|||').map((item2, index2) => {
                                                    return (
                                                        <div key={`${item2}${index2}`}>
                                                            {item2}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="eighth" style={{ width: '48vw', marginBottom: '5vw' }}>
                        <div className="font-bold" style={{ fontSize: '1.6vw' }}>
                            {isLanguage.homepage[4]['header']}
                        </div>
                        <div style={{ fontSize: '1vw' }}>
                            {isLanguage.homepage[4]['desc'].split('|||').map((item, index) => {
                                return (
                                    <div key={`${item}${index}`}>
                                        {item}
                                    </div>
                                )
                            })}
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
