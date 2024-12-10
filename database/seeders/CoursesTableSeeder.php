<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            ['name' => 'Web Development', 'description' => 'Learn Laravel, React, and Vite', 'duration' => 6, 'fee' => 5000.00],
            ['name' => 'Data Science', 'description' => 'Python, Pandas, Machine Learning', 'duration' => 4, 'fee' => 4500.00],
            ['name' => 'Digital Marketing', 'description' => 'SEO, Content Marketing, Analytics', 'duration' => 3, 'fee' => 3000.00],
            ['name' => 'UI/UX Design', 'description' => 'Wireframing, Prototyping, Tools', 'duration' => 5, 'fee' => 4000.00],
            ['name' => 'AI and Machine Learning', 'description' => 'TensorFlow, Scikit-learn, NLP', 'duration' => 8, 'fee' => 6000.00],
        ];

        foreach ($courses as $course) {
            DB::table('courses')->insert([
                'name' => $course['name'],
                'description' => $course['description'],
                'duration' => $course['duration'],
                'fee' => $course['fee'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
