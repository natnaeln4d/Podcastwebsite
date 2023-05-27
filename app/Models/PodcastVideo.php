<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PodcastVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'video_path',
    ];

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
