<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $name;
    public $question;


    public function __construct($email, $name, $question)
    {
        $this->email = $email;
        $this->name = $name;
        $this->question = $question;
    }

    public function build()
    {
        return $this->from($this->email, $this->name) // Optional: set the sender's email and name
                    ->subject('Question from: ' . $this->name) // Optional: set the email subject
                    ->view('emails.bodyEmail'); // Ensure this view exists
    }
}