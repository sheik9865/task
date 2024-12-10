<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'trainer_name',
        'start_date',
        'end_date',
        'time_slot',
    ];

    /**
     * Relationship with Course
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Relationship with Enrollment
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
