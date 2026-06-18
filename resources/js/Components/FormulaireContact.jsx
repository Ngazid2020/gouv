import { useState } from 'react';

export default function FormulaireContact({ membres }) {
    const [data, setData] = useState({
        nom: '',
        email: '',
        objet: '',
        cabinet_member_id: '',
        message: '',
    });
    const [sent, setSent] = useState(false);

    function set(k, v) { setData(p => ({ ...p, [k]: v })); }

    function handleSubmit(e) {
        e.preventDefault();
        setSent(true);
    }

    if (sent) {
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
                    onClick={() => { setSent(false); setData({ nom:'',email:'',objet:'',cabinet_member_id:'',message:'' }); }}
                    className="btn-outline mt-5"
                >
                    Nouveau message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nom complet" required>
                    <input
                        type="text"
                        value={data.nom}
                        onChange={e => set('nom', e.target.value)}
                        className="form-input rounded-[12px] border-ligne text-sm w-full focus:ring-azur focus:border-azur"
                        placeholder="Votre nom"
                        required
                    />
                </Field>
                <Field label="Adresse e-mail" required>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => set('email', e.target.value)}
                        className="form-input rounded-[12px] border-ligne text-sm w-full focus:ring-azur focus:border-azur"
                        placeholder="vous@exemple.com"
                        required
                    />
                </Field>
            </div>

            <Field label="Destinataire">
                <select
                    value={data.cabinet_member_id}
                    onChange={e => set('cabinet_member_id', e.target.value)}
                    className="form-select rounded-[12px] border-ligne text-sm w-full focus:ring-azur focus:border-azur"
                >
                    <option value="">Gouvernorat (général)</option>
                    {(membres || []).map(m => (
                        <option key={m.id} value={m.id}>{m.nom} — {m.role}</option>
                    ))}
                </select>
            </Field>

            <Field label="Objet" required>
                <input
                    type="text"
                    value={data.objet}
                    onChange={e => set('objet', e.target.value)}
                    className="form-input rounded-[12px] border-ligne text-sm w-full focus:ring-azur focus:border-azur"
                    placeholder="Sujet de votre message"
                    required
                />
            </Field>

            <Field label="Message" required>
                <textarea
                    value={data.message}
                    onChange={e => set('message', e.target.value)}
                    rows={6}
                    className="form-textarea rounded-[12px] border-ligne text-sm w-full focus:ring-azur focus:border-azur resize-none"
                    placeholder="Votre message..."
                    required
                />
            </Field>

            <div className="flex items-center justify-between">
                <p className="text-xs text-gris">
                    L'envoi côté serveur sera activé en phase 4.
                </p>
                <button type="submit" className="btn-or">
                    Envoyer →
                </button>
            </div>
        </form>
    );
}

function Field({ label, required, children }) {
    return (
        <div>
            <label className="font-label text-xs uppercase tracking-wider text-bleu-nuit/70 font-semibold mb-1.5 block">
                {label}{required && <span className="text-or ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
