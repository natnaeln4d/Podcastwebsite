<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'description',
    ];
    public function photo(){
        return $this->hasOne(Photo::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
