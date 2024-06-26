import React, { Component, useEffect, useState } from "react";

import Card from "@/Components/Card";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

import Page from "../Page";
import "./Contact.css";
const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [question, setQuestion] = useState('')

    const onChangeHandler = (e, type) => {
        if (type === "name")
            setName(e.target.value)
        if (type === "email")
            setEmail(e.target.value)
        if (type === "question")
            setQuestion(e.target.value)
    }

    const sendEmail = async () => {
        setIsLoading(true);
        const bodyEmail = {
            email: email,
            name: name,
            question: question,
        }
        try {
            await axios.post("http://localhost:8000/api/sendEmail", bodyEmail, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            Swal.fire({
                icon: "success",
                text: "Thanks for The Question!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
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

    return (
        <Page>
            {isLoading && <div className="absolute w-full h-screen top-0 left-0 flex justify-center items-center bg-slate-50 bg-opacity-50">
                <Loading />
            </div>}
            <div className="container mt-4" style={{ width: 'calc(90vh)' }}>
                <Card
                    rounded={"rounded-[12px]"}
                    color={"bg-[#F4F3F3]"}
                    padding={"p-4"}
                    className="w-full"
                >
                    <form className="w-full ">
                        <div className="w-full mb-8">
                            <label htmlFor="name" className="form-label">
                                お名前 / NAME
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={(e) => onChangeHandler(e, "name")}
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="email" className="form-label">
                                メールアドレス / MAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={(e) => onChangeHandler(e, "email")}
                            />
                        </div>
                        <div className="mb-8 text-left">
                            <label
                                htmlFor="question"
                                className="form-label"
                            >
                                お問い合わせ / QUESTION
                            </label>
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="checkbox1"
                                    name="checkbox1"
                                    className="mr-2"
                                />
                                <label htmlFor="checkbox1">
                                    店舗出店について
                                </label>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="checkbox2"
                                    name="checkbox2"
                                    className="mr-2"
                                />
                                <label htmlFor="checkbox2">
                                    グラフィックデザインについて
                                </label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox3"
                                    name="checkbox3"
                                    className="mr-2"
                                />
                                <label htmlFor="checkbox3">
                                    コンサル・講演・セミナーについて
                                </label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="checkbox3"
                                    name="checkbox3"
                                    className="mr-2"
                                />
                                <label htmlFor="checkbox3">
                                    その他
                                </label>
                            </div>
                        </div>
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
                                <div className="pl-5">※営業目的のお問い合わせはお断りいたします</div>
                                <div className="pl-5">※(We do not accept inquiries for commercial purposes.)</div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}

export default ContactUs;
