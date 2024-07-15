<?php

namespace App\Http\Controllers;

use App\Models\Imaging;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ImagingController extends Controller
{
    public function index()
    {
        $imagings = DB::table('imagings')
            ->leftJoin('galleries', 'galleries.id', '=', 'imagings.GalleriesID')
            ->select('imagings.*', 'galleries.Name')
            ->get();

        // Decode the Img field from JSON string to array
        $imagings = $imagings->map(function ($item) {
            $item->Img = json_decode($item->Img, true);
            return $item;
        });

        $getListGallery = DB::Table('imagings')
            ->leftJoin('galleries', 'galleries.id', '=', 'imagings.GalleriesID')
            ->leftJoin('tags', 'tags.id', '=', 'galleries.TagsID')
            ->select('galleries.*', 'imagings.Img', 'tags.ShortTags')
            ->orderBy('created_at', 'desc')
            ->get();

        $getListGallery = $getListGallery->map(function ($item) {
            $item->Img = json_decode($item->Img, true);
            return $item;
        });

        $responseData = [
            'imagings' => $imagings,
            'galleryList' => $getListGallery
        ];
        
        return response()->json($responseData);
    }

    public function store(Request $request)
    {
        $request->validate([
            'GalleriesID' => 'required|exists:galleries,id',
            'Img.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:100240',
        ]);

        $imagePaths = [];

        foreach ($request->file('Img') as $image) {
            $imagePaths[] = $image->store('images', 'public');
        }

        $imaging = Imaging::create([
            'GalleriesID' => $request->GalleriesID,
            'Img' => $imagePaths,
        ]);

        return response()->json($imaging, 201);
    }

    public function destroy($id)
    {
        $imaging = Imaging::findOrFail($id);

        $imagePaths = [];

        // Delete each image from storage
        foreach ($imaging->Img as $imagePath) {
            Storage::disk('public')->delete($imagePath);
            $imagePaths[] = $imagePath;
        }

        $imaging->delete();

        return response()->json(['message' => 'Imaging '. $imagePaths . ' deleted successfully']);
    }
}
