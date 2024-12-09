import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import InputLabel from "@/Components/InputLabel";

export default function CreateTags() {
    const [validationError, setValidationError] = useState({});
    const [tag, setTag] = useState("");
    const [shortTag, setShortTag] = useState("");
    const [tagJp, setTagJp] = useState("");
    const [tagCh, setTagCh] = useState("");

    const createdTags = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("TagsName", tag);
        formData.append("ShortTags", shortTag);
        formData.append("TagsNameJp", tagJp);
        formData.append("TagsNameCh", tagCh);

        try {
            const res = await axios.post(
                `https://olldesign.jp/api/tags`,
                formData
            );

            setTimeout(() => {
                window.location.reload();
            }, 2000);
            Swal.fire({
                icon: "success",
                text: res.data.message,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setValidationError(e.response.data.errors);
            } else {
                Swal.fire({
                    icon: "error",
                    text: e.response
                        ? e.response.data.message
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
            <div className="m-4">
                <form action="" method="post" onSubmit={createdTags}>
                    <div className="m-4">
                        <InputLabel>Tags Name (English):</InputLabel>
                        <input
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                            name="TagsName"
                            id="TagsName"
                            value={tag}
                            onChange={(e) => {
                                setTag(e.target.value);
                                setShortTag(
                                    "#" +
                                        e.target.value
                                            .replaceAll(" ", "_")
                                            .toLowerCase()
                                );
                            }}
                        />
                    </div>
                    <div className="m-4">
                        <InputLabel>Tags Name (Japanese):</InputLabel>
                        <input
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                            name="TagsName"
                            id="TagsName"
                            value={tagJp}
                            onChange={(e) => {
                                setTagJp(e.target.value);
                            }}
                        />
                    </div>
                    <div className="m-4">
                        <InputLabel>Tags Name (Chinese):</InputLabel>
                        <input
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                            name="TagsName"
                            id="TagsName"
                            value={tagCh}
                            onChange={(e) => {
                                setTagCh(e.target.value);
                            }}
                        />
                    </div>
                    <div className="m-4">
                        <InputLabel>Tags:</InputLabel>
                        <input
                            type="text"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-100"
                            name="TagsName"
                            id="TagsName"
                            value={`#${tag.replaceAll(" ", "_").toLowerCase()}`}
                            disabled
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
        </div>
    );
}
