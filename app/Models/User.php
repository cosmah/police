<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'name', 'email', 'password', 'station_id', 'role',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
