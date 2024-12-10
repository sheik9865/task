<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    /**
     * Opt-in to a Training Schedule
     */
    public function optIn(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|exists:training_schedules,id',
        ]);

        try {
            $studentId = Auth::user()->id;

            // Check if already enrolled
            $alreadyEnrolled = Enrollment::where('student_id', $studentId)
                ->where('schedule_id', $request->schedule_id)
                ->first();

            if ($alreadyEnrolled) {
                return response()->json(['message' => 'You are already enrolled in this schedule.'], 400);
            }

            // Create enrollment
            $enrollment = Enrollment::create([
                'student_id' => $studentId,
                'schedule_id' => $request->schedule_id,
                'status' => 'opt-in',
            ]);

            return response()->json(['message' => 'Successfully enrolled!', 'data' => $enrollment], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Enrollment failed.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Opt-out of a Training Schedule
     */
    public function optOut(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|exists:training_schedules,id',
        ]);

        try {
            $studentId = Auth::user()->id;

            // Find the enrollment record
            $enrollment = Enrollment::where('student_id', $studentId)
                ->where('schedule_id', $request->schedule_id)
                ->first();

            if (!$enrollment) {
                return response()->json(['message' => 'No enrollment found for this schedule.'], 404);
            }

            // Update the status to 'opt-out'
            $enrollment->status = 'opt-out';
            $enrollment->save();

            return response()->json(['message' => 'Successfully opted out of the schedule.', 'data' => $enrollment], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Opt-out failed.', 'error' => $e->getMessage()], 500);
        }
    }
}
