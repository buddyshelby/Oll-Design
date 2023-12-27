import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import InputLabel from "@/Components/InputLabel";
import FileUploader from "@/Components/FileUploader";

export default function CreateGalleries() {
    const [isTag, setIsTag] = useState([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [descriptionJp, setDescriptionJp] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionCh, setDescriptionCh] = useState("");
    const [isSelectedTag, setIsSelectedTag] = useState("");
    const [updateByUser, setUpdateByUser] = useState("admin");
    const [workstitle, setWotksTitle] = useState("");
    const [workscontent, setWorksContent] = useState("");
    const [workscredit, setWorksCredit] = useState("");
    const [worksclient, setWorksClient] = useState("");
    const [validationError, setValidationError] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/galleries");
            setIsTag(res.data.tags);
        } catch (e) {
            console.error("Error fetching tags:", error);
        }
    };

    const onChangeSelectedTags = (e) => {
        setIsSelectedTag(e.target.value);
    };

    const createGallery = async () => {
        const formData = new FormData();

        formData.append("Name", name);
        formData.append("Date", date);
        formData.append("DescriptionJp", descriptionJp);
        formData.append("DescriptionEn", descriptionEn);
        formData.append("DescriptionCh", descriptionCh);
        formData.append("UpdateByUser", updateByUser);
        formData.append("WorksTitle", workstitle);
        formData.append("WorksContent", workscontent);
        formData.append("WorksCredit", workscredit);
        formData.append("WorksClient", worksclient);
        formData.append("TagsID", isSelectedTag);

        try {
            await axios.post(
                `http://localhost:8000/api/galleries`,
                formData
            );

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

    // Change the createImaging function to append an array of files
    const createImaging = async () => {
        const res = await axios.get("http://localhost:8000/api/galleries");
        const resSort = res.data.galleries.sort((a, b) => b.id - a.id);

        const formData = new FormData();
        formData.append("GalleriesID", resSort[0].id);

        // Ensure image is an array before iterating
        if (Array.isArray(image)) {
            // Append an array of files
            for (const file of image) {
                formData.append("Img[]", file);
            }

            try {
                await axios.post(
                    "http://localhost:8000/api/imagings",
                    formData
                );

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                Swal.fire({
                    icon: "success",
                    text: "Imaging created successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });

                // Set image to null or an empty array
                setImage(null);
            } catch (error) {
                console.error("Error creating imaging:", error);
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong while creating imaging!",
                });
            }
        } else {
            // Handle the case where image is not an array (optional)
            console.error("Selected files are not in the expected format.");
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
                onSubmit={(e) => {
                    e.preventDefault();
                    createGallery();
                    createImaging();
                }}
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
                        className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Write your descript here..."
                    ></textarea>
                </div>
                <div className="m-4">
                    <InputLabel>Select Tag:</InputLabel>
                    <select
                        value={isSelectedTag}
                        onChange={onChangeSelectedTags}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="" disabled>
                            Select Tags
                        </option>
                        {isTag.map((tg) => (
                            <option key={tg.id} value={tg.id}>
                                {tg.ShortTags}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="m-4">
                    <InputLabel>Works Title :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="workstitle"
                        id="workstitle"
                        value={workstitle}
                        onChange={(e) => {
                            setWotksTitle(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Works Content :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="workscontent"
                        id="workscontent"
                        value={workscontent}
                        onChange={(e) => {
                            setWorksContent(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Works Credit :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="workscredit"
                        id="workscredit"
                        value={workscredit}
                        onChange={(e) => {
                            setWorksCredit(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Works Client :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="worksclient"
                        id="worksclient"
                        value={worksclient}
                        onChange={(e) => {
                            setWorksClient(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    {/* Replace the file input with FileUploader */}
                    <InputLabel>Image:</InputLabel>
                    <FileUploader
                        onFilesSelected={(selectedFiles) =>
                            setImage(selectedFiles)
                        }
                    />
                </div>
                <div className="m-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
