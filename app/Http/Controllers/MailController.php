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
                'company' => 'required|string',
                'name' => 'required|string|max:255',
                'phone' => 'required|string',
                'email' => 'required|email',
                'option' => 'required|string',
                'question' => 'required|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    
        $secretKey = env('RECAPTCHA_SECRET_KEY');

        $response = Http::post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $recaptchaToken,
        ]);

        $responseBody = $response->json();

        if (!$responseBody['success']) {
            return response()->json(['error' => 'reCAPTCHA validation failed.'], 400);
        }

        $company = $request->input('company');
        $name = $request->input('name');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $option = $request->input('option');
        $question = $request->input('question');

        $recipientEmail = $email;
        $recipientName = $name;

        Mail::to($recipientEmail, $recipientName)
            ->send(new ReplyToSender($email, $name, $question));

        $recipientEmail = "info@olldesign.jp";
        $recipientName = "Oll-Design";

        Mail::to($recipientEmail, $recipientName)
            ->send(new SendToCompany($company, $name, $phone, $email, $option, $question));

        return response()->json(['message' => 'Email sent successfully.'], 200);
    }
}