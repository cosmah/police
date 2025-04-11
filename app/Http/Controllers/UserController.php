<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Station;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Import the trait

class UserController extends Controller
{
    use AuthorizesRequests; // Include the trait to enable `authorize` method

    public function index()
    {
        // Apply policy here
        $this->authorize('accessAdmin', User::class);

        $users = User::with('station')->get();
        $stations = Station::all();

        return Inertia::render('superadmin/Users/Index', [
            'users' => $users,
            'stations' => $stations,
        ]);
    }

    public function create()
    {
       // $this->authorize('accessAdmin', User::class); // Apply policy

        $stations = Station::all();
        return Inertia::render('superadmin/Users/Create', ['stations' => $stations]);
    }

    public function store(Request $request)
    {
        //$this->authorize('accessAdmin', User::class); // Apply policy

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:super_admin,admin,officer',
            'station_id' => 'nullable|exists:stations,id',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'station_id' => $request->station_id,
        ]);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        //$this->authorize('accessAdmin', User::class); // Apply policy

        $stations = Station::all();
        return Inertia::render('superadmin/Users/Edit', ['user' => $user, 'stations' => $stations]);
    }

    public function update(Request $request, User $user)
    {
        //$this->authorize('accessAdmin', User::class); // Apply policy

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:super_admin,admin,officer',
            'station_id' => 'nullable|exists:stations,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'station_id' => $request->station_id,
        ]);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
       // $this->authorize('accessAdmin', User::class); // Apply policy

        $user->delete();
        return redirect()->route('users.index');
    }
}
