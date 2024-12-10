<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'duration',
        'fee',
    ];

    /**
     * Relationship with TrainingSchedule
     */
    public function schedules()
    {
        return $this->hasMany(TrainingSchedule::class);
    }
}
