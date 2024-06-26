<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;

class MailController extends Controller
{
    public function sendEmail()
    {
        $recipientEmail = 'mtegar057@gmail.com';
        $recipientName = 'Budi';

        // Send email using Mail facade
        Mail::to($recipientEmail, $recipientName)
            ->send(new TestMail());

        // Additional logic after sending email

        return redirect()->back()->with('success', 'Email sent successfully!');
    }
}