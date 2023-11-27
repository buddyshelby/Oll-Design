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
        // $imaging = Imaging::all();
        $imagings = DB::table('imagings')
            ->leftJoin('galleries', 'galleries.id', '=', 'imagings.GalleriesID')
            ->select('imagings.*', 'galleries.Name')
            ->get();

        // Decode the Img field from JSON string to array
        $imagings = $imagings->map(function ($item) {
            $item->Img = json_decode($item->Img, true);
            return $item;
        });

        return response()->json($imagings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'GalleriesID' => 'required|exists:galleries,id',
            'Img.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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

        // Delete each image from storage
        foreach ($imaging->Img as $imagePath) {
            Storage::disk('public')->delete($imagePath);
        }

        $imaging->delete();

        return response()->json(['message' => 'Imaging deleted successfully']);
    }
}
