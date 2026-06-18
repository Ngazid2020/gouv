import { useForm } from '@inertiajs/react';

export default function FormulaireContact({ membres }) {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        website:           '',
        nom:               '',
        email:             '',
        cabinet_member_id: '',
        objet:             '',
        message:           '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    if (wasSuccessful) {
        return (
            <div className="bg-vert/10 border border-vert/30 rounded-[18px] p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-vert/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-vert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <h3 className="font-serif text-xl text-bleu-nuit mb-2">Message envoyé</h3>
                <p className="text-gris text-sm">Votre message a bien été reçu. Nous vous répondrons dans les meilleurs délais.</p>
                <button
                    onClick={() => reset()}
                    className="btn-outline mt-5"
                >
                    Nouveau message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — invisible, ne jamais remplir */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }} aria-hidden="true">
                <input
                    type="text"
                    name="website"
                    value={data.website}
                    onChange={e => setData('website', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nom complet" required error={errors.nom}>
                    <input
                        type="text"
                        value={data.nom}
                        onChange={e => setData('nom', e.target.value)}
                        className={inputClass(errors.nom)}
                        placeholder="Votre nom"
                    />
                </Field>
                <Field label="Adresse e-mail" required error={errors.email}>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={inputClass(errors.email)}
                        placeholder="vous@exemple.com"
                    />
                </Field>
            </div>

            <Field label="Destinataire" error={errors.cabinet_member_id}>
                <select
                    value={data.cabinet_member_id}
                    onChange={e => setData('cabinet_member_id', e.target.value)}
                    className={inputClass(errors.cabinet_member_id)}
                >
                    <option value="">Gouvernorat (général)</option>
                    {(membres || []).map(m => (
                        <option key={m.id} value={m.id}>{m.nom} — {m.role}</option>
                    ))}
                </select>
            </Field>

            <Field label="Objet" required error={errors.objet}>
                <input
                    type="text"
                    value={data.objet}
                    onChange={e => setData('objet', e.target.value)}
                    className={inputClass(errors.objet)}
                    placeholder="Sujet de votre message"
                />
            </Field>

            <Field label="Message" required error={errors.message}>
                <textarea
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    rows={6}
                    className={inputClass(errors.message) + ' resize-none'}
                    placeholder="Votre message..."
                />
            </Field>

            <div className="flex justify-end">
                <button type="submit" className="btn-or" disabled={processing}>
                    {processing ? 'Envoi…' : 'Envoyer →'}
                </button>
            </div>
        </form>
    );
}

function inputClass(error) {
    return `form-input rounded-[12px] text-sm w-full focus:ring-azur focus:border-azur ${
        error ? 'border-red-400' : 'border-ligne'
    }`;
}

function Field({ label, required, error, children }) {
    return (
        <div>
            <label className="font-label text-xs uppercase tracking-wider text-bleu-nuit/70 font-semibold mb-1.5 block">
                {label}{required && <span className="text-or ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
