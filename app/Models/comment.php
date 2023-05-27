<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'text',
        'podcast_id'
    ];
    public function podcast(){
        return $this->belongsTo(podcast::class);
    }

}
