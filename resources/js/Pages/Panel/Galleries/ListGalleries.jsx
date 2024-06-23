import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const ITEMS_PER_PAGE = 10;

const MyPaginate = styled(ReactPaginate).attrs({
    activeClassName: "active",
})`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
    list-style-type: none;

    li a {
        border-radius: 4px;
        padding: 0.1rem 1rem;
        cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
        border-color: transparent;
    }
    li.active a {
        background-color: #0366d6;
        border-color: transparent;
        color: white;
        min-width: 32px;
    }
    li.disabled a {
        color: grey;
    }
    li.disable,
    li.disabled a {
        cursor: default;
    }
`;

export default function ListGalleries() {
    const [list, setList] = useState([]);
    const [isTags, setIsTag] = useState([]);
    const [selectedGallery, setSelectedGallery] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        Name: "",
        Date: "",
        DescriptionJp: "",
        DescriptionEn: "",
        DescriptionCh: "",
        WorksTitle: "",
        WorksContent: "",
        WorksCredit: "",
        WorksClient: "",
        TagsID: "",
    });
    const [currentPage, setCurrentPage] = useState(0);
    // const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        fetchGalleries();
        fetchTags();
    }, [currentPage]);

    const fetchGalleries = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/galleries`
            );
            const data = response;

            setList(data.data.galleries);
        } catch (error) {
            console.error("Error fetching galleries:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/tags");
            setIsTag(res.data);
        } catch (e) {
            console.error("Error fetching galleries:", e);
        }
    };

    const openUpdateModal = (id) => {
        const selected = list.find((gallery) => gallery.id === id);
        setSelectedGallery(selected);
        setUpdatedData({
            Name: selected.Name,
            Name: selected.Name,
            Date: selected.Date,
            DescriptionJp: selected.DescriptionJp,
            DescriptionEn: selected.DescriptionEn,
            DescriptionCh: selected.DescriptionCh,
            WorksTitle: selected.WorksTitle,
            WorksContent: selected.WorksContent,
            WorksCredit: selected.WorksCredit,
            WorksClient: selected.WorksClient,
            TagsID: selected.TagsID,
        });
        setIsModalOpen(true);
    };

    const closeUpdateModal = () => {
        setSelectedGallery(null);
        setUpdatedData({
            Name: "",
            Date: "",
            DescriptionJp: "",
            DescriptionEn: "",
            DescriptionCh: "",
            WorksTitle: "",
            WorksContent: "",
            WorksCredit: "",
            WorksClient: "",
            TagsID: "",
        });
        setIsModalOpen(false);
    };

    const updateGalleriesHandler = async () => {
        try {
            const { id } = selectedGallery;

            await axios.put(`http://localhost:8000/api/galleries/${id}`, {
                ...updatedData,
            });

            Swal.fire({
                icon: "success",
                text: "Gallery updated successfully!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            fetchGalleries();
            closeUpdateModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong while updating gallery!",
            });
        }
    };

    const deleteGalleriesHandler = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios
            .delete(`http://localhost:8000/api/galleries/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                fetchGalleries();
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: "error",
                });
            });
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
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
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

    // Add pagination logic to map only the items for the current page
    const displayedList = list.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <div className="bg-white overflow-hidden shadow-sm rounded p-4">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                Project List
            </h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full shadow-sm text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Design Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description Design (Japanese)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description Design (English)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description Design (Chinese)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tags
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Works Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Works Content
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Works Credit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Works Client
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Images
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.length > 0 ? (
                            displayedList.map((row) => (
                                <tr
                                    className="odd:bg-white even:bg-gray-50 border-b"
                                    key={row.id}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {row.Name}
                                    </th>
                                    <td className="px-6 py-4">{row.Date}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.DescriptionJp}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.DescriptionEn}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.DescriptionCh}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.ShortTags}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.WorksTitle}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.WorksContent}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.WorksCredit}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                            {row.WorksClient}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 max-w-[500px]">
                                        <div className="flex flex-row justify-start align-middle gap-2 overflow-x-auto">
                                            {row.Img !== null ? (
                                                row.Img.map((img, index) => (
                                                    <div>
                                                        <img
                                                            src={`storage/${img}`}
                                                            alt={img}
                                                            className="w-[125px] h-[125px] object-fill object-top max-w-none"
                                                            key={index}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                                                    No Images
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right flex gap-1">
                                        {row.Img !== null && (
                                            <button
                                                onClick={() =>
                                                    deleteImaging(
                                                        row.imagingsID
                                                    )
                                                }
                                                className="block bg-transparant p-[3px] text-red-500 transition hover:text-slate-100 hover:scale-110 hover:bg-red-500 hover:rounded-sm duration-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="icon icon-tabler icon-tabler-trash"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                    />
                                                    <path d="M4 7l16 0" />
                                                    <path d="M10 11l0 6" />
                                                    <path d="M14 11l0 6" />
                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="font-medium text-blue-600 hover:underline mr-2"
                                            onClick={() =>
                                                openUpdateModal(row.id)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="font-medium text-blue-600 hover:underline"
                                            onClick={() =>
                                                deleteGalleriesHandler(row.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation comments" className="mt-4">
                <MyPaginate
                    previousLabel={"< Previous"}
                    nextLabel={"Next >"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(list.length / ITEMS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(data) => setCurrentPage(data.selected)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </nav>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 max-w-[90vw] w-[100%] max-h-[85vh] overflow-auto">
                        <h2 className="text-lg font-semibold mb-4">
                            Update Gallery
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Design Name :
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={updatedData.Name}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        Name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Date:
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={updatedData.Date}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        Date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description Design (Japanese):
                            </label>
                            <textarea
                                value={updatedData.DescriptionJp}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        DescriptionJp: e.target.value,
                                    })
                                }
                                rows="4"
                                className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description Design (English):
                            </label>
                            <textarea
                                value={updatedData.DescriptionEn}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        DescriptionEn: e.target.value,
                                    })
                                }
                                rows="4"
                                className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description Design (Chinese):
                            </label>
                            <textarea
                                value={updatedData.DescriptionCh}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        DescriptionCh: e.target.value,
                                    })
                                }
                                rows="4"
                                className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tags:
                            </label>
                            <select
                                value={updatedData.TagsID}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        TagsID: e.target.value,
                                    })
                                }
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="" disabled>
                                    Select Tags
                                </option>
                                {isTags.map((t) => (
                                    <option value={t.id}>{t.TagsName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Works Title:
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={updatedData.WorksTitle}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        WorksTitle: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Works Content:
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={updatedData.WorksContent}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        WorksContent: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Works Credit:
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={updatedData.WorksCredit}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        WorksCredit: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Works Client:
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={updatedData.WorksClient}
                                onChange={(e) =>
                                    setUpdatedData({
                                        ...updatedData,
                                        WorksClient: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={updateGalleriesHandler}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={closeUpdateModal}
                                className="bg-gray-500 text-white p-2 rounded ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
