<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Galleries extends Model
{
    use HasFactory;

    protected $fillable = [
        'Name',
        'Date',
        'DescriptionJp',
        'DescriptionEn',
        'DescriptionCh',
        'UpdateByUser'
    ];
}