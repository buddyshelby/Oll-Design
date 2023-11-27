import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import FileUploader from "@/Components/FileUploader";
import InputLabel from "@/Components/InputLabel";

export default function ImagingPanel(props) {
    const [imagings, setImagings] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [selectedGallery, setSelectedGallery] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchImagings();
        fetchGalleries();
    }, []);

    const fetchImagings = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/imagings"
            );
            setImagings(response.data);
        } catch (error) {
            console.error("Error fetching imagings:", error);
        }
    };

    console.log(imagings, "imagings");

    const fetchGalleries = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/galleries"
            );
            setGalleries(response.data);
        } catch (error) {
            console.error("Error fetching galleries:", error);
        }
    };

    const onChangeSelectedGalleries = (e) => {
        setSelectedGallery(e.target.value);
    };

    // Change the createImaging function to append an array of files
    const createImaging = async () => {
        const formData = new FormData();
        formData.append("GalleriesID", selectedGallery);

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
                Swal.fire({
                    icon: "success",
                    text: "Imaging created successfully!",
                });
                fetchImagings();
                // Reset form fields
                setSelectedGallery("");
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

    const deleteImaging = async (id) => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => result.isConfirmed);

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/imagings/${id}`);
            Swal.fire({
                icon: "success",
                text: "Imaging deleted successfully!",
            });
            fetchImagings();
        } catch (error) {
            console.error("Error deleting imaging:", error);
            Swal.fire({
                icon: "error",
                text: "Something went wrong while deleting imaging!",
            });
        }
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 mb-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                createImaging();
                            }}
                        >
                            <div className="m-4">
                                <InputLabel>Select Gallery:</InputLabel>
                                <input
                                    type="text"
                                    value={selectedGallery}
                                    hidden
                                />
                                <select
                                    value={selectedGallery}
                                    onChange={onChangeSelectedGalleries}
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="" disabled>
                                        Select Gallery
                                    </option>
                                    {galleries.map((gallery) => (
                                        <option
                                            key={gallery.id}
                                            value={gallery.id}
                                        >
                                            {gallery.Name}
                                        </option>
                                    ))}
                                </select>
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
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                        <table className="w-full shadow-sm text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Design Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Images
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {imagings && imagings.length > 0 ? (
                                    imagings.map((row) => (
                                        <tr
                                            class="odd:bg-white even:bg-gray-50 border-b"
                                            key={row.id}
                                        >
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {row.Name}
                                            </th>
                                            <td class="flex justify-start align-items-center gap-2 px-6 py-4">
                                                {row.Img.map((img) => (
                                                    <img
                                                        src={`storage/${img}`}
                                                        alt={img}
                                                        className="w-[150px] h-[150px] object-fit:cover"
                                                    />
                                                ))}
                                            </td>
                                            <td class="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    class="font-medium text-blue-600 hover:underline"
                                                    onClick={() =>
                                                        deleteImaging(
                                                            row.id
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
                        {/* <ul>
                            {imagings.map((imaging) => (
                                <li key={imaging.id} className="flex">
                                    {imaging.Img.map((img) => (
                                        <img
                                            src={`storage/${img}`}
                                            alt={img}
                                            className="w-[250px]"
                                        />
                                    ))}{" "}
                                    <button
                                        type="button"
                                        class="font-medium text-blue-600 hover:underline"
                                        onClick={() =>
                                            deleteImaging(imaging.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
