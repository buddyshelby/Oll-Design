<?php

namespace App\Http\Controllers;

use App\Models\Galleries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = DB::table('galleries')
            ->leftJoin('tags', 'tags.id', '=', 'galleries.TagsID')
            ->leftJoin('imagings', 'imagings.GalleriesID', '=', 'galleries.id')
            ->select('galleries.id', 'galleries.Name', 'galleries.City_Name', 'galleries.Date', 'galleries.DescriptionEn', 'galleries.DescriptionJp', 'galleries.DescriptionCh', 'galleries.WorksTitle', 'galleries.WorksContent', 'galleries.WorksCredit', 'galleries.WorksClient', 'galleries.TagsID', 'tags.ShortTags', 'imagings.Img', 'imagings.id AS imagingsID', 'galleries.created_at')
            ->orderBy('galleries.Date', 'desc')
            ->orderBy('galleries.created_at', 'desc')
            ->get();

        $galleries = $galleries->map(function ($item) {
            $item->Img = json_decode($item->Img, true);
            return $item;
        });

        $tags = DB::table('tags')->select('tags.*')->orderBy('created_at', 'desc')->get();

        $res = [
            'galleries' => $galleries,
            'tags' => $tags
        ];

        return response()->json($res);
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
            'Name' => 'required|string',
            'City_Name' => 'required|string',
            'Date' => 'required|date',
            'DescriptionJp' => 'required|string',
            'DescriptionEn' => 'required|string',
            'DescriptionCh' => 'required|string',
            'UpdateByUser' => 'string',
            'WorksTitle' => 'required|string',
            'WorksContent' => 'required|string',
            'WorksCredit' => 'required|string',
            'WorksClient' => 'required|string',
            'TagsID' => 'required|string',
        ]);

        try {
            Galleries::create([
                'Name' => $request->input('Name'),
                'City_Name' => $request->input('City_Name'),
                'Date' => $request->input('Date'),
                'DescriptionJp' => $request->input('DescriptionJp'),
                'DescriptionEn' => $request->input('DescriptionEn'),
                'DescriptionCh' => $request->input('DescriptionCh'),
                'UpdateByUser' => $request->input('UpdateByUser'),
                'WorksTitle' => $request->input('WorksTitle'),
                'WorksContent' => $request->input('WorksContent'),
                'WorksCredit' => $request->input('WorksCredit'),
                'WorksClient' => $request->input('WorksClient'),
                'TagsID' => $request->input('TagsID'),
            ]);

            return response()->json([
                'message' => 'Gallery created successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            \Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'aSomething went wrong while creating gallery!',
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
                'Name' => 'required|string',
                'Date' => 'required|date',
                'DescriptionJp' => 'required|string',
                'DescriptionEn' => 'required|string',
                'DescriptionCh' => 'required|string',
                'UpdateByUser' => 'string',
                'WorksTitle' => 'required|string',
                'WorksContent' => 'required|string',
                'WorksCredit' => 'required|string',
                'WorksClient' => 'required|string',
                'TagsID' => 'required|string',
            ]);

            $gallery->update([
                'Name' => $request->input('Name'),
                'Date' => $request->input('Date'),
                'DescriptionJp' => $request->input('DescriptionJp'),
                'DescriptionEn' => $request->input('DescriptionEn'),
                'DescriptionCh' => $request->input('DescriptionCh'),
                'UpdateByUser' => $request->input('UpdateByUser'),
                'WorksTitle' => $request->input('WorksTitle'),
                'WorksContent' => $request->input('WorksContent'),
                'WorksCredit' => $request->input('WorksCredit'),
                'WorksClient' => $request->input('WorksClient'),
                'TagsID' => $request->input('TagsID'),
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
                'message' => 'Gallery Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a gallery!!'
            ]);
        }
    }
}
