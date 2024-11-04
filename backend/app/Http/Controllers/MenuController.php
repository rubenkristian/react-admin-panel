<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::whereNull('parent_id')->with(['childrens'])->get();

        return response()->json([
            'status' => 200,
            'data' => $menus,
        ], 200);
    }

    public function show(Menu $menu)
    {
        $menu->load('childrens');

        return response()->json([
            'status' => 200,
            'data' => $menu
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $depth = 0;
        if ($request->parent_id) {
            $parentMenu = Menu::find($request->parent_id);
            $depth = $parentMenu->depth + 1;
        }

        $menu = Menu::create([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'],
            'depth' => $depth,
        ]);

        return response()->json([
            'status' => 201,
            'data' => $menu
        ], 201);
    }

    public function update(Request $request, Menu $menu)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|exists:menus,id',
        ]);

        $depth = 0;
        if ($request->parent_id) {
            $parentMenu = Menu::find($request->parent_id);
            $depth = $parentMenu->depth + 1;
        }

        $menu->update([
            'name' => $data['name'],
            'parent_id' => $data['parent_id'],
            'depth' => $depth,
        ]);

        return response()->json([
            'status' => 201,
            'data' => $menu
        ], 201);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return response()->json(['message' => 'Menu deleted']);
    }

    public function url(Request $request)
    {
        $request->validate([
            'slug' => 'required|string'
        ]);

        $menu = Menu::where('slug', $request->slug)->first();

        return response()->json([
            'status' => 200,
            'data' => $menu
        ], 200);
    }
}
