<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    // public function __construct()
    // {
    //     // Any initialization code here
    // }

    public function build()
    {
        return $this->from('mtegar057@gmail.com', 'Bukan Manusia') // Optional: set the sender's email and name
                    ->subject('Test Email Subject') // Optional: set the email subject
                    ->view('emails.bodyEmail'); // Ensure this view exists
    }
}