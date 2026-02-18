<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtisanProfile extends Model
{
    protected $fillable = [
        'user_id',
        'profession',
        'description',
        'min_price',
        'max_price',
        'city',
        'available',
        'rating',
        'reviews_count',
    ];
}
