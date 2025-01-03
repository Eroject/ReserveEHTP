<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable ;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        'address',
        'email',
        'password',
        'updated_at'

      ];
      protected $hidden = [
        'password',
        'email_verified_at',
        'remember_token',
        'created_at',
      ];
      protected $casts = [
        'date_of_birth' => 'date:Y-m-d',
      ];
      protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'client';
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

}
