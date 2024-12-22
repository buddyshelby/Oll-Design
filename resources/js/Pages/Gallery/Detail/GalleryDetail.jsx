import React, { useEffect, useRef, useState } from "react";

import classes from "./GalleryDetail.module.css";
import Loading from "@/Pages/Loading/Loading";

const currentYear = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();

    return year;
}

const GalleryDetail = (props) => {

    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    const resizeHandler = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandler)

        return () => window.removeEventListener('resize', resizeHandler)
    }, [])


    let detailPages = props.detailPages[0]
    let scrollLength = 0
    let heightPage= 0
    const pageRef = useRef(null)
    const [splitedImage, setSplitedImage] = useState([])
    const [viewImage, setViewImage] = useState('')
    const [scrollLength1, setScrollLength1] = useState(0)
    const [waitRender, setWaitRender] = useState(false)
    const [backState, setBackState] = useState('')
    const [translation, setTranslation] = useState({
        set: 'En',
        choice: ['Jp', 'Ch']
    })

    const dateObject = new Date(detailPages.Date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString();

    const touchHandler = (eventStart) => {
            let currentTouch = eventStart.changedTouches[0].clientY
    
            const touchMoveHandler = (eventMove) => {
                eventStart.preventDefault()
                eventMove.preventDefault()
                
                const moveTouch = eventMove.changedTouches[0].clientY
                
                const checkDirection = (currentTouch - moveTouch)
                const tempLength = (scrollLength + checkDirection)
    
                currentTouch = moveTouch
    
                const calculateScroll = () => {
                    if (tempLength >= 0 && tempLength <= ((heightPage - height)))
                        return tempLength
                    else if (tempLength < 0 )
                        return 0
                    else if (tempLength > ((heightPage - height)))
                        return ((heightPage - height))
                }
        
                scrollLength = calculateScroll()
                setScrollLength1(scrollLength);
    
            }
    
            const touchEndHandler = () => {
    
                window.removeEventListener('touchmove', touchMoveHandler, { passive: false })
    
            }
    
            window.addEventListener('touchmove', touchMoveHandler, { passive: false })
    
            window.addEventListener('touchend', touchEndHandler)
    
            return () => window.removeEventListener('touchend', touchEndHandler)
    }

    useEffect(() => {
        window.addEventListener('touchstart', touchHandler, { passive: false })

        return () => window.removeEventListener('touchstart', touchHandler, { passive: false })
    }, [])

    useEffect(() => {
        window.addEventListener('wheel', scrollHandler)
        return () => window.removeEventListener('wheel', scrollHandler)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (pageRef.current) {
                heightPage = pageRef.current.clientHeight;
                setWaitRender(true)
            }
        }, 1000);
    }, [pageRef])

    useEffect(() => {
        const splitImage = [];
        let tempSrc = '';
        let currentQ = 0;
        let counter = 0
        detailPages.Img.forEach(item => {
            if (currentQ === 0) {
                tempSrc = item
                currentQ = 1
                counter ++
                console.log(counter, detailPages.Img.length);
                if (counter === detailPages.Img.length)
                    splitImage.push(tempSrc)
            } else if (currentQ === 1) {
                tempSrc = `${tempSrc}|${item}`
                currentQ = 0
                counter++
                splitImage.push(tempSrc)
            }
        })
        setSplitedImage(splitImage);
    }, [detailPages])

    const scrollHandler = (e) => {
            const tempLength = (scrollLength + Number(e.deltaY))
    
            const calculateScroll = () => {
                if (tempLength >= 0 && tempLength <= ((heightPage - height)))
                    return tempLength
                else if (tempLength < 0 )
                    return 0
                else if (tempLength > ((heightPage - height)))
                    return ((heightPage - height))
    
            }

            scrollLength = calculateScroll()
            setScrollLength1(scrollLength);
    }

    const backHandler = (state) => {
        
        if (state === 'click') {
            setTimeout(() => {
                setBackState('mouseEnter')
                props.getDetailId(0)
                props.setGalleryDetailView(false)
            }, 700);
        } else {
            setBackState(state)
        }
    }

    const imageHandler = (state, src) => {
        if (state === 'mouseEnter') {
            setViewImage(src)
        } else {
            setViewImage('')
        }
    }

    const translationHandler = (lang) => {
        const tempCurrentLang = translation.set
        const filterChoice = translation.choice.filter(e => e !== lang)[0]
        const setChoice = [filterChoice, tempCurrentLang]

        setTranslation({
            set: lang,
            choice: setChoice
        })

    }

    return (
        <>
            {!waitRender && <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
                <Loading />
            </div>}
            <div ref={pageRef} className={`w-full relative flex flex-col items-center ${waitRender ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}>
                {/* Photo Jumbotron  */}
                <div className="w-full relative flex flex-col justify-center items-center text-white" style={{ height: '90vh'}}>
                    <div style={{ transition: '500ms', transform: `translateX(-${scrollLength1 + (scrollLength1 * 1.5)}px)` }} className="absolute flex justify-center items-center top-10 right-10 w-28 h-28 rounded-full border-white border-8 z-10 cursor-pointer select-none" onMouseEnter={() => backHandler('mouseEnter')} onMouseLeave={() => backHandler('mouseLeave')} onClick={() => backHandler('click')}>
                        <span className="material-icons transition-all duration-700" style={{ fontSize: (backState === 'mouseEnter') ? '118px' : '80px' }}> arrow_circle_left </span>
                    </div>
                    <img className={`absolute w-full h-full object-cover ${classes['bg-jumbotron']}`} src={`storage/${detailPages.Img[0]}`} alt="" />
                    <span className="text-6xl sm:text-9xl font-bold text-center" style={{ transition: '500ms', maxWidth: width + 'px', transform: `translateY(${scrollLength1}px)` }}>{detailPages.Name}</span>
                </div>

                <div className="w-full relative flex flex-col items-center z-10" style={{ backgroundColor: '#e0dcdc', transition: '500ms', transform: `translateY(-${scrollLength1}px)` }}>
                    <div className="mx-3 sm:mx-0" style={{ maxWidth: '640px' }}>
                        <div className="my-6 flex flex-col">
                            <span>JAPAN {year}</span>
                        </div>
                        <div className="mb-5 flex">
                            {translation.choice.map((item, index) => (
                                <span key={index} onClick={() => translationHandler(item)} className="mx-1 border-b-2 cursor-pointer duration-500 border-slate-500 hover:border-slate-950 border-opacity-50 hover:border-opacity-100 text-slate-500 hover:text-slate-950">
                                    {item.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        <div className="mb-5 flex flex-col">
                            <span>{`${year}.${month}`}</span>
                        </div>
                        <div className="mb-5 flex flex-col">
                            <span>{detailPages.City_Name}</span>
                            <span>Completed</span>
                        </div>

                        <div className="mb-6">
                            <span>{detailPages[`Description${translation['set']}`]}</span>
                        </div>

                        {/* Image Showup */}
                    </div>
                    {/* <div className="mb-10" style={{ width: `${width - (width * 0.2)}px` }}> */}
                    <div className="w-full px-2" style={{ maxWidth: '1026px' }}>
                        {splitedImage.map((item, index) => {

                            const image1 = item.split('|')[0]
                            const image2 = item.split('|')[1]

                            return (
                                <div className="w-full flex flex-col sm:flex-row justify-center items-center" key={index}>
                                    <div className="w-full sm:w-1/2 mr-0 sm:mr-1 mb-2 overflow-hidden" onMouseEnter={() => imageHandler('mouseEnter', image1)} onMouseLeave={() => imageHandler('', image1)}>
                                        <img className="w-full object-cover obj" style={{ transition: '20s', maxHeight: '350px', scale: viewImage === image1 ? '1.5' : '1' }} src={`storage/${image1}`} alt="" />
                                    </div>
                                    {image2 && <div className="w-full sm:w-1/2 ml-0 sm:ml-1 mb-2 overflow-hidden" onMouseEnter={() => imageHandler('mouseEnter', image2)} onMouseLeave={() => imageHandler('', image2)}>
                                        <img className="w-full object-cover obj" style={{ transition: '20s', maxHeight: '350px', scale: viewImage === image2 ? '1.5' : '1' }} src={`storage/${image2}`} alt="" />
                                    </div>}
                                </div>
                            )
                        })}
                    </div>
                    {/* Copyright */}
                    <div className="w-full flex justify-center items-center py-4 mt-4 bg-slate-900 text-white text-center">
                        Copyright ©{currentYear()} OLL DESIGN Corporration. All Rights Reserved.
                    </div>
                </div>
            </div>
        </>
    );
};

export default GalleryDetail;
