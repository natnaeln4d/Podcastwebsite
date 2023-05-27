<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    use HasFactory;

    protected $fillable = [
        'audio_name',
        'audio_path',
        'audio_url',
        'audio_height',
        'audio_width'
];
public function podcast(){
    return $this->belongsTo(podcast::class);
}
public function comment(){
    return $this->hasMany(comment::class);
}
}
