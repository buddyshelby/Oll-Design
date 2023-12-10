import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

import CreateTags from "./CreateTags";

export default function ListTags(props) {
    const [isCollapse, setIscollapse] = useState(true);
    const [isTags, setIsTags] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        TagsName: "",
        ShortTags: "",
        TagsNameJp: "",
        TagsNameCh: "",
    });

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tags");
            setIsTags(res.data);
        } catch (e) {
            console.error("Error fetching imagings:", e);
        }
    };

    const deleteTagsHandler = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((res) => res.isConfirmed);

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/tags/${id}`);
            Swal.fire({
                icon: "success",
                text: "Imaging deleted successfully!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            fetchTags();
        } catch (e) {
            console.error("Error deleting imaging:", e);
            Swal.fire({
                icon: "error",
                text: "Something went wrong while deleting imaging!",
            });
        }
    };

    const openUpdateModalHandler = (id) => {
        const selected = isTags.find((tag) => tag.id === id);
        setSelectedTags(selected);
        setUpdatedData({
            TagsName: selected.TagsName,
            ShortTags: selected.ShortTags,
            TagsNameJp: selected.TagsNameJp,
            TagsNameCh: selected.TagsNameCh,
        });
        setIsOpenModal(true);
    };

    const closeUpdateModalHandler = () => {
        setSelectedTags(null);
        setUpdatedData({
            TagsName: "",
            ShortTags: "",
            TagsNameJp: "",
            TagsNameCh: "",
        });
        setIsOpenModal(false);
    };

    const updateTagsHandler = async () => {
        try {
            const { id } = selectedTags;

            updatedData.ShortTags =
                "#" + updatedData.TagsName.replaceAll(" ", "_").toLowerCase();

            await axios.put(`http://localhost:8000/api/tags/${id}`, {
                ...updatedData,
            });

            Swal.fire({
                icon: "success",
                text: "Tags updated successfully!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            fetchTags();
            closeUpdateModalHandler();
        } catch (e) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong while updating tags!",
            });
        }
    };

    const toggleCollapse = () => {
        setIscollapse(!isCollapse);
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Galleries Form
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex mb-2">
                        <div className="inline-flex items-center justify-end w-[100vw]">
                            {!isCollapse ? (
                                <button
                                    type="button"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    onClick={toggleCollapse}
                                >
                                    <strong>x</strong> Cancel
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    onClick={toggleCollapse}
                                >
                                    <strong>+</strong> Add Tags
                                </button>
                            )}
                        </div>
                    </div>

                    {!isCollapse && <CreateTags />}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 mb-4">
                        <table className="w-full shadow-sm text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Tags Name (English)
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Tags Name (Japanese)
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Tags Name (Chinese)
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isTags && isTags.length > 0 ? (
                                    isTags.map((tag) => (
                                        <tr
                                            className="odd:bg-white even:bg-gray-50 border-b"
                                            key={tag.id}
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {tag.TagsName}
                                            </th>
                                            <td class="px-6 py-4">
                                                <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                                    {tag.TagsNameJp}
                                                </p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                                    {tag.TagsNameCh}
                                                </p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                                    {tag.ShortTags}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    className="font-medium text-blue-600 hover:underline mr-2"
                                                    onClick={() =>
                                                        openUpdateModalHandler(
                                                            tag.id
                                                        )
                                                    }
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="font-medium text-blue-600 hover:underline"
                                                    onClick={() =>
                                                        deleteTagsHandler(
                                                            tag.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >
                                            No data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Update Modal */}
                {isOpenModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-8 max-w-[90vw] w-[100%] max-h-[85vh] overflow-auto">
                            <h2 className="text-lg font-semibold mb-4">
                                Update Tags
                            </h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tags Name (English):
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={updatedData.TagsName}
                                    onChange={(e) =>
                                        setUpdatedData({
                                            ...updatedData,
                                            TagsName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tags Name (Japanese):
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={updatedData.TagsNameJp}
                                    onChange={(e) =>
                                        setUpdatedData({
                                            ...updatedData,
                                            TagsNameJp: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tags Name (Chinese):
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={updatedData.TagsNameCh}
                                    onChange={(e) =>
                                        setUpdatedData({
                                            ...updatedData,
                                            TagsNameCh: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tags:
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={updatedData.ShortTags}
                                    disabled
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={updateTagsHandler}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={closeUpdateModalHandler}
                                    className="bg-gray-500 text-white p-2 rounded ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
