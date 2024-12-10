<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run()
    {
        // Sample regular users
        User::create([
            'name' => 'Alice Johnson',
            'email' => 'alice@example.com',
            'password' => bcrypt('password123'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Bob Marley',
            'email' => 'bob@example.com',
            'password' => bcrypt('secret'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Charlie Brown',
            'email' => 'charlie@example.com',
            'password' => bcrypt('qwerty'),
            'remember_token' => Str::random(10),
        ]);
    }

}
