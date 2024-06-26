<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendToCompany;
use App\Mail\ReplyToSender;

class MailController extends Controller
{
    public function sendEmail(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => 'required|email',
                'name' => 'required|string|max:255',
                'question' => 'required|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    
        $email = $request->input('email');
        $name = $request->input('name');
        $question = $request->input('question');

        $recipientEmail = $email;
        $recipientName = $name;

        Mail::to($recipientEmail, $recipientName)
            ->send(new ReplyToSender($email, $name, $question));

        $recipientEmail = "info@olldesign.jp";
        $recipientName = "Oll-Design";

        Mail::to($recipientEmail, $recipientName)
            ->send(new SendToCompany($email, $name, $question));

        return response()->json(['message' => 'Email sent successfully.'], 200);
    }
}