<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'text',
        'podcast_id',
        'video_id'
    ];
    public function podcast(){
        return $this->belongsTo(podcast::class);
    }
 public function video(){
    return $this->belongsTo(Video::class);
 }
 public function user(){
    return $this->belongsTo(User::class);
 }
}
