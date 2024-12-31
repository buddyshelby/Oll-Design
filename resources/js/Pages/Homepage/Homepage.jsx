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

const Homepage = () => {

    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(Object.values(i18n.store.data)[0].translation);
    const [width, setWidth] = useState(0)
    const [firstQuestionDesc, setFirstQuestionDesc] = useState(0)
    const firstQuestionRef = useRef(null)
    const mainContainerRef = useRef(null)
    const [imageLoaded, setImageLoaded] = useState([])
    
    const [loadingText, setLoadingText] = useState(0)
    const loadingRef = useRef(null)
    const skillsRef = useRef([])
    
    const imageLoadedLocal = []
    const imagePeopleSrc = [
        {
            src: 'assets/homepage/A_1.png'
        },
        {
            src: 'assets/homepage/A_2.png'
        },
        {
            src: 'assets/homepage/A_3.png'
        },
        {
            src: 'assets/homepage/A_4.png'
        },
        {
            src: 'assets/homepage/B_1.png'
        },
        {
            src: 'assets/homepage/B_2.png'
        },
        {
            src: 'assets/homepage/B_3.png'
        },
        {
            src: 'assets/homepage/B_4.png'
        },
    ]
    
    useEffect(() => {
        if (mainContainerRef.current) {
            const peopleRunnerBoxElement = mainContainerRef.current.children[4].children[0]
            peopleRunnerBoxElement.addEventListener( 'touchstart' , (e) => {
                peopleRunnerBoxElement.style.marginLeft = `${peopleRunnerBoxElement.offsetLeft}px`
            })
        }
    }, [mainContainerRef.current])
    
    const allImage = (event) => {
        setImageLoaded((prevLoaded) => [
            ...prevLoaded,
            event
                ]);
            // }
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
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
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
            animationDesktop(mainContainerRef)
        }
        handleResize()
    }, [isLanguage])
    
    useEffect(() => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
    }, [firstQuestionRef.current?.clientWidth])
    
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
        isData.forEach( async (item, index) => {
            const getRandomImage = Math.floor(Math.random() * item.Img.length)
            item['randomImage'] = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`

            const img = new Image();
            img.src = `https://olldesign.jp/storage/${item.Img[getRandomImage]}`;
            
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
    }, [isData])

    useEffect(() => {
        if (imageLoaded.length !== 0) {
            const uniqueSortedArray = [...new Set(imageLoaded)].sort((a, b) => a - b);
            const totalData = uniqueSortedArray.length / (isData.length + isLanguage.homepage[5]['thePeople'].length) * 100
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
                                window.location.reload()
                                loadingRef.current.style.transition = '2s'
                                loadingRef.current.style.opacity = '0'
                            }, 3000);
                            setTimeout(() => {
                                loadingRef.current.style.display = 'none'
                            }, 2000);
                        }
                    }, 12000);
                    if (index <= 100) {
                        setLoadingText(index)
                    }
                }
            }
    
            loopLoading()
        }
        
    }, [imageLoaded, isData])

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
                    window.location.reload()
                    loadingRef.current.style.transition = '2s'
                    loadingRef.current.style.opacity = '0'
                }, 3000);
                setTimeout(() => {
                    loadingRef.current.style.display = 'none'
                }, 2000);
            }
        }, 12000);
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
                animationDesktop(mainContainerRef)
            }
        }
        if (loadingText >= 100) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            afterLoading()
        }
    }, [loadingText])

    useEffect(() => {
        // People slide for mobile
        if (mainContainerRef.current && (width < 769 && width !== 0)) {
            const peopleBoxElement = mainContainerRef.current.children[4]
            if (peopleBoxElement.style.opacity !== '0' || peopleBoxElement.style.opacity !== '') {
                const peopleRunnerBoxElement = mainContainerRef.current.children[4].children[0]
                
                const runnerTouchStartHandler = (e) => {
                    const peopleComputedTranslate = parseFloat(window.getComputedStyle(peopleRunnerBoxElement).translate)
                    peopleRunnerBoxElement.style.translate = `${peopleComputedTranslate}px`;
                    peopleRunnerBoxElement.style.transition = '100ms linear'
                    const firstTouch = e.changedTouches[0].clientX;
                    let currentTouch = 0
                    
                    const runnerTouchMoveHandler = async (e) => {
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
                        const runnerWidth = peopleRunnerBoxElement.clientWidth;
                        const boxWidth = peopleBoxElement.clientWidth;

                        peopleRunnerBoxElement.style.transition = '30s linear'
                        setTimeout(() => {
                            peopleRunnerBoxElement.style.translate  = `calc(-${runnerWidth}px  + ${boxWidth}px)`
                        }, 100);
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
        if (isData.length > 0) {
            function runAnimation() {
                function animate() {
                    setCurrentProject(prev => {
                        const totalDataIndex = isData.length
                        const nextValue = prev + 1
                        
                        if (nextValue > totalDataIndex - 2) return 0
                        // else if (nextValue < 0) return totalDataIndex
                        else return nextValue
                    })
                    setTimeout(runAnimation, 7000);
                }
                
                const id = requestAnimationFrame(animate);
                setAnimationIds(prev => [
                    ...prev,
                    id
                ])
            }
            function runAnimationChild() {
                function animate() {
                    setCurrentImage(prev => {
                        
                        const detailImage = []
                        const newValueArray = []
                        isData.forEach((itemData, index) => {
                            const totalDataIndex = itemData.Img.length - 1
                            const nextValue = prev.length > 0 ? prev[index] + 1 : 0

                            detailImage.push(itemData.Img.length)

                            if (nextValue > totalDataIndex) newValueArray.push(0)
                            // else if (nextValue < 0) return totalDataIndex
                            else newValueArray.push(nextValue)
                        })
                        setTimeout(runAnimationChild, (7000 / Math.max(...detailImage)));
                        return newValueArray
                        
                    })
                }
                
                const id = requestAnimationFrame(animate);
                setAnimationIds(prev => [
                    ...prev,
                    id
                ])
            }
            function runAnimationPeople() {
                function animate() {
                    setCurrentPeople(prev => {
                        const totalDataIndex = isLanguage.homepage[5]['thePeople'].length
                        const nextValue = prev + 1
                        
                        if (nextValue > totalDataIndex - 2) return 0
                        // else if (nextValue < 0) return totalDataIndex
                        else return nextValue
                    })
                    setTimeout(runAnimationPeople, 7000);
                }
                
                const id = requestAnimationFrame(animate);
                setAnimationIds(prev => [
                    ...prev,
                    id
                ])
            }
              
            // Start the loop
            const id = requestAnimationFrame(runAnimation);
            const id2 = requestAnimationFrame(runAnimationChild);
            const id3 = requestAnimationFrame(runAnimationPeople);
            setAnimationIds(prev => [
                ...prev,
                id,
                id2,
                id3
            ])

            return () => {
                animationIds.forEach(id => cancelAnimationFrame(id))
            }
        }
        
    }, [isData])

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                {matches ?
                
                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center overflow-hidden" style={{ padding: '10vw 0 0 0', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
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
                            <div className="flex justify-center items-center" style={{ fontSize: '2vw', transition: '1s', opacity: '0', transform: 'translate(-20vw, 0)' }}>
                                {isLanguage.homepage[0]['QDesc']}
                            </div>
                        </div>
                    </div>
                    <div className="second w-fit flex h-max text-center" style={{ marginBottom: '0.5vw', transition: '1s', scale: '0', opacity: '0' }}>
                        <div style={{ fontSize: '2.4vw', fontWeight: 'bold', textShadow: '0.1vw 0.2vw 0.4vw rgba(0, 0, 0, 0.5)' }}>
                            <img className={`object-contain`} style={{ width: '81vw' }} src={isLanguage.homepage[1]['TopJP']} alt="" />
                        </div>
                    </div>
                    <div className="third overflow-hidden" style={{  border: '0.1vw solid black', padding: '0.5vw', marginBottom: '4vw', transition: '1s', scale: '0', opacity: '0' }}>
                        <div style={{ width: '76vw' }} className="flex h-auto">
                            <div className="w-full h-full flex flex-col overflow-hidden">
                                {imageSlideData.map((item, index) => {
                                    const date = new Date(item.Date)
                                    date.setMonth(date.getMonth() + 1)
                                    const month = date.getMonth()
                                    const year = date.getFullYear()
                                    return (
                                        <div key={`${item}${index}`} className="w-full" style={{ padding: '2vw', opacity: '0', transition: '500ms' }}>
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
                            {imagePeopleSrc.map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-1/4 h-full relative">
                                        <img className={`w-full  h-full object-contain`} style={{ padding: '2vw 0 0 0' }} src={item.src} alt="" />
                                    </div>
                                )
                            })}
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
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '12vw' }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw', opacity: '0', translate: '0 -10vw', transition: '1s' }}>
                            <img className={`object-contain`} style={{ width: '77vw' }} src={isLanguage.homepage[3]['ideaHeader']} alt="" />
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        <div style={{ width: '77vw' }}>
                            {isLanguage.homepage[3]['childrenDetail'].map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-full h-fit flex flex-col justify-center items-center" style={{ marginBottom: '10vw' }}>
                                        <div className="relative flex justify-center items-end" style={{width: '55vw', height: '25vw', border: '0.1vw solid black', padding: '0 0.3vw 1.3vw 0.3vw', marginBottom: '3vw', fontSize: '4vw', opacity: '0', transition: '1s' }}>
                                            <div className="absolute" style={{ width: '25vw', top: '-12vw', opacity: '0', scale: '0', transition: '1s' }}>
                                                <img className={`w-full object-contain`} src={item.img} alt="" />
                                            </div>
                                            <div className="font-medium text-center" style={{ fontSize: '4vw', opacity: '0', translate: '0 5vw', transition: '1s' }}>
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="w-full h-fit flex flex-col" style={{ marginBottom: '5vw' }}>
                                            <div style={{ fontSize: '4.5vw', fontWeight: '600', opacity: '0', translate: '-10vw 0', transition: '1s' }} className="w-full text-center">
                                                {item.header}
                                            </div>
                                            <div className="font-medium text-justify" style={{ fontSize: '3vw', opacity: '0', translate: '20vw 0', transition: '1s' }}>
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
                        <div className="font-bold" style={{ fontSize: '3.3vw', opacity: '0', translate: '-10vw', transition: '1s' }}>
                            {isLanguage.homepage[4]['header']}
                        </div>
                        <div style={{ fontSize: '2.7vw', opacity: '0', translate: '10vw', transition: '1s' }}>
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

                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '0 0 0 0', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    <div ref={loadingRef} className="fixed top-0 w-full h-screen flex justify-center items-center text-slate-800 z-20 text-opacity-20" style={{ backgroundColor: '#D8DC24', fontSize: '20vw' }}>
                        {loadingText}
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-full left-0 top-0 flex justify-center items-center" style={{ backgroundColor: '#403C3C', color: '#FDF100', fontSize: '2.3vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", fontWeight: 'bold' }}>
                            <div style={{ marginBottom: '0.8vw' }}>
                                &nbsp;&nbsp;{isLanguage.homepage[0]['title']}
                            </div>
                        </div>
                    </div>
                    <div className="first w-fit relative flex h-max" style={{ marginBottom: '1vw', marginTop: '2vw', width: '47.5vw' }}>
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
                    <div className="w-full bg-white flex flex-col justify-center items-center">
                        <div>
                            <div style={{ width: '5vw', height:'auto' }}>
                                <img className={`w-full block`} src="assets/icon/Pages/Homepage/triangle.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white flex flex-col justify-center items-center">
                        <div style={{ width: '47.5vw', marginBottom: '2vw' }}>
                            <div style={{ marginBottom: '1vw', fontSize: '2vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", fontWeight: 'bold', color: '#0b6e43' }}>
                               {isLanguage.homepage[2]['head']}
                            </div>
                            <div style={{ fontSize: '1.1vw', fontFamily: "'kozuka-mincho-pro', sans-serif" }}>
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
                    <div className="third w-full flex flex-col justify-center items-center bg-white">
                        <div style={{ width: '48vw', border: '0.1vw solid black', padding: '0.5vw', marginBottom: '2vw' }} className="flex h-auto overflow-hidden">
                            <div className="w-full h-full flex relative overflow-hidden">
                                {/* <div className="w-full relative"> */}
                                {isData.map((item, index1) => {
                                    return (
                                        <div key={`${item}${index1}`} className="w-1/2 select-none pointer-events-none" style={{ transition: '1500ms', translate: `-${currentProject * 100}%`, flex: '0 0 50%' }}>
                                            <div className="w-full select-none pointer-events-none flex flex-col-reverse overflow-hidden" style={{ height: '10vw', marginBottom: '0.5vw' }}>
                                                {item.Img.map((item, index) => {
                                                    return(
                                                        <div key={`${item}${index}`} className="relative w-full flex justify-center items-center overflow-hidden" style={{ opacity: '1', height: '10vw', transition: '500ms', translate: `0 ${currentImage[index1] * 100}%`, flex: '0 0 100%' }}>
                                                            <img className={`absolute w-full h-full object-cover blur-sm pointer-events-none`} src={`https://olldesign.jp/storage/${item}`} alt="" />
                                                            <img className={`w-full h-full object-contain pointer-events-none scale-100 absolute`} src={`https://olldesign.jp/storage/${item}`} alt="" />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <div className="flex flex-col" style={{ width: '95%', fontSize: '0.9vw' }}>
                                                    <div className="relative flex w-full">
                                                        <div>
                                                            PACKAGE DESIGN
                                                        </div>
                                                        <div className="absolute right-0">
                                                            2025.0
                                                        </div>
                                                    </div>
                                                    <div className="border-slate-600" style={{ borderTop: '0.1vw solid' }} />
                                                    <div>
                                                        WAKAYAMA
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="fourth w-full flex flex-col justify-center items-center bg-white">
                        <div style={{ width: '48vw', height: '14vw', border: '0.1vw solid black', marginBottom: '2vw', padding: '2vw 0 0 0' }} className="relative flex">
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
                    <div className="fifth w-fit flex flex-col items-center h-max">
                        <div style={{ fontSize: '2.9vw', fontWeight: '500', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif", marginBottom: '1vw' }}>
                            &nbsp;{isLanguage.homepage[3]['ideaTitle']}
                        </div>
                        <div className="flex justify-between flex-wrap items-stretch" style={{ width: '48.5vw', fontSize: '1.1vw', fontWeight: '500', gap: '1vw' }}>
                            {isLanguage.homepage[3]['children'].map((item, index) => {
                                return (
                                    <Link 
                                    key={`${item}${index}`}
                                    className="flex flex-col justify-center items-center cursor-pointer no-underline text-black" style={{ flex: '1 1 28%' }}
                                    to={`ideaScroll${index}`} 
                                    spy={true} 
                                    smooth={true} 
                                    offset={-50} 
                                    duration={100}
                                    >
                                        <div ref={(element) => skillsLoadRef(element, index)} className="w-full flex justify-center items-center text-center bg-white" style={{ border: '0.1vw solid black', padding: '1vw 2vw', marginBottom: '0.6vw', fontSize: '1vw', fontFamily: "'kozuka-mincho-pro', sans-serif" }}>
                                            {item}
                                        </div>
                                        <div style={{ width: '1.8vw', height:'auto' }}>
                                            <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '1vw', fontFamily: "'dnp-shuei-mincho-pr6n', sans-serif" }}>
                        <div style={{ fontSize: '2.1vw' }}>
                            {isLanguage.homepage[4]['ideaHeader']}
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        {isLanguage.homepage[4]['childrenDetail'].map((itemReference, index) => {
                            return (
                                <Element name={`ideaScroll${index}`}>
                                    <div key={`${itemReference}${index}`} style={{ width: '48.2vw', marginBottom: '4vw' }} className={`flex flex-col justify-center items-center`}>
                                        <div className="w-full" style={{ marginBottom: '1vw' }}>
                                            <div className="w-full flex" style={{ backgroundColor: 'white', padding: '0.5vw 1vw', borderRadius: '1vw', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px rgba(0, 0, 0, 0.1)' }}>
                                                <div className="relative flex flex-col justify-center items-center" style={{width: '20vw', padding: '1vw', fontSize: '0.8vw' }}>
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
                                                            <div key={`${item}${index}`} className="w-full flex items-center" style={{ height: `${ideaDescHeight > 0 ? `${ideaDescHeight}px` :  `auto`}`, fontSize: '1vw', fontStyle: "'a-otfud-shin-go-pr6n', sans-serif", backgroundColor: '#403c3c', padding: '0.1vw 2vw 0.1vw 0.1vw', margin: '0.5vw 0', clipPath: 'polygon(0% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
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
                                        <div className="flex justify-center items-center text-center" style={{ width: '15vw', fontSize: '1.2vw', color: 'white', backgroundColor: '#20248c', borderRadius: '1vw' }}>
                                            {itemReference.button}
                                        </div>
                                    </div>
                                </Element>
                            )
                        })}
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