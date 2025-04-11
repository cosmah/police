<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'title', 'description', 'file_path', 'category', 'station_id', 'user_id',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
