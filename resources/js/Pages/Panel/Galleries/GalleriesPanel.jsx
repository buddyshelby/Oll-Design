import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import React from "react";

const GalleriesPanel = () => {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
            <div className="m-4">
                <InputLabel>Design Name :</InputLabel>
                <TextInput className="w-100 mt-2" isFocused={true} />
            </div>
            <div className="m-4">
                <InputLabel>Date :</InputLabel>
                <input type="date" name="dateGalleries" id="dateGalleries" />
            </div>
            <div className="m-4">
                <InputLabel>Description Design (Japanese) :</InputLabel>
                <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    placeholder="Write your descript here..."
                ></textarea>
            </div>
            <div className="m-4">
                <InputLabel>Description Design (English) :</InputLabel>
                <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    placeholder="Write your descript here..."
                ></textarea>
            </div>
            <div className="m-4">
                <InputLabel>Description Design (Chinese) :</InputLabel>
                <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    placeholder="Write your descript here..."
                ></textarea>
            </div>
        </div>
    );
};

export default GalleriesPanel;
