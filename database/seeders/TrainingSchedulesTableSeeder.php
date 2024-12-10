<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrainingSchedulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = [
            ['course_id' => 1, 'trainer_name' => 'John Doe', 'start_date' => '2024-10-01', 'end_date' => '2024-10-15', 'time_slot' => '9:00 AM - 11:00 AM'],
            ['course_id' => 2, 'trainer_name' => 'Jane Smith', 'start_date' => '2024-10-05', 'end_date' => '2024-10-20', 'time_slot' => '11:00 AM - 1:00 PM'],
            ['course_id' => 3, 'trainer_name' => 'Mike Johnson', 'start_date' => '2024-11-01', 'end_date' => '2024-11-15', 'time_slot' => '2:00 PM - 4:00 PM'],
            ['course_id' => 4, 'trainer_name' => 'Sarah Connor', 'start_date' => '2024-10-10', 'end_date' => '2024-10-30', 'time_slot' => 'Online'],
            ['course_id' => 5, 'trainer_name' => 'Alice Brown', 'start_date' => '2024-09-20', 'end_date' => '2024-10-05', 'time_slot' => '3:00 PM - 5:00 PM'],
        ];

        foreach ($schedules as $schedule) {
            DB::table('training_schedules')->insert([
                'course_id' => $schedule['course_id'],
                'trainer_name' => $schedule['trainer_name'],
                'start_date' => $schedule['start_date'],
                'end_date' => $schedule['end_date'],
                'time_slot' => $schedule['time_slot'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
