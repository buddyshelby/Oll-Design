import React, { useState, useEffect, Fragment, useRef } from "react";

import Page from "../Page";

import classes from "./Homepage.module.css";
import MediaQuery from "@/Components/MediaQuery";

const Homepage = () => {

    const firstQuestionRef = useRef(null)
    const [firstQuestionDesc, setFirstQuestionDesc] = useState(0)

    useEffect(() => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
    }, [firstQuestionRef.current?.clientWidth])
    
    const handleResize = () => {
        if (firstQuestionRef.current) {
            setFirstQuestionDesc(firstQuestionRef.current.clientWidth)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <Page>
            <MediaQuery query="(max-width: 768px)">
            {({ matches }) => (
                <>
                {matches ?
                
                <div className="w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '4vw 2vw 0 2vw', opacity: firstQuestionDesc === 0 ? '0' : '1' }}>
                    <div className="w-fit flex h-max">
                        <div className="flex justify-center items-center" style={{ padding: '0 2vw 0 0', fontSize: '15vw' }}>
                            Q
                        </div>
                        <div className="flex flex-col">
                            <div ref={firstQuestionRef} style={{ fontSize: '4vw', letterSpacing: '0.2vw' }} className="w-fit">グラフィックだけはしてくれないの？</div>
                            <div className="flex justify-center items-center" style={{ width: `${firstQuestionDesc}px`, fontSize: '2.4vw', letterSpacing: '0.2vw' }}>
                            設計業務だけに付随する事業だと思われがちで、よくこの質問をお客様か
                            ら頂きますが応えはもちろん「はい、よろこんで」。
                            それが当グラフィック事業専用ページを開設した経緯です。
                            </div>
                        </div>
                    </div>
                </div>

                :

                <div className="w-full h-full bg-green-500 flex flex-col items-center" style={{ padding: '4vw 5vw 0 5vw', opacity: firstQuestionDesc === 0 ? '0' : '1' }}>
                    <div className="w-fit flex h-max">
                        <div className="flex justify-center items-center" style={{ padding: '0 2vw 0 0', fontSize: '8vw' }}>
                            Q
                        </div>
                        <div className="flex flex-col">
                            <div ref={firstQuestionRef} style={{ fontSize: '2vw', letterSpacing: '0.2vw' }} className="w-fit">グラフィックだけはしてくれないの？</div>
                            <div className="flex justify-center items-center" style={{ width: `${firstQuestionDesc}px`, fontSize: '1.3vw' }}>設計業務だけに付随する事業だと思われがちで、よくこの質問をお客様か
    ら頂きますが応えはもちろん「はい、よろこんで」。
    それが当グラフィック事業専用ページを開設した経緯です。</div>
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
