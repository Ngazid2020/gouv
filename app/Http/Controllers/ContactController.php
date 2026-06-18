<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\CabinetMember;
use App\Models\ContactMessage;
use App\Notifications\NouveauMessageContact;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    public function store(ContactRequest $request): RedirectResponse
    {
        if ($request->filled('website')) {
            return back();
        }

        $data = $request->validated();
        unset($data['website']);

        $message = ContactMessage::create([
            'cabinet_member_id' => $data['cabinet_member_id'] ?: null,
            'nom' => $data['nom'],
            'email' => $data['email'],
            'objet' => $data['objet'],
            'message' => $data['message'],
            'statut' => 'nouveau',
        ]);

        if ($message->cabinet_member_id) {
            $membre = CabinetMember::find($message->cabinet_member_id);
            if ($membre?->email) {
                $membre->notify(new NouveauMessageContact($message));
            }
        }

        return back()->with('flash_success', 'Votre message a bien été reçu. Nous vous répondrons dans les meilleurs délais.');
    }
}
