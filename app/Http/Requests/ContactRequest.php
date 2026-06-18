<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'website' => ['max:0'],
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'cabinet_member_id' => ['nullable', 'integer', 'exists:cabinet_members,id'],
            'objet' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'website.max' => '',
            'nom.required' => 'Votre nom est obligatoire.',
            'email.required' => 'Votre adresse e-mail est obligatoire.',
            'email.email' => 'Veuillez entrer une adresse e-mail valide.',
            'cabinet_member_id.exists' => 'Ce destinataire est invalide.',
            'objet.required' => 'L\'objet est obligatoire.',
            'message.required' => 'Le message est obligatoire.',
            'message.max' => 'Le message ne peut pas dépasser 5 000 caractères.',
        ];
    }
}
