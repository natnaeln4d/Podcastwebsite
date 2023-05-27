<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\ContactUs;
use App\Models\Podcast;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ViewerController extends Controller
{
    public function postComment(Request $request)
    {

        $validatedData = $request->validate([
            'podcast_id' => 'required|exists:podcasts,id',
            'text' => 'required|string|max:255',
        ]);


        $comment = new Comment();
        $comment->text = $validatedData['text'];


        $podcast = Podcast::findOrFail($validatedData['podcast_id']);
        $comment->podcast()->associate($podcast);


        $comment->save();

        return response()->json([
            'status' => 'success',
            'msg' => 'Comment posted successfully',
        ], 200);
    }
    public function getAllComments()
    {
        $comments = Comment::all();

        return response()->json([
            'status' => 'success',
            'data' => $comments,
        ], 200);
    }
    public function postContactus(Request $request){
        try{
            $message = Validator::make($request->all(), [
                'fullName' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:contactUss'],
                'message' => ['required', 'string', 'max:255'],

            ]);
            if(!$message){

                    return response()->json([
                        "status"=>false,
                        "message"=>"valitor error",
                        "error"=>$message->errors()
                    ],404);

            }
            $contactmsg=ContactUs::create($request->all());
            return response()->json([
                'status' => 'success',
                'data' => $contactmsg
            ], 200);

        }
        catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'msg' => $e->getMessage()
            ], 500);
        }
    }
    public function getContactus(){
        try{
            $contactmsg=ContactUs::all();
            return response()->json([
                'status' => 'success',
                'data' => $contactmsg
            ], 200);

        }
        catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'msg' => $e->getMessage()
            ], 500);
        }
    }
    public function deleteViewer($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status' => 'fail',
                    'msg' => 'User not found'
                ], 404);
            }

            $user->delete();

            return response()->json([
                'status' => 'success',
                'msg' => 'User deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'msg' => $e->getMessage()
            ], 500);
        }
    }

}
