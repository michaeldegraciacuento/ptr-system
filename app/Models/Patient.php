<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $fillable = [
        'record_id',
        'patients',
        'patient_age',
        'patient_sex',
        'intervention',
        'management',
        'remarks',
        'patient_contact',
        'patient_guardian',
        'patient_guardian_contact',
        'patient_address'
    ];
}
