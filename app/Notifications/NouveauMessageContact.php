<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NouveauMessageContact extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly ContactMessage $contactMessage,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $from = $this->contactMessage->nom;
        $email = $this->contactMessage->email;
        $objet = $this->contactMessage->objet;
        $message = $this->contactMessage->message;

        return (new MailMessage)
            ->subject("Nouveau message : {$objet}")
            ->greeting('Bonjour,')
            ->line('Vous avez reçu un nouveau message de contact via le portail du Gouvernorat.')
            ->line("**Expéditeur :** {$from} ({$email})")
            ->line("**Objet :** {$objet}")
            ->line('**Message :**')
            ->line($message)
            ->action('Voir dans le back-office', url('/admin/contact-messages'))
            ->line('Ce message a été enregistré dans le système. Merci de le traiter dans les meilleurs délais.');
    }
}
