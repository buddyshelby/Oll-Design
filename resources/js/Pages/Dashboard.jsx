import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import CreateGalleries from "./Panel/Galleries/CreateGalleries";
import ListGalleries from "./Panel/Galleries/ListGalleries";

export default function Dashboard(props) {
    const [isCollapse, setIscollapse] = useState(true);

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
                                    <strong>+</strong> Add Design
                                </button>
                            )}
                        </div>
                    </div>
                    {!isCollapse && <CreateGalleries />}
                    <ListGalleries />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
