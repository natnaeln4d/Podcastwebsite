<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(Request $request){

 try{
    $uservalidator=Validator::make($request->all(),[
        'fname' => ['required', 'string', 'max:255'],
        'lname' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required'],
    ]);
    if($uservalidator->fails()){
        return response()->json([
            "status"=>false,
            "message"=>"valitor error",
            "error"=>$uservalidator->errors()
        ],404);
    }
    $user=User::create(
        [
            'fname'=>$request->fname,
            'lname'=>$request->lname,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)

        ]
        );
        $token = $user->createToken('user_token')->plainTextToken;

    return response()->json([
        'status'=>"success",
         'user'=>$user,
         'token'=>$token

       ],200);
 }    catch(\Exception $exception){
     return response()->json([
         "status"=>true,
         "message"=>$exception->getMessage()
     ],500);
 }
    }
    public function login(Request $request){
        try{

          $loginvaliditor=$request->validate([
              'email' => 'required',
              'password' => 'required'
        ]);

        if(!$loginvaliditor){
            return response()->json([
                "status"=> "fail",
                "message"=>"valitor error"

            ],404);

      }
        $user = User::where(['email'=> $request->email])->first();

      if(!$user){

            return response()->json([
                "status" => "fail",
                "message" => "no user in is email"
            ],404);
      }
        if(!Hash::check($request->password, $user->password)){
            return response()->json([
                "status" => "fail",
                "message" => "Wrong credentials"
            ]);
         }


         $token = $user->createToken('user_token')->plainTextToken;
         return response()->json([
                     "status" => "success",
                     "token" => $token,
                     "user" => $user->id
         ],200);
        }catch(\Exception $E){
          return response()->json([
              "status"=>"fail",
              "message"=>$E->getMessage()
          ],500);

        }
          }
          public function getAllViewer(){

            try {
                $users = User::where(['role'=>'subscriber'])->get();


                return response()->json([
                    'status' => 'success',
                    'data' => $users
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'fail',
                    'msg' => $e->getMessage()
                ], 500);
            }
          }
}
