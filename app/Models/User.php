<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use  HasFactory, Notifiable;
    protected $fillable = [
        'name', 'email', 'password', 'station_id', 'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The default attributes for the model.
     */
    protected $attributes = [
        'role' => 'officer', // Default role is officer
    ];

    /**
     * Check if user is a super admin.
     */
    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is an officer.
     */
    public function isOfficer()
    {
        return $this->role === 'officer';
    }

    /**
     * Check if user has at least admin privileges.
     */
    public function hasAdminAccess()
    {
        return in_array($this->role, ['super_admin', 'admin']);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
