<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/sales', [SaleController::class, 'index']);
Route::post('/sales', [SaleController::class, 'store']);
Route::get('/sales/{sale}', [SaleController::class, 'show']);
Route::put('/sales/{sale}', [SaleController::class, 'update']);
Route::delete('/sales/{sale}', [SaleController::class, 'destroy']);

Route::view('/{any}', 'index')->where('any', '.*');
