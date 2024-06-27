import React, { Component, useEffect, useState } from "react";

import Card from "@/Components/Card";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

import tempDataContact from './contact.json'

import Page from "../Page";
import "./Contact.css";
import { useTranslation } from "react-i18next";
const ContactUs = () => {
    const dataContact = tempDataContact
    const { i18n } = useTranslation();
    const [isLanguage, setIsLanguage] = useState(i18n['language'])

    useEffect(() => {
        if (i18n['language'] === "en-us") {
            setIsLanguage("en")
        } else if (i18n['language'] === "ja") {
            setIsLanguage("jp")
        } else {
            setIsLanguage(i18n['language'])
        }
    }, [i18n['language']])

    const [isLoading, setIsLoading] = useState(false)
    const [dataInput, setDataInput] = useState({})

    useEffect(() => {
        let createSturucture = { option: '' }
        dataContact[0].forEach(item => {
            createSturucture[item.key] = ''
        })
        setDataInput(createSturucture)
        
    }, [])

    useEffect(() => {
        console.log(isLanguage);
    }, [isLanguage])

    const onChangeHandler = (e, type) => {
        const updatedData = dataContact[0].reduce((acc, item) => {
            if (type === item.key) {
                acc[item.key] = e.target.value;
            }
            return acc;
        }, {});
        setDataInput(prev => ({...prev, ...updatedData}))
    }

    const optionHandler = (e) => {
        setDataInput(prev => ({...prev, option: e.target.value}))
    }

    const sendEmail = async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:8000/api/sendEmail", dataInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 10000);
            Swal.fire({
                icon: "success",
                html: `<div>
                    ${dataContact[1][isLanguage]['success'].split('|||')[0]}
                    <br />
                    ${dataContact[1][isLanguage]['success'].split('|||')[1]}
                </div>`,
                timer: 10000,
                timerProgressBar: true,
                preConfirm: () => window.location.reload()
            });
        } catch (e) {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                text: "Oh no! Seems like there is invalid data you sent to us!",
            });
        }
    };

    const clickHandler = (e) => {
        e.preventDefault()
        sendEmail()
    }

    return (isLanguage && dataContact) && (
        <Page>
            {isLoading && <div className="absolute w-full h-screen top-0 left-0 flex justify-center items-center bg-slate-50 bg-opacity-50">
                <Loading />
            </div>}
            <div className="container my-4 w-full">
                <Card
                    rounded={"rounded-[12px]"}
                    color={"bg-[#F4F3F3]"}
                    padding={"p-4"}
                    className="w-full"
                >
                    <form>
                        {dataContact[0].map((item, index) => {
                            return item['type'] !== "select" ? (
                                <div className="w-full mb-8" key={index}>
                                    <label htmlFor={item['key']} className="form-label">
                                        {item['label']}
                                    </label>
                                    <input
                                        type={item['type']}
                                        className="form-control"
                                        id={item['key']}
                                        name={item['key']}
                                        onChange={(e) => onChangeHandler(e, item['key'])}
                                    />
                                </div>
                            ) : (
                                <div className="mb-8 text-left" key={index}>
                                    <label
                                        htmlFor="question"
                                        className="form-label"
                                    >
                                        {item['label']}
                                    </label>
                                    {item['option'][isLanguage]?.map((item2, index2) => {
                                        return (
                                            <div key={index2} className="d-flex align-items-center mb-2">
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    className="mr-2"
                                                    id={item2}
                                                    value={item2}
                                                    onChange={optionHandler}
                                                />
                                                <label htmlFor={item2}>
                                                    {item2}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        
                        <div className="mb-3 text-left">
                            <div className="mb-3 text-left">
                                <textarea
                                    className="form-control message-box"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    onChange={(e) => onChangeHandler(e, "question")}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex align-items-end">
                            <button type="submit" onClick={clickHandler} className="btn btn-black">
                                Submit
                            </button>
                            <div>
                                <div className="pl-5">※{dataContact[1][isLanguage]['warn']}</div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}

export default ContactUs;
