<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;
    protected $fillable = [
        'video_id',
        'photo_name',
        'photo_path',
        'photo_url',
        'height',
        'width'
];
public function video(){
    return $this->belongsTo(Video::class);
}
}
