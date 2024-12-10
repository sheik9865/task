<?php

namespace App\Http\Controllers;

use App\Models\TrainingSchedule;
use Illuminate\Http\Request;

class TrainingScheduleController extends Controller
{
    /**
     * Display a listing of training schedules.
     */
    public function index()
    {
        $schedules = TrainingSchedule::with('course')->get(); // Include course details
        return response()->json($schedules, 200);
    }

    /**
     * Store a newly created training schedule.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'trainer_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'time_slot' => 'required|string|max:255',
        ]);

        $schedule = TrainingSchedule::create($validated);
        return response()->json($schedule, 201);
    }

    /**
     * Display the specified training schedule.
     */
    public function show($id)
    {
        $schedule = TrainingSchedule::with('course')->find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Training Schedule not found'], 404);
        }

        return response()->json($schedule, 200);
    }

    /**
     * Update the specified training schedule.
     */
    public function update(Request $request, $id)
    {
        $schedule = TrainingSchedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Training Schedule not found'], 404);
        }

        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'trainer_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'time_slot' => 'required|string|max:255',
        ]);

        $schedule->update($validated);
        return response()->json($schedule, 200);
    }

    /**
     * Remove the specified training schedule.
     */
    public function destroy($id)
    {
        $schedule = TrainingSchedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Training Schedule not found'], 404);
        }

        $schedule->delete();
        return response()->json(['message' => 'Training Schedule deleted successfully'], 200);
    }
}
