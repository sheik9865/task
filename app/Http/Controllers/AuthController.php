<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json([
                'status' => 'Success',
                'token' => $token,
                'role' => base64_encode($user->role)
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
