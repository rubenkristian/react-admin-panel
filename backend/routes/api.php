<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;

Route::get('menus', [MenuController::class, 'index']);
Route::get('menus/{menu}', [MenuController::class, 'show']);
Route::post('menus', [MenuController::class, 'store']);
Route::put('menus/{menu}', [MenuController::class, 'update']);
Route::delete('menus/{menu}', [MenuController::class, 'destroy']);
Route::get('menu-by-url', [MenuController::class, 'url']);