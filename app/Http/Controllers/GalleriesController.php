<?php

namespace App\Http\Controllers;

use App\Models\Galleries;
use Illuminate\Http\Request;

class GalleriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = Galleries::select(
            'id',
            'Name',
            'Date',
            'DescriptionEn',
            'DescriptionJp',
            'DescriptionCh'
        )->orderBy('Date', 'desc')->get(); //->paginate(5);

        return response()->json($galleries);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('galleries.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required|string|max:255',
            'Date' => 'required|date',
            'DescriptionJp' => 'required|string',
            'DescriptionEn' => 'required|string',
            'DescriptionCh' => 'required|string',
            'UpdateByUser' => 'string',
        ]);

        try {
            Galleries::create([
                'Name' => $request->input('Name'),
                'Date' => $request->input('Date'),
                'DescriptionJp' => $request->input('DescriptionJp'),
                'DescriptionEn' => $request->input('DescriptionEn'),
                'DescriptionCh' => $request->input('DescriptionCh'),
                'UpdateByUser' => $request->input('UpdateByUser'),
            ]);

            return response()->json([
                'message' => 'Gallery created successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            \Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'Something went wrong while creating gallery!',
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\galleries  $galleries
     * @return \Illuminate\Http\Response
     */
    public function show(galleries $galleries)
    {
        return response()->json([
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\galleries  $galleries
     * @return \Illuminate\Http\Response
     */
    public function edit(galleries $galleries)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\galleries  $galleries
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $gallery = Galleries::find($id);

            if (!$gallery) {
                return response()->json([
                    'message' => 'Gallery not found!'
                ], 404);
            }

            $request->validate([
                'Name' => 'required|string|max:255',
                'Date' => 'required|date',
                'DescriptionJp' => 'required|string',
                'DescriptionEn' => 'required|string',
                'DescriptionCh' => 'required|string',
                'UpdateByUser' => 'string',
            ]);

            $gallery->update([
                'Name' => $request->input('Name'),
                'Date' => $request->input('Date'),
                'DescriptionJp' => $request->input('DescriptionJp'),
                'DescriptionEn' => $request->input('DescriptionEn'),
                'DescriptionCh' => $request->input('DescriptionCh'),
                'UpdateByUser' => $request->input('UpdateByUser'),
            ]);

            return response()->json([
                'message' => 'Gallery updated successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while updating gallery!',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Galleries  $galleries
     * @return \Illuminate\Http\Response
     */
    //public function destroy(Galleries $galleries)
    public function destroy($id)
    {
        try {
            $gallery = Galleries::find($id);

            if (!$gallery) {
                return response()->json([
                    'message' => 'Gallery not found!'
                ], 404);
            }

            $gallery->delete();

            return response()->json([
                'message' => 'Product Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a product!!'
            ]);
        }
    }
}