<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\ViewerController;
use Illuminate\Routing\ViewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/comments', [ViewerController::class, 'postComment']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getViewer', [AuthController::class,'getAllViewer']);
    Route::post('/addpodcast',[PodcastController::class,'addpodcast']);
    Route::get('/getAll',[PodcastController::class,'getAllPodcasts']);
    Route::patch('/update/{id}', [PodcastController::class, 'updatePodcast']);
    Route::get('/getPodcastById/{id}', [PodcastController::class, 'getPodcastById']);
    Route::delete('/deletePodcast/{id}', [PodcastController::class, 'deletePodcast']);
    Route::delete('/deleteUser/{id}', [ViewerController::class, 'deleteViewer']);
    Route::get('/allcomments',[ViewerController::class,'getAllComments']);
});
