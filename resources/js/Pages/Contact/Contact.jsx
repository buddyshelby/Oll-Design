import React, { Component, useState } from "react";

import Card from "@/Components/Card";

import Page from "../Page";
import "./Contact.css";
const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);


        const sendEmail = async () => {
            setIsLoading(true);
            const bodyEmail = {
                email: 'mtegar057@gmail.com',
                name: 'Budi Tampan',
                question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolorum ut itaque dolores, velit neque quam assumenda tenetur vitae ratione quo incidunt vel voluptates, nisi omnis. Facere vel unde aliquid?',
            }
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/sendEmail"
                );
                setIsLoading(false);
            } catch (e) {
                console.error("Error Sent Email:", e);
            }
        };

        const clickHandler = (e) => {
            e.preventDefault()
            sendEmail()
        }

        return (
            <Page>
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
