<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendToCompany extends Mailable
{
    use Queueable, SerializesModels;

    public $company;
    public $name;
    public $phone;
    public $email;
    public $option;
    public $question;


    public function __construct($company, $name, $phone, $email, $option, $question)
    {
        $this->company = $company;
        $this->name = $name;
        $this->phone = $phone;
        $this->email = $email;
        $this->option = $option;
        $this->question = $question;
    }

    public function build()
    {
        return $this->from($this->email, $this->name) // Optional: set the sender's email and name
                    ->subject('Question from: ' . $this->name . ' (' . $this->company . ')') // Optional: set the email subject
                    ->view('emails.bodyEmailCompany'); // Ensure this view exists
    }
}