<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ArtisanProfile;
use App\Models\Service;

class ArtisanController extends Controller
{
    // Get current artisan's profile data
    public function getProfile(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'artisan') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = ArtisanProfile::where('user_id', $user->id)->first();
        $services = Service::where('user_id', $user->id)->get();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
            'services' => $services
        ]);
    }

    // Update profile details
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'artisan') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'profession' => 'required|string',
            'description' => 'nullable|string',
            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',
            'city' => 'required|string',
            'phone' => 'nullable|string',
            'available' => 'boolean'
        ]);

        // Update User table fields
        $user->update([
            'phone' => $validated['phone'] ?? $user->phone
        ]);

        // Update ArtisanProfile table fields
        $profile = ArtisanProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'profession' => $validated['profession'],
                'description' => $validated['description'],
                'min_price' => $validated['min_price'],
                'max_price' => $validated['max_price'],
                'city' => $validated['city'],
                'available' => $validated['available'] ?? true,
            ]
        );

        return response()->json(['message' => 'Profile updated successfully', 'profile' => $profile]);
    }

    // Add a new service
    public function addService(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'artisan') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $service = Service::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            // Image handling to be added later
        ]);

        return response()->json(['message' => 'Service added', 'service' => $service]);
    }

    // Public method to list all artisans
    public function index(Request $request) {
        $query = ArtisanProfile::with('user');

        if ($request->has('profession') && $request->profession != '') {
            $query->where('profession', $request->profession);
        }

        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })->orWhere('profession', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        }

        $artisans = $query->get();
        return response()->json($artisans);
    }
}
