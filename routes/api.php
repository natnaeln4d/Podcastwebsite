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
Route::post('/commentVideo', [ViewerController::class, 'videoComment']);
Route::post('/contactus',[ViewerController::class,'postContactus']);
Route::post('/forgot-password',[AuthController::class, 'submitForgetPasswordForm']);
Route::post('/reset-password',[AuthController::class, 'submitResetPasswordForm']);
Route::post('/pinverify',[AuthController::class, 'pinVerify']);
Route::patch('/subscribe/{id}',[ViewerController::class,'updateUserStatus']);
Route::get('/getAll',[PodcastController::class,'getAllPodcasts']);
Route::get('/getAllvideo',[PodcastController::class,'getAllVideo']);
Route::get('/getComments/{id}', [ViewerController::class, 'getComments']);
Route::get('/videoComments/{id}', [ViewerController::class, 'videoComments']);
Route::delete('/deleteCommentbyUser/{id}', [ViewerController::class, 'deleteCommentbyUser']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getViewer', [AuthController::class,'getAllViewer']);
    Route::post('/addpodcast',[PodcastController::class,'addpodcast']);
    Route::post('/addvideopodcast',[PodcastController::class,'postVideo']);
    Route::patch('/update/{id}', [PodcastController::class, 'updatePodcast']);
    Route::get('/getPodcastById/{id}', [PodcastController::class, 'getPodcastById']);
    Route::delete('/deletePodcast/{id}', [PodcastController::class, 'deletePodcast']);
    Route::delete('/deleteVideo/{id}', [PodcastController::class, 'deleteVideo']);
    Route::delete('/deleteUser/{id}', [ViewerController::class, 'deleteViewer']);
    Route::delete('/deleteComment/{id}', [ViewerController::class, 'deleteComment']);
    Route::get('/allcomments',[ViewerController::class,'getAllComments']);
    Route::get('/getContactus',[ViewerController::class,'getContactus']);
});
