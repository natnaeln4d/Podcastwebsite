<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use \App\Models\Podcast;
use App\Models\PodcastVideo;
use Illuminate\Support\Facades\Storage;
use App\File;
use App\Models\Video;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;


class PodcastController extends Controller
{
    public function addpodcast(Request $request)
{
    try {
        $podcastValidator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'integer', function ($attribute, $value, $fail) {
                $user = Auth::user();

                if ($user->role !== 'admin') {
                    $fail('The '.$attribute.' must be set by an admin user.');
                }
            }],
            'audio' => 'nullable|file|mimes:audio/mpeg,mpga,mp3,wav,aac',
            'video' => 'nullable|file'
        ]);


        if ($podcastValidator->fails()) {
            return response()->json([
                'status' => 'fail',
                'msg' => $podcastValidator->errors()
            ], 400);
        }

        $podcast = Podcast::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description
        ]);
        if ($request->hasFile('audio')) {
            $audioFile = $request->file('audio');
            $audioUniqueName = uniqid();
            $audioExtension = $audioFile->getClientOriginalExtension();
            $audioFilename = Carbon::now()->format('Ymd') . '_' . $audioUniqueName . '.' . $audioExtension;
            $audioPath = $audioFile->storeAs('public/upload/files/audio/', $audioFilename);
            $audioUrl = Storage::url('upload/files/audio/' . $audioFilename);

            $podcast->audio_path = $audioPath;
            $podcast->audio_url = $audioUrl;
        }
        $podcast->save();

        return response()->json([
            'status' => 'success',
            'msg' => 'Podcast added successfully',
            'data'=>$podcast
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}

public function getAllPodcasts()
{
    try {
        $podcasts = Podcast::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $podcasts
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}
public function getAllVideo()
{
    try {
        $podcasts = Video::orderBy('created_at', 'desc')->get();




        return response()->json([
            'status' => 'success',
            'data' => $podcasts
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}

public function getPodcastById($id)
{
    try {
        $podcast = Podcast::find($id);

        if (!$podcast) {
            return response()->json([
                'status' => 'fail',
                'msg' => 'Podcast not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $podcast
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}
public function updatePodcast(Request $request, $id)
{
    try {
        $podcast = Podcast::find($id);

        if (!$podcast) {
            return response()->json([
                'status' => 'fail',
                'msg' => 'Podcast not found'
            ], 404);
        }

        $podcast->title = $request->title;
        $podcast->description = $request->description;


        $podcast->save();

        return response()->json([
            'status' => 'success',
            'msg' => 'Podcast updated successfully',
            'data' => $podcast
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}

public function deletePodcast($id)
{
    try {
        $podcast = Podcast::find($id);

        if (!$podcast) {
            return response()->json([
                'status' => 'fail',
                'msg' => 'Podcast not found'
            ], 404);
        }

        $podcast->delete();

        return response()->json([
            'status' => 'success',
            'msg' => 'Podcast deleted successfully'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}

public function postVideo(Request $request)
{
    try {
        $podcastvalidator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'integer', function ($attribute, $value, $fail) {
                $user = Auth::user();

                if ($user->role !== 'admin') {
                    $fail('The '.$attribute.' must be set by an admin user.');
                }
            }],
            'video' => 'nullable|file'
        ]);

        if ($podcastvalidator->fails()) {
            return response()->json([
                'status' => 'fail',
                'msg' => $podcastvalidator->errors()
            ], 400);
        }

        $podcast = Video::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description
        ]);

        if ($request->hasFile('video')) {

            $videoFile = $request->file('video');
            $videoUniqueName = uniqid();
            $videoExtension = $videoFile->getClientOriginalExtension();
            $videoFilename = Carbon::now()->format('Ymd') . '_' . $videoUniqueName . '.' . $videoExtension;
            $videoPath = $videoFile->storeAs('public/upload/files/video/', $videoFilename);
            $videoUrl = Storage::url('upload/files/video/' . $videoFilename);

            $podcast->video_path = $videoPath;
            $podcast->video_url = $videoUrl;
        }

        if ($request->hasFile('photo')) {

            $photoFile = $request->file('photo');
            $extension = $photoFile->extension();
            $name = "podcast";

            $filename = $name . "-" . time() . "." . $extension;
            $path = $photoFile->storeAs('public/upload/files/image/', $filename);
            $photo_url = Storage::url('upload/files/image/' . $filename);

            $data = $this->getDimension($path);
            $width = $data['width'];
            $height = $data['height'];
            $podcast->photo_name=$filename;
            $podcast->photo_path=$path;
            $podcast->photo_url=$photo_url;
            $podcast->height=$height;
            $podcast->width=$width;

        }

        $podcast->save();

        return response()->json([
            'status' => 'success',
            'msg' => 'Podcast added successfully',
            'data' => $podcast
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'fail',
            'msg' => $e->getMessage()
        ], 500);
    }
}

public static function getDimension($path)
{
    $filePath = Storage::path($path);
    [$width, $height] = getimagesize($filePath);

    $data = [
        "width" => $width,
        "height" => $height
    ];
    return $data;
}

}
