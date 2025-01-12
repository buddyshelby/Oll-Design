import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { Element, Link, animateScroll as scroll } from 'react-scroll';

import Page from "../Page";

import classes from "./Homepage.module.css";
import MediaQuery from "@/Components/MediaQuery";
import axios from "axios";
import { sleep } from "@/Utils/Sleep/sleep";
import { useTranslation } from "react-i18next";
import { animationMobile } from "./AnimationMobile";
import { animationDesktop } from "./AnimationDesktop";

const imageProjectSrc = [
    {
        src: '/assets/homepage/4x/image_1.jpg'
    },
    {
        src: '/assets/homepage/4x/image_2.jpg'
    },
    {
        src: '/assets/homepage/4x/image_3.jpg'
    },
    {
        src: '/assets/homepage/4x/image_4.jpg'
    },
    {
        src: '/assets/homepage/4x/image_5.jpg'
    },
]

const Homepage = () => {

    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(Object.values(i18n.store.data)[0].translation);
    const [width, setWidth] = useState(0)
    const firstQuestionRef = useRef(null)
    const mainContainerRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState([])
    
    const [loadingText, setLoadingText] = useState(0)
    const loadingRef = useRef(null)
    const skillsRef = useRef([])
    const [halfPage, setHalfPage] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(1)
    
    const allImage = (event) => {
        setImageLoaded((prevLoaded) => [
            ...prevLoaded,
            event
        ]);
    }
    
    const skillsLoadRef = (element, index) => {
        if (skillsRef.current) skillsRef.current[index] = element
    }

    useEffect(() => {
        if (skillsRef.current[0]) {
            let maxHeight = 0;
            skillsRef.current.forEach(item => {
                const clientHeight = item.clientHeight
                if (clientHeight > maxHeight) maxHeight = item.clientHeight
            })
            skillsRef.current.forEach(item => {
                item.style.height = `${maxHeight}px`
            })
        }
    }, [skillsRef.current[0]])

    const handleResize = () => {
        if (mainContainerRef.current) {
            mainContainerRef.current.parentElement.margin = '0'
            mainContainerRef.current.parentElement.parentElement.margin = '0'
            mainContainerRef.current.parentElement.parentElement.parentElement.classList.remove("container-fluid")
        }
        if (skillsRef.current[0]) {
            let maxHeight = 0;
            skillsRef.current.forEach(item => {
                const clientHeight = item.clientHeight
                if (clientHeight > maxHeight) maxHeight = item.clientHeight
            })
            skillsRef.current.forEach(item => {
                item.style.height = `${maxHeight}px`
            })
        }
        setIdeaDescHeight(0)
        setTimeout(() => {
            if (ideaDescRef.current) {
                Array.from(ideaDescRef.current.children).forEach(item => {
                    setIdeaDescHeight((prev) => {
                        if (prev < item.clientHeight) {
                            return item.clientHeight
                        } else {
                            return prev
                        }
    
                    })
                })
            }
        }, 1000);
        setWidth(window.innerWidth)
    };
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const [mobileWheel, setMobileWheel] = useState(1)

    // useEffect(() => {
    //     let lastTouch;

    //     const scrollHandler = (e) => {
    //         if (mainContainerRef.current) {
    //             if (e.type === 'wheel') {
    //                 if (e.deltaY.toString().split('').filter(item => item === '-')[0]) {
    //                     setMobileWheel(prev => prev > 1 ? (prev - 1) : 1)
    //                 } else {
    //                     setMobileWheel(prev => prev <= mainContainerRef.current.scrollHeight ? (prev + 1) : mainContainerRef.current.scrollHeight)
    //                 }
                    
    //             }
    
    //             if (e.type === 'touchmove') {
    //                 const currentTouch = e.changedTouches[0].clientY
    //                 if (lastTouch > currentTouch) {
    //                     setMobileWheel(prev => prev <= mainContainerRef.current.scrollHeight ? (prev + 1) : mainContainerRef.current.scrollHeight)
    //                 } else {
    //                     setMobileWheel(prev => prev > 1 ? (prev - 1) : 1)
    //                 }
    //                 lastTouch = currentTouch
    //             }
    //         }
    //     }
        
    //     const touchHandler = (e) => {
    //         lastTouch = e.changedTouches[0].clientY;
    //         window.addEventListener('touchmove', scrollHandler)
            
    //         const touchEndHandler = (e) => {
                
    //             window.removeEventListener('touchmove', scrollHandler)
    
    //         }
    
    //         window.addEventListener('touchend', touchEndHandler)
    //         return () => window.removeEventListener('touchend', touchEndHandler)
    //     }

    //     window.addEventListener('touchstart', touchHandler);
    //     window.addEventListener('wheel', scrollHandler);
        
    //     return () => {
    //         window.removeEventListener('touchstart', touchHandler);
    //         window.removeEventListener('wheel', scrollHandler);
    //     };
    // }, []);

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
        if (width < 769 && width !== 0) {
            animationMobile(mainContainerRef)
        } else {
            animationDesktop(mainContainerRef, setHalfPage)
        }
        handleResize()
    }, [isLanguage])
    
    useEffect(() => {
        if (mainContainerRef.current && width > 768) {
            mainContainerRef.current.parentElement.style.margin = '0'
            mainContainerRef.current.parentElement.style.padding = '0'
            mainContainerRef.current.parentElement.parentElement.style.overflow = 'hidden'
            mainContainerRef.current.parentElement.parentElement.style.padding = '0'
            mainContainerRef.current.parentElement.parentElement.style.margin = '0'
            mainContainerRef.current.parentElement.parentElement.parentElement.classList.remove("container-fluid")
        }
    }, [mainContainerRef.current])
    
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://olldesign.jp/api/galleryList"
            );
            setIsData(res.data.galleryList.sort((a, b) => new Date(a.Date) - new Date(b.Date)).filter(item => item.TagsID === '2'));
        } catch (e) {
            console.error("Error fetching imagings:", e);
        }
    }, []);
    
    useEffect(() => {
        fetchData()
    }, [])

    const [isData, setIsData] = useState([]);

    useEffect(() => {
        // isData.forEach( async (item, index) => {
        //     const getRandomImage = Math.floor(Math.random() * item.Img.length)
        //     item['randomImage'] = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`

        //     const img = new Image();
        //     img.src = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`;
            
        //     img.onload = () => {
        //         allImage(img.src)
        //     };
        // })
        imageProjectSrc.forEach( async (item, index) => {

            const img = new Image();
            img.src = item.src;
            
            img.onload = () => {
                allImage(img.src)
            };
        })
        isLanguage.homepage[5]['thePeople'].forEach( async (item, index) => {
            const img = new Image();
            img.src = item;
            
            img.onload = () => {
                allImage(item)
            };
        })
        
    }, [])

    useEffect(() => {
        if (imageLoaded.length !== 0) {
            const uniqueSortedArray = [...new Set(imageLoaded)].sort((a, b) => a - b);
            const totalData = uniqueSortedArray.length / (imageProjectSrc.length + isLanguage.homepage[5]['thePeople'].length) * 100
            const loopLoading = async () => {
                for (let index = loadingText; index <= totalData; index++) {
                    await sleep(10)
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = setTimeout(() => {
                        if (loadingRef.current) {
                            loadingRef.current.style.fontSize = '3vw'
                            loadingRef.current.innerText = 'Data Image Can\'t be proceed properly.'
                            setTimeout(() => {
                                // window.location.reload()
                                loadingRef.current.style.transition = '2s'
                                loadingRef.current.style.opacity = '0'
                            }, 3000);
                            setTimeout(() => {
                                loadingRef.current.style.display = 'none'
                            }, 2000);
                        }
                    }, 30000);
                    if (index <= 100) {
                        setLoadingText(index)
                    }
                }
            }
    
            loopLoading()
        }
        
    }, [imageLoaded, imageProjectSrc])

    const timeoutRef = useRef(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (loadingRef.current) {
                loadingRef.current.style.fontSize = '3vw'
                loadingRef.current.innerText = 'Data Image Can\'t be proceed properly.'
                setTimeout(() => {
                    // window.location.reload()
                    loadingRef.current.style.transition = '2s'
                    loadingRef.current.style.opacity = '0'
                }, 3000);
                setTimeout(() => {
                    loadingRef.current.style.display = 'none'
                }, 2000);
            }
        }, 30000);
    }, [])

    useEffect(() => {
        const afterLoading = async () => {
            if (loadingRef.current) {
                loadingRef.current.style.transition = '2s'
                loadingRef.current.style.opacity = '0'
                await sleep(2001)
                loadingRef.current.style.display = 'none'
            }
            
            if (width < 769 && width !== 0) {
                animationMobile(mainContainerRef)
            } else {
                animationDesktop(mainContainerRef, setHalfPage)
            }
        }
        if (loadingText >= 100) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            afterLoading()
        }
    }, [loadingText])

    const [ideaDescHeight, setIdeaDescHeight] = useState(0)
    const ideaDescRef = useRef(null)

    useEffect(() => {
        if (ideaDescRef.current) {
            Array.from(ideaDescRef.current.children).forEach(item => {
                item.style.height = 'auto'
                setIdeaDescHeight(0)
            })
            setTimeout(() => {
                Array.from(ideaDescRef.current.children).forEach(item => {
                    setIdeaDescHeight((prev) => {
                        if (prev < item.clientHeight) {
                            return item.clientHeight
                        } else {
                            return prev
                        }
    
                    })
                })
            }, 1000);
        }
    }, [ideaDescRef.current])

    const [currentProject, setCurrentProject] = useState(0)
    const [currentImage, setCurrentImage] = useState([])
    const [currentPeople, setCurrentPeople] = useState(0)
    const [animationIds, setAnimationIds] = useState([])
    const imageSlideRef = useRef([])

    useEffect(() => {
        if (imageProjectSrc.length > 0) {
            function runAnimation() {
                function animate() {
                    setCurrentProject(prev => {
                        const totalDataIndex = imageProjectSrc.length
                        const nextValue = prev + 1
                        
                        if (nextValue > totalDataIndex - 1) return 0
                        else return nextValue
                    })
                    setCurrentPeople(prev => {
                        const totalDataIndex = isLanguage.homepage[5]['thePeople'].length
                        const nextValue = prev + 1
                        
                        if (nextValue > totalDataIndex - 2) return 0
                        else return nextValue
                    })
                    // setTimeout(runAnimation, 7000);
                }
                for (let index = 0; index < 100; index++) {
                    setTimeout(animate, 7000 * index)
                }
            }
            
            const id = requestAnimationFrame(runAnimation);
            setAnimationIds(prev => [
                ...prev,
                id,
            ])

            return () => {
                animationIds.forEach(id => cancelAnimationFrame(id))
            }
        }
        
    }, [imageProjectSrc])

    const [ideaButton, setIdeaButton] = useState('') 

    const questionHandler = (e) => {
        if (e.target.nextSibling.style.height === '0px') {
            e.target.nextSibling.style.height = `calc(${(e.target.nextSibling.scrollHeight / width) * 100}vw + 1.4vw)`
            e.target.nextSibling.style.padding = '0.7vw 0'
        } else {
            e.target.nextSibling.style.height = `0px`
            e.target.nextSibling.style.padding = '0'
        }
    }

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
            {({ matches }) => 
                matches ?
                
                (<></>)

                :

                (<div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '0 0 0 0', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    <div ref={loadingRef} className="fixed top-0 w-full h-screen flex justify-center items-center text-slate-800 z-30 text-opacity-20" style={{ backgroundColor: '#D8DC24', fontSize: '20vw' }}>
                        {loadingText}
                    </div>
                    <div className="sticky-text right-0 fixed z-20 text-white cursor-pointer" style={{ willChange: 'translate', top: `${halfPage ? 30 : 98.5}%`, transition: '1s', translate: `0 ${halfPage ? -30 : -98.5}%`, color: 'white', fontSize: '1vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", fontWeight: 'bold' }}>
                        {halfPage ? <Link 
                        className="w-full h-full flex flex-col no-underline text-white select-none"
                        style={{ padding: '2vw 1vw', borderTopLeftRadius: '1vw', borderBottomLeftRadius: '1vw', backgroundColor: '#281C24' }}
                        to={`mainTop`} 
                        spy={true} 
                        smooth={true} 
                        offset={0} 
                        duration={100}
                        >
                            {isLanguage.homepage[6]['stickyText'][1].split('').map((item, index) =>
                            item !== ' ' ?
                            (
                                <span key={`${item}${index}`}>
                                    {item.toUpperCase()}
                                </span>
                            ) : (<br key={`${item}${index}`}/>)
                            )}
                        </Link>
                        :
                        <div onClick={() => {window.location.href = '/contact-us'}} className="w-full h-full flex flex-col select-none" style={{ padding: '2vw 1vw', borderTopLeftRadius: '1vw', borderBottomLeftRadius: '1vw', backgroundColor: '#281C24' }}>
                            {isLanguage.homepage[6]['stickyText'][0].split('').map((item, index) =>
                            item !== ' ' ?
                            (
                                <span key={`${item}${index}`}>
                                    {item.toUpperCase()}
                                </span>
                            ) : (<br key={`${item}${index}`}/>)
                            )}
                        </div>}
                    </div>
                    <Element name="mainTop" className="first w-full flex flex-col justify-center items-center">
                        <div className="w-full left-0 top-0 flex justify-center items-center" style={{ backgroundColor: '#403C3C', color: '#FDF100', fontSize: '2.3vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", fontWeight: 'bold' }}>
                            <div style={{ marginBottom: '0.8vw' }}>
                                &nbsp;&nbsp;{isLanguage.homepage[0]['title']}
                            </div>
                        </div>
                    </Element>
                    <div className="second w-full flex flex-col justify-center items-center bg-white">
                        <div style={{  transition: '1s', translate: '0 5vw', opacity: '0' }} className="flex w-full h-auto overflow-hidden">
                            <div className="w-full h-full flex relative overflow-hidden">
                                {imageProjectSrc.map((item, index) => {
                                    return (
                                        <div key={`${item}${index}`} className="w-full select-none pointer-events-none" style={{ transition: '1500ms', translate: `-${currentProject * 100}%`, flex: '0 0 100%' }}>
                                            <div className="w-full select-none pointer-events-none flex flex-col-reverse overflow-hidden h-auto">
                                                <div className="relative w-full flex justify-center items-center overflow-hidden" style={{ opacity: '1', height: '10vw', transition: '500ms', flex: '0 0 100%' }}>
                                                    {/* <img className={` w-full h-full object-cover pointer-events-none blur-sm`} src={item.src} alt="" /> */}
                                                    <img className={`w-full h-full object-contain pointer-events-none scale-100`} src={item.src} alt="" />
                                                </div>
                                            </div>
                                            {/* <div className="w-full flex justify-center items-center">
                                                <div className="flex flex-col" style={{ width: '95%', fontSize: '0.9vw' }}>
                                                    <div className="relative flex w-full">
                                                        <div>
                                                            {item.City_Name}
                                                        </div>
                                                        <div className="absolute right-0">
                                                            {year}.{month}
                                                        </div>
                                                    </div>
                                                    <div className="border-slate-600" style={{ borderTop: '0.1vw solid' }} />
                                                    <div>
                                                        {item.Name}
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    )
                                })}
                                {/* <div className="absolute w-full h-full bg-black opacity-15"></div> */}
                                <div onClick={() => setCurrentProject(prev => prev > 0 ? (prev - 1) : 0)} className="absolute h-full flex items-center left-0 bg-black bg-opacity-10 text-white select-none cursor-pointer" style={{ padding: '0 1vw' }}>
                                    <div style={{ width: '2vw', height: '2vw', rotate: '180deg' }}>
                                        <img className="w-full h-full object-cover" src="/assets/homepage/arrow.svg" alt="" />
                                    </div>
                                </div>
                                <div onClick={() => setCurrentProject(prev => prev <= imageProjectSrc.length - 2 ? (prev + 1) : 0)}  className="absolute h-full flex items-center right-0 bg-black bg-opacity-10 text-white select-none cursor-pointer" style={{ padding: '0 1vw' }}>
                                    <div style={{ width: '2vw', height: '2vw' }}>
                                        <img className="w-full h-full object-cover" src="/assets/homepage/arrow.svg" alt="" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full flex justify-center bg-red bg-opacity-10 text-white select-none cursor-pointer">
                                    {imageProjectSrc.map((item, index) => (
                                        <div key={`${item}${index}`} style={{ padding: '1vw' }} onClick={() => setCurrentProject(index)}>
                                            <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '9999vw', backgroundColor: 'white', mixBlendMode: 'difference', opacity: index === currentProject ? '1' : '0.2' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="third w-fit relative flex h-max" style={{ marginBottom: '1vw', marginTop: '0vw', width: '47.5vw' }}>
                        <div className="relative flex justify-center items-center z-10" style={{ width: '10vw', height: '10vw', padding: '0 2vw 0 0', fontSize: '8vw', color: '#10643C', transition: '1s', opacity: '0', transform: 'translate(0, -3vw)' }}>
                            <img className={`w-full h-full object-contain`} src={isLanguage.homepage[1]['QMark']} alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div ref={firstQuestionRef} style={{ fontSize: '2vw', marginBottom: '0.5vw', letterSpacing: '0.1vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", transition: '1s', opacity: '0', transform: 'translate(10vw, 0)' }} className="w-fit">
                                {isLanguage.homepage[1]['QHeader']}
                            </div>
                            <div className="flex flex-col justify-center" style={{ fontSize: '1.1vw', fontFamily: "'kozuka-mincho-pro', sans-serif", transition: '1s', opacity: '0', transform: 'translate(-20vw, 0)' }}>
                                {isLanguage.homepage[1]['QDesc'].split('|||').map((item, index) => {
                                    return (
                                        <div key={`${item}${index}`} className="text-justify">
                                            {item}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="fourth bg-white flex flex-col justify-center items-center w-full">
                        <div>
                            <div style={{ width: '5vw', height:'auto' }}>
                                <img className={`w-full block`} src="assets/icon/Pages/Homepage/triangle.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="fifth bg-white flex flex-col justify-center items-center w-full">
                        <div style={{ width: '47.5vw', marginBottom: '2vw' }}>
                            <div style={{ marginBottom: '1vw', fontSize: '2vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", fontWeight: 'bold', color: '#0b6e43', transition: '1s', translate: '-5vw', opacity: '0' }}>
                               {isLanguage.homepage[2]['head']}
                            </div>
                            <div style={{ fontSize: '1.1vw', fontFamily: "'kozuka-mincho-pro', sans-serif", transition: '1s', translate: '5vw', opacity: '0' }}>
                               {isLanguage.homepage[2]['desc'].split('|||').map((item, index) => {
                                    return (
                                        <div key={`${item}${index}`}>
                                            {item}
                                        </div>
                                    )
                               })}
                            </div>
                        </div>
                    </div>
                    <div className="sixth w-full flex flex-col justify-center items-center bg-white">
                        <div style={{ width: '48vw', height: '18vw', border: '0.1vw solid black', marginBottom: '2vw', padding: '1.5vw 0 0 0', transition: '1s', translate: '5vw', opacity: '0' }} className="relative flex">
                            <div className="w-full h-full absolute left-0 top-0">
                                <img className={`w-full  h-full object-cover`} src="assets/homepage/Background.png" alt="" />
                            </div>
                            <div className="w-full h-full flex overflow-hidden" style={{ transition: '500ms', opacity: '1' }}>
                                {isLanguage.homepage[5]['thePeople'].map((item, index) => {
                                    return (
                                        <div key={`${item}${index}`} className="w-full h-full relative" style={{ transition: '2s', translate: `-${currentPeople * 100}%`, flex: '0 0 50%' }}>
                                            <img className={`w-full  h-full object-contain`} src={item} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="seventh w-full flex flex-col items-center h-max bg-white" style={{ paddingBottom: '2vw' }}>
                        <Link 
                        className="w-full flex justify-center items-center cursor-pointer no-underline"
                        style={{ backgroundColor: '#303494', color: 'white', fontSize: '1.7vw', fontFamily: "'hira-kaku-pro-w6', sans-serif", fontWeight: 'normal', transition: '1s', opacity: '0', scale: '0' }}
                        onMouseEnter={() => setIdeaButton(`toQnaSectionButton`)}
                        onMouseLeave={() => setIdeaButton('')}
                        to={`toQnaSectionButton`} 
                        spy={true} 
                        smooth={true} 
                        offset={-50} 
                        duration={100}
                        >
                                {isLanguage.homepage[7]['blueBGText']}
                        </Link>
                    </div>
                    <div className="eighth w-fit flex flex-col items-center h-max">
                        <div style={{ fontSize: '2.9vw', fontWeight: '500', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", marginBottom: '1vw', transition: '1s', opacity: '0' }}>
                            &nbsp;{isLanguage.homepage[3]['ideaTitle']}
                        </div>
                        <div className="flex justify-between flex-wrap items-stretch" style={{ width: '48.5vw', fontSize: '1.1vw', fontWeight: '500', gap: '1vw' }}>
                            {isLanguage.homepage[3]['children'].map((item, index) => {
                                return (
                                    <Link 
                                    key={`${item}${index}`}
                                    className="relative flex flex-col justify-center items-center cursor-pointer no-underline text-black"
                                    style={{ flex: '1 1 28%', transition: '1s', scale: '0', opacity: '0' }}
                                    onMouseEnter={() => setIdeaButton(`ideaAboveButton${index}`)}
                                    onMouseLeave={() => setIdeaButton('')}
                                    to={`ideaScroll${index}`} 
                                    spy={true} 
                                    smooth={true} 
                                    offset={-50} 
                                    duration={100}
                                    >
                                        <div ref={(element) => skillsLoadRef(element, index)} className="relative w-full flex justify-center items-center text-center bg-white" style={{ transition: '1s', border: '0.1vw solid black', padding: '1vw 2vw', marginBottom: '0.6vw', fontSize: '1vw', fontFamily: "'kozuka-mincho-pro', sans-serif", color: ideaButton === `ideaAboveButton${index}` ? '#20248c' : 'black' }}>
                                            <div className="absolute w-full h-full overflow-hidden">
                                                <div className="w-full h-full flex justify-center items-center text-black text-center" style={{ transition: '1s', willChange: 'translate', translate: ideaButton === `ideaAboveButton${index}` ? '0%' : '-100%', backgroundColor: '#D8DC24', padding: '1vw 2vw', marginBottom: '0.6vw', fontSize: '1vw', fontFamily: "'kozuka-mincho-pro', sans-serif" }} />
                                            </div>
                                            <span className="relative">
                                            {item}
                                            </span>
                                        </div>
                                        <div style={{ width: '1.8vw', height:'auto' }}>
                                            <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="nineth w-fit flex h-max" style={{ marginBottom: '1vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif" }}>
                        <div style={{ fontSize: '2.1vw', transition: '1s', translate: '5vw', opacity: '0' }}>
                            {isLanguage.homepage[4]['ideaHeader']}
                        </div>
                    </div>
                    <div className="tenth" style={{ marginBottom: '1vw'}}>
                        {isLanguage.homepage[4]['childrenDetail'].map((itemReference, index) => {
                            return (
                                <Element name={`ideaScroll${index}`} key={`${itemReference}${index}`} style={{ transition: '1s', translate: '0 -5vw', opacity: '0' }}>
                                    <div style={{ width: '48.2vw', marginBottom: '2vw' }} className={`flex flex-col justify-center items-center`}>
                                        <div className="w-full" style={{ marginBottom: '1vw' }}>
                                            <div className="w-full flex" style={{ backgroundColor: 'white', padding: '0.5vw 1vw', borderRadius: '1vw', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <div className="relative flex flex-col justify-center items-center" style={{width: '20vw', padding: '1vw', fontSize: '0.8vw', transition: '1s', scale: '0', opacity: '0' }}>
                                                    <div className="relative" style={{ width: '5vw' }}>
                                                        <img className={`object-contain`} style={{ width: '48.5vw' }} src={itemReference.img} alt="" />
                                                    </div>
                                                    <div className="font-medium text-center" style={{ fontSize: '1.2vw' }}>
                                                        {itemReference.title}
                                                    </div>
                                                </div>
                                                <div ref={ideaDescRef} className="w-full">
                                                    {itemReference.desc.split('|||').map((item, index) => {
                                                        return (
                                                            <div key={`${item}${index}`} className="w-full flex items-center" style={{ height: `${ideaDescHeight > 0 ? `${ideaDescHeight}px` :  `auto`}`, fontSize: '1vw', fontFamily: "'a-otf-ud新ゴpr6n-l', sans-serif", backgroundColor: '#403c3c', padding: '0.1vw 2vw 0.1vw 0.1vw', margin: '0.5vw 0', clipPath: 'polygon(0% 0%, 100% 0%, 97% 100%, 0% 100%)', transition: '1s', translate: '-5vw', opacity: '0' }}>
                                                                <div className="w-fit h-fit">
                                                                    {item.split('*').map((item, index) => {
                            
                                                                        const colorText = index === 1 ? '#D8DC24' : 'white'
                            
                                                                        return (
                                                                            <span key={`${item}${index}`} style={{ color: colorText }}>
                                                                                {item}
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative flex justify-center items-center text-center cursor-pointer" onClick={() => {window.location.href = '/contact-us'}} onMouseEnter={() => setIdeaButton(`ideaBelowButton${index}`)} onMouseLeave={() => setIdeaButton('')} style={{ width: '15vw', fontSize: '1.2vw', color: ideaButton === `ideaBelowButton${index}` ? '#20248c' : 'white', backgroundColor: ideaButton === `ideaBelowButton${index}` ? 'white' : '#20248c', borderRadius: '1vw', transition: '1s' }}>
                                            <span className="relative">
                                                {itemReference.button}
                                            </span>
                                        </div>
                                    </div>
                                </Element>
                            )
                        })}
                    </div>
                    <Element name={'toQnaSectionButton'} className="eleventh w-full flex flex-col items-center h-max bg-white" style={{ paddingBottom: '2vw' }}>
                        <div className="flex flex-col justify-center items-center" style={{ marginTop: '2vw', width: '48.5vw' }}>
                            <div className="w-full flex justify-center items-center" style={{ fontSize: '1.7vw', fontFamily: "'hira-kaku-pro-w6', sans-serif", fontWeight: 'bold', backgroundColor: '#303494', color: 'white', transition: '1s', translate: '-5vw', opacity: '0' }}>
                                {isLanguage.homepage[8]['header']}
                            </div>
                            <div className="w-full" style={{ fontSize: '1.1vw', fontFamily: "'kozuka-gothic-pr6n', sans-serif", fontWeight: 'bold' }}>
                                {isLanguage.homepage[8]['qna'].map((item, index) => (
                                        <div key={`${item}${index}`} className="w-full overflow-hidden" style={{ marginTop: '1vw' }}>
                                            <div className="Q relative w-full flex cursor-pointer z-10" onClick={questionHandler} style={{ backgroundColor: '#D8DC24', padding: '0.7vw 0', transition: '1s', translate: '5vw', opacity: '0' }}>
                                                <div className="pointer-events-none" style={{ padding: '0 0.7vw' }}>
                                                    Q
                                                </div>
                                                <div className="pointer-events-none" style={{ paddingLeft: '0.7vw' }}>
                                                    {item['Q']}
                                                </div>
                                            </div>
                                            <div className="A w-full flex" style={{ height: '0px', backgroundColor: '#F0EC9C', transition: '.5s', translate: '-5vw', opacity: '0' }}>
                                                <div style={{ padding: '0 0.7vw' }}>
                                                    A
                                                </div>
                                                <div style={{ paddingLeft: '0.7vw' }}>
                                                    {item['A'].split('|||').map((item, index) => (
                                                        <div key={`${item}${index}`}>
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                ))}
                            </div>
                            <div className="relative flex justify-center items-center text-center cursor-pointer" onClick={() => {window.location.href = '/contact-us'}} onMouseEnter={() => setIdeaButton(`qnaBelowButton0`)} onMouseLeave={() => setIdeaButton('')} style={{ width: '15vw', marginTop: '1vw', fontSize: '1.2vw', color: ideaButton === `qnaBelowButton0` ? '#20248c' : 'white', backgroundColor: ideaButton === `qnaBelowButton0` ? 'white' : '#20248c', borderRadius: '1vw', transition: '1s', translate: '5vw', opacity: '0' }}>
                                <span className="relative">
                                    {isLanguage.homepage[8]['button']}
                                </span>
                            </div>
                        </div>
                    </Element>
                </div>)
            }
            </MediaQuery>
        </Page>
    );
};

export default Homepage;