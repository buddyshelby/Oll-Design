<?php

namespace App\Models;

use App\Models\Galleries as Gallery;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imaging extends Model
{
    use HasFactory;

    protected $fillable = [
        'GalleriesID',
        'Img',
    ];

    protected $casts = [
        'Img' => 'array',
    ];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }
}
