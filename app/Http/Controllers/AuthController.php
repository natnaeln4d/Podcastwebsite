<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;


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
                     "user" => $user
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
          public function submitForgetPasswordForm(Request $request)
    {
        try{
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $token = mt_rand(0000,9999);
        $HasOne=DB::table('password_resets')
        ->where([
          'email' => $request->email,
        ])->first();
   if(!$HasOne){
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
          ]);
          $data = [
            "pin" => $token
        ];
        Mail::to($request->email)->send(new ResetPassword($data));


        return response()->json([
            'status' => 'ok'

    ]);
}
else{
    DB::table('password_resets')->where([
        'email'=> $request->email
        ])
        ->update([
            'token'=>$token
        ]);
        $data = [
            "pin" => $token
        ];
        Mail::to($request->email)->send(new ResetPassword($data));


        return response()->json([
            'status' => 'ok'

    ]);

}
}
catch(\Throwable $th){
    return response()->json([
        "status"=>false,
        "message"=>$th->getMessage()
    ],500);

}
    }
    public function pinVerify(Request $request){
        $uservalidator=Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'token' => 'required'
           ]);
           if($uservalidator->fails()){
            return response()->json([
                "status"=>false,
                "message"=>"valitor error",
                "error"=>$uservalidator->errors()
            ],404);
             }
             $updatePassword = DB::table('password_resets')
             ->where([
               'email' => $request->email,
               'token' => $request->token
             ])->first();

        if(!$updatePassword){
            return response()->json([
                'status' => false,
                'msg' => 'pin not exists'

            ],404);
        }
        return response()->json([
            "status"=>true,
            "message"=>"pin is correct",


        ],200);


    }

    public function submitResetPasswordForm(Request $request)
    {

        try{
       $uservalidator=Validator::make($request->all(), [
        'email' => 'required|email|exists:users',
        'password' => 'required|string|min:6|confirmed',
        'password_confirmation' => 'required'
       ]);
        if($uservalidator->fails()){
            return response()->json([
                "status"=>false,
                "message"=>"valitor error",
                "error"=>$uservalidator->errors()
            ],404);
        }

        $user = User::where('email', $request->email)
                    ->update(['password' => Hash::make($request->password)]);

        DB::table('password_resets')->where(['email'=> $request->email])->delete();

        return response()->json([
            "status"=>true,
            "message"=>"change password success",
            $user

        ],200);

}
catch(\Throwable $th){
    return response()->json([
        "status"=>'fail',
        "message"=>$th->getMessage()
    ],500);

}
    }
}
