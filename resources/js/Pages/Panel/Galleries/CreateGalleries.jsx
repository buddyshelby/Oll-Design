import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import InputLabel from "@/Components/InputLabel";

export default function CreateGalleries() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [descriptionJp, setDescriptionJp] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionCh, setDescriptionCh] = useState("");
    const [updateByUser, setUpdateByUser] = useState("admin");
    const [validationError, setValidationError] = useState({});

    const createGallery = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("Name", name);
        formData.append("Date", date);
        formData.append("DescriptionJp", descriptionJp);
        formData.append("DescriptionEn", descriptionEn);
        formData.append("DescriptionCh", descriptionCh);
        formData.append("UpdateByUser", updateByUser);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/galleries`,
                formData
            );

            Swal.fire({
                icon: "success",
                text: response.data.message,
            });
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            // Lakukan sesuatu setelah berhasil, misalnya mengosongkan form atau navigasi ke halaman lain
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                Swal.fire({
                    icon: "error",
                    text: error.response
                        ? error.response.data.message
                        : "Something went wrong",
                });
            }
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 mb-4">
            {Object.keys(validationError).length > 0 && (
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger">
                            <ul className="mb-0">
                                {Object.entries(validationError).map(
                                    ([key, value]) => (
                                        <li key={key}>{value}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <form
                action=""
                method="post"
                onSubmit={createGallery}
            >
                <div className="m-4">
                    <InputLabel>Design Name :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Date :</InputLabel>
                    <input
                        type="date"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Description Design (Japanese) :</InputLabel>
                    <textarea
                        id="descJp"
                        name="descJp"
                        value={descriptionJp}
                        onChange={(e) => {
                            setDescriptionJp(e.target.value);
                        }}
                        rows="4"
                        class="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Write your descript here..."
                    ></textarea>
                </div>
                <div className="m-4">
                    <InputLabel>Description Design (English) :</InputLabel>
                    <textarea
                        id="descEn"
                        name="descEn"
                        value={descriptionEn}
                        onChange={(e) => {
                            setDescriptionEn(e.target.value);
                        }}
                        rows="4"
                        class="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Write your descript here..."
                    ></textarea>
                </div>
                <div className="m-4">
                    <InputLabel>Description Design (Chinese) :</InputLabel>
                    <textarea
                        id="descCh"
                        name="descCh"
                        value={descriptionCh}
                        onChange={(e) => {
                            setDescriptionCh(e.target.value);
                        }}
                        rows="4"
                        class="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Write your descript here..."
                    ></textarea>
                </div>
                <div className="m-4">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
