import React, { useState, useEffect, useRef } from "react";

import Page from "../Page";

import classes from "./Homepage.module.css";
import MediaQuery from "@/Components/MediaQuery";
import axios from "axios";
import { sleep } from "@/Utils/Sleep/sleep";
import { useTranslation } from "react-i18next";
// import DownArrow from '/public/assets/icon/Pages/Homepage/arrow_down.jsx'

const displayInterest = [
    {
        img: 'assets/homepage/Icon A.png',
        title: 'ブランディング',
        header: '会社やお店の商品、サービスのイメージの構築',
        desc: '■ロゴデザイン　■パッケージデザイン　■ウェブデザイン　■イラスト作成|||■パンフレット　■会社案内　■ポスター　■名刺　■診察券　■ポイントカードなど|||■ユニフォーム　■オリジナルグッズ作成'
    },
    {
        img: 'assets/homepage/Icon B.png',
        title: 'サインデザイン',
        header: 'お店のイメージを最大限に訴求する効果的なサインデザイン',
        desc: '■ファサードサイン　■壁面看板　■突き出し看板（袖看板）　■自立看板（ポール看板）　■スタンド看板|||■窓面看板（ウィンドウサイン）　■ネオンサイン　■LED看板　■パネル看板　■旗看板（フラッグサイン）|||■屋上看板　■A型看板　■箱型看板（チャンネルサイン）　■垂れ幕・横断幕'
    },
    {
        img: 'assets/homepage/Icon C.png',
        title: 'WEBサイトの制作',
        header: '最新技術を活用したWEBデザインサービスのご提案',
        desc: '私たちの協力会社と共に、最新技術を駆使した革新的なWEBデザインサービスを提供します。 レスポンシブデザイン、インタラクティブ要素、AIを活用したパーソナライズなど、ユーザー体験を最大化。 SEO最適化や高速表示、直感的なUI設計で、訪問者に優れた体験を提供します。 また、最新のセキュリティ技術を導入し、安全なサイト運営を実現。 デジタルプレゼンスを強化し、ブランド力をアップさせます。'
    },
    {
        img: 'assets/homepage/Icon D.png',
        title: '広 告・販 促 デ ザ イ ン',
        header: '視覚的に訴求力のあるデザインでメッセージを効果的に伝えます。',
        desc: '弊社の広告・販促デザインは、多様な広告デザインに対応できる強みがあります。 多くの協力会社との連携により、ワンストップでの提案が可能です。 また、印刷やグッズ制作の知識と経験が豊富で、クオリティの高い仕上がりを提供しています。 お客様のニーズに合わせた最適な広告・販促戦略をデザインから印刷まで一貫してサポートいたします'
    },
    {
        img: 'assets/homepage/Icon E.png',
        title: '撮 影・映 像 制 作',
        header: '高品質な映像と技術でブランドを引き立てる',
        desc: '私たちの撮影・映像制作サービスは、ブランドの魅力を引き出す高品質な映像を提供します。 最新の撮影技術を駆使し、ストーリーテリングを重視したコンテンツ作成が可能です。 宣伝用動画や商品紹介など、さまざまなニーズに対応し、編集から仕上げまで一貫してサポートします。'
    },
]

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
                
                <div ref={mainContainerRef} className="relative w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '4vw 0 0 0', opacity: firstQuestionDesc === 0 ? '0' : '1', backgroundColor: '#D8DC24', fontFamily: "'SimHei', sans-serif" }}>
                    <div className="first w-fit flex h-max" style={{ marginBottom: '2vw' }}>
                        <div className="relative flex justify-center items-center z-10" style={{ width: '10vw', height: '10vw', padding: '0 2vw 0 0', fontSize: '8vw', color: '#10643C' }}>
                            <img className={`w-full h-full object-contain`} src="assets/homepage/Q Mark.png" alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div ref={firstQuestionRef} className="w-fit">
                                <img className={`object-contain`} style={{ width: '70vw' }} src="assets/homepage/Q title JP.png" alt="" />
                            </div>
                            <div className="flex justify-center items-center" style={{ width: `${firstQuestionDesc}px`, fontSize: '2vw' }}>
                            設計業務だけに付随する事業だと思われがちで、よくこの質問をお客様か
                            ら頂きますが応えはもちろん「はい、よろこんで」。
                            それが当グラフィック事業専用ページを開設した経緯です。
                            </div>
                        </div>
                    </div>
                    <div className="second w-fit flex h-max" style={{ marginBottom: '0.5vw' }}>
                        <div style={{ fontSize: '2.4vw', fontWeight: 'bold', textShadow: '0.1vw 0.2vw 0.4vw rgba(0, 0, 0, 0.5)' }}>
                            <img className={`object-contain`} style={{ width: '81vw' }} src="assets/homepage/Top JP.png" alt="" />
                        </div>
                    </div>
                    <div className="third" style={{  border: '0.1vw solid black', padding: '0.5vw', marginBottom: '4vw' }}>
                        <div style={{ width: '76vw' }} className="flex h-auto">
                            <div className="w-full h-full flex flex-col">
                                {imageSlideData.map((item, index) => {
                                    const date = new Date(item.Date)
                                    date.setMonth(date.getMonth() + 1)
                                    const month = date.getMonth()
                                    const year = date.getFullYear()
                                    return (
                                        <div key={`${item}${index}`} className="w-full">
                                            <div ref={imageSlideRef} className="relative w-full flex justify-center items-center overflow-hidden" style={{ opacity: '1', height: '30vw', marginBottom: '0.5vw' }}>
                                                <img onLoad={(e) => testOnLoad(e, item.id)} className={`absolute w-full h-full object-cover blur-sm pointer-events-none`} src={`https://olldesign.jp/storage/${item.Img[0]}`} alt="" />
                                                <img className={`w-fit h-full object-contain pointer-events-none ${classes['imageSlide']}`} src={`https://olldesign.jp/storage/${item.Img[0]}`} alt="" />
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
                    <div className="fourth relative" style={{ border: '0.1vw solid black', marginBottom: '4vw', padding: '2vw 0 0 0' }}>
                        <div style={{ width: '77vw', height: '14vw' }} className="flex">
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
                        <div style={{ fontSize: '4.2vw', fontWeight: '500', letterSpacing: '0.1vw' }}>
                            &nbsp;弊社のグラフィック事業ができること
                        </div>
                        <div className="flex flex-col justify-between" style={{ width: '77vw', fontSize: '3vw', fontWeight: '500' }}>
                            <div className="flex flex-col justify-center items-center" style={{ width: '100%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '1vw', marginBottom: '2vw' }}>
                                    ブランディング
                                </div>
                                <div style={{ width: '5vw', height:'auto', marginBottom: '2vw' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '100%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '1vw', marginBottom: '2vw' }}>
                                    サインデザイン
                                </div>
                                <div style={{ width: '5vw', height:'auto', marginBottom: '2vw' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '100%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '1vw', marginBottom: '2vw' }}>
                                    WEBサイトの制作
                                </div>
                                <div style={{ width: '5vw', height:'auto', marginBottom: '2vw' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '100%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '1vw', marginBottom: '2vw' }}>
                                    撮 影・映 像 制 作
                                </div>
                                <div style={{ width: '5vw', height:'auto', marginBottom: '2vw' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '8vw', }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw' }}>
                            <img className={`object-contain`} style={{ width: '77vw' }} src="assets/homepage/Idea JP.png" alt="" />
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        <div style={{ width: '77vw' }}>
                            {displayInterest.map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-full h-fit flex flex-col justify-center items-center" style={{ marginBottom: '2vw' }}>
                                        <div className="relative flex justify-center items-end" style={{width: '50vw', height: '15vw', border: '0.1vw solid black', paddingBottom: '0.3vw', marginBottom: '3vw', fontSize: '4vw' }}>
                                            <div className="absolute" style={{ width: '15vw', top: '-7vw' }}>
                                                <img className={`object-contain`} style={{ width: '48.5vw' }} src={item.img} alt="" />
                                            </div>
                                            <div className="font-medium">
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col" style={{ marginBottom: '9vw' }}>
                                            <div style={{ fontSize: '3vw', fontWeight: '600' }} className="w-full">
                                                {item.header}
                                            </div>
                                            <div className="font-medium">
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
                        <div className="font-bold" style={{ fontSize: '3vw' }}>
                            実績と言う「成功事例」を活用したデザイン力
                        </div>
                        <div style={{ fontSize: '2vw' }}>
                            設計業務とグラフィックデザインが統合された「総合的なデザイン力」が弊社にはあります。
                            <br />
                            つまり、空間デザイン、店舗デザイン、ブランド戦略、そしてグラフィックデザインが一体となった
                            ワンストップサービスが貴社の最大の強みです。
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
                            <img className={`object-contain`} style={{ width: '50vw' }} src="assets/homepage/Top JP.png" alt="" />
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
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '23%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '0.2vw', marginBottom: '0.6vw' }}>
                                    サインデザイン
                                </div>
                                <div style={{ width: '1.8vw', height:'auto' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '23%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '0.2vw', marginBottom: '0.6vw' }}>
                                    WEBサイトの制作
                                </div>
                                <div style={{ width: '1.8vw', height:'auto' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center" style={{ width: '23%' }}>
                                <div className="w-full h-full flex justify-center items-center" style={{ border: '0.1vw solid black', padding: '0.2vw', marginBottom: '0.6vw' }}>
                                    撮 影・映 像 制 作
                                </div>
                                <div style={{ width: '1.8vw', height:'auto' }}>
                                    <img className={`object-contain block`} src="assets/icon/Pages/Homepage/arrow_down.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sixth w-fit flex h-max" style={{ marginBottom: '4vw', }}>
                        <div style={{ fontSize: '2vw', fontWeight: '500', letterSpacing: '0.5vw' }}>
                            <img className={`object-contain`} style={{ width: '48.5vw' }} src="assets/homepage/Idea JP.png" alt="" />
                        </div>
                    </div>
                    <div className="seventh" style={{ marginBottom: '1vw', }}>
                        <div style={{ width: '48vw' }}>
                            {displayInterest.map((item, index) => {
                                return (
                                    <div key={`${item}${index}`} className="w-full h-fit flex justify-center items-center" style={{ marginBottom: '2vw' }}>
                                        <div className="relative flex justify-center items-end" style={{width: '13.8vw', height: '5vw', border: '0.1vw solid black', paddingBottom: '0.3vw', marginRight: '1vw', fontSize: '0.8vw' }}>
                                            <div className="absolute" style={{ width: '5vw', top: '-2.4vw' }}>
                                                <img className={`object-contain`} style={{ width: '48.5vw' }} src={item.img} alt="" />
                                            </div>
                                            <div className="font-medium">
                                                {item.title}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <div style={{ fontSize: '1vw', fontWeight: '600' }} className="w-full">
                                                {item.header}
                                            </div>
                                            <div className="font-medium">
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
                            実績と言う「成功事例」を活用したデザイン力
                        </div>
                        <div style={{ fontSize: '1vw' }}>
                            設計業務とグラフィックデザインが統合された「総合的なデザイン力」が弊社にはあります。
                            <br />
                            つまり、空間デザイン、店舗デザイン、ブランド戦略、そしてグラフィックデザインが一体となった
                            ワンストップサービスが貴社の最大の強みです。
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
