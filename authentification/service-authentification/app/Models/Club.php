<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Club extends Authenticatable
{
    use HasApiTokens,HasFactory,Notifiable,SoftDeletes;
    protected $appends = ['role'];
    public function getRoleAttribute(){
        return 'club';
    }
}
