<?php

namespace App\Http\Controllers;

use App\Models\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tags::select(
            'id',
            'TagsName',
            'ShortTags',
            'TagsNameJp',
            'TagsNameCh',
        )->orderBy('id', 'desc')->get();

        return response()->json($tags);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'TagsName' => 'required|string',
            'ShortTags' => 'string',
            'TagsNameJp' => 'required|string',
            'TagsNameCh' => 'required|string',
        ]);

        try {
            Tags::create([
                'TagsName' => $request->input('TagsName'),
                'ShortTags' => $request->input('ShortTags'),
                'TagsNameJp' => $request->input('TagsNameJp'),
                'TagsNameCh' => $request->input('TagsNameCh'),
            ]);

            return response()->json([
                'message' => 'Tags successfully created!',
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            \Log::error($e->getTraceAsString());

            return response()->json([
                'message' => 'Something went wrong while creating tags!',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function show(Tags $tags)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function edit(Tags $tags)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tags $tags, $id)
    {
        try {
            $tags = Tags::find($id);

            if (!$tags) {
                return response()->json([
                    'message' => 'Tags not found!'
                ], 404);
            }

            $request->validate([
                'TagsName' => 'required|string',
                'ShortTags' => 'string',
                'TagsNameJp' => 'required|string',
                'TagsNameCh' => 'required|string',
            ]);

            $tags->update([
                'TagsName' => $request->input('TagsName'),
                'ShortTags' => $request->input('ShortTags'),
                'TagsNameJp' => $request->input('TagsNameJp'),
                'TagsNameCh' => $request->input('TagsNameCh'),
            ]);

            return response()->json([
                'message' => 'Tags updated successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while updating tags!',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $tags = Tags::find($id);

            if (!$tags) {
                return response()->json([
                    'message' => 'Tags not found!'
                ], 404);
            }

            $tags->delete();

            return response()->json([
                'message' => 'Tags Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a tags!!'
            ]);
        }
    }
}
