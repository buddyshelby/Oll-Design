import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import InputLabel from "@/Components/InputLabel";
import FileUploader from "@/Components/FileUploader";
import Loading from "@/Pages/Loading/Loading";

export default function CreateGalleries() {
    const [isTag, setIsTag] = useState([]);
    const [name, setName] = useState("");
    const [cityName, setCityName] = useState("");
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
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

    const allField = ["Name", "City_Name", "Date", "DescriptionJp", "DescriptionEn", "DescriptionCh", "WorksTitle", "WorksContent", "WorksCredit", "WorksClient"]

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const res = await axios.get("http://olldesign.jp/api/galleries");
            setIsTag(res.data.tags);
        } catch (e) {
            console.error("Error fetching tags:", error);
        }
    };

    const onChangeSelectedTags = (e) => {
        setIsSelectedTag(e.target.value);
    };

    const createGallery = async (eventForm) => {
        const formData = eventForm.target.elements;
	const theBody = {}

        allField.forEach(item => {
          theBody[item] = formData[item].value
	})

	theBody["TagsID"] = "4"
	theBody["UpdateByUser"] = "admin"

        try {
	    setLoading(true)
            const res = await axios.post(`http://olldesign.jp/api/galleries`, theBody);
	    createImaging(eventForm)
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
    const createImaging = async (eventForm) => {
        const res = await axios.get("http://olldesign.jp/api/galleries");
        const resSort = res.data.galleries.sort((a, b) => b.id - a.id);

        const formData = new FormData();
	const theBody = eventForm.target.elements
        formData.append("GalleriesID", resSort[0].id);

        // Ensure image is an array before iterating
        if (Array.isArray(image)) {
            // Append an array of files

            for (let i = 0; i < theBody['file-input'].files.length; i++) {
              formData.append(`Img[${i}]`, theBody['file-input'].files[i]);
            }

            try {
                await axios.post(
                    "http://olldesign.jp/api/imagings",
                    formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
		});
	        setLoading(false)

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
	        setLoading(false)
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
	    {loading && <div className="absolute">
		    <div className="w-screen h-screen top-0 left-0 fixed flex justify-center items-center z-20 bg-black bg-opacity-25">
		      <Loading />
                    </div>
	    </div>}
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
                    createGallery(e);
                }}
            >
                <div className="m-4">
                    <InputLabel>Design Name :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="Name"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
	        <div className="m-4">
                    <InputLabel>City Name :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="City_Name"
                        id="cityName"
                        value={cityName}
                        onChange={(e) => {
                            setCityName(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <InputLabel>Date :</InputLabel>
                    <input
                        type="date"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        name="Date"
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
                        name="DescriptionJp"
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
                        name="DescriptionEn"
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
                        name="DescriptionCh"
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
                    <InputLabel>Works Title :</InputLabel>
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                        name="WorksTitle"
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
                        name="WorksContent"
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
                        name="WorksCredit"
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
                        name="WorksClient"
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
                            setImage([...image])
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
