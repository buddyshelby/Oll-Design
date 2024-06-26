<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReplyToSender extends Mailable
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
        return $this->from('noreply@olldesign.jp', 'Oll-Design') // Optional: set the sender's email and name
                    ->subject('Thank you for contacting us!') // Optional: set the email subject
                    ->view('emails.bodyEmailSender'); // Ensure this view exists
    }
}