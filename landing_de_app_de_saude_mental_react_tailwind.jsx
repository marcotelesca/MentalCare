import React, { useState } from "react";

// Landing page simples para um app de saúde mental
// - Sem backend (somente UI)
// - Inclui: Hero, busca por profissionais, cards de psicólogos, modal de agendamento e FAQ
// - Estilo: Tailwind CSS

// Util: ícones inline para não depender de libs externas
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
    <circle cx="11" cy="11" r="7" strokeWidth="2" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
  </svg>
);

const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
    <rect x="3" y="5" width="15" height="14" rx="2" ry="2" strokeWidth="2" />
    <polygon points="22 7 16 12 22 17 22 7" strokeWidth="2" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
    <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" strokeWidth="2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2" />
  </svg>
);

const therapistsSeed = [
  {
    id: 1,
    name: "Dra. Ana Souza",
    focus: ["Ansiedade", "Depressão"],
    price: 120,
    rating: 4.9,
    slots: ["Hoje 18:00", "Amanhã 09:00", "Sex 14:30"],
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Dr. Bruno Lima",
    focus: ["TDAH", "Terapia Cognitivo-Comportamental"],
    price: 140,
    rating: 4.8,
    slots: ["Hoje 19:30", "Qui 10:00", "Sáb 11:00"],
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Dra. Camila Reis",
    focus: ["Casais", "Autoestima"],
    price: 130,
    rating: 4.7,
    slots: ["Amanhã 16:00", "Sex 09:30", "Dom 10:00"],
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
  },
];

export default function MentalCareLanding() {
  const [q, setQ] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof therapistsSeed[0] | null>(null);

  const filtered = therapistsSeed.filter((t) => {
    const matchesQ =
      !q ||
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.focus.some((f) => f.toLowerCase().includes(q.toLowerCase()));
    const matchesPrice = t.price <= maxPrice;
    return matchesQ && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-sky-500" />
            <span className="font-bold text-lg">MentalCare</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#como-funciona" className="hover:text-sky-600">Como funciona</a>
            <a href="#profissionais" className="hover:text-sky-600">Profissionais</a>
            <a href="#faq" className="hover:text-sky-600">FAQ</a>
            <a href="#agendar" className="px-3 py-2 rounded-xl bg-sky-600 text-white">Entrar / Cadastrar</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Cuide da sua mente, <span className="text-sky-600">sem sair de casa</span>.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Conecte-se com psicólogos verificados por vídeo, chat ou áudio. Agende em poucos cliques e pague com segurança.
            </p>

            {/* Busca */}
            <div className="mt-6 rounded-2xl border bg-white p-2 shadow-sm">
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <div className="flex items-center gap-2 flex-1 rounded-xl border px-3 py-2">
                  <IconSearch />
                  <input
                    aria-label="Buscar por nome ou especialidade"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Ansiedade, TDAH, Terapia de Casal..."
                    className="w-full outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
                  <span className="text-sm">Até R$ {maxPrice}</span>
                  <input
                    type="range"
                    min={80}
                    max={300}
                    step={10}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById("profissionais");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full md:w-auto px-5 py-2 rounded-xl bg-sky-600 text-white font-medium"
                >
                  Buscar profissionais
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2"><IconVideo /> Sessões por vídeo</div>
              <div className="flex items-center gap-2"><IconShield /> LGPD & privacidade</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-sky-100 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold">Agende sua primeira sessão</h3>
              <p className="text-slate-600 text-sm mt-1">Escolha um horário e receba o link de vídeo.</p>
              <form className="mt-4 grid gap-3" onSubmit={(e)=> e.preventDefault()}>
                <input className="rounded-xl border px-3 py-2" placeholder="Seu nome" />
                <input className="rounded-xl border px-3 py-2" placeholder="Seu e-mail" />
                <select className="rounded-xl border px-3 py-2">
                  <option>Motivo: Ansiedade</option>
                  <option>Motivo: Estresse</option>
                  <option>Motivo: Relacionamentos</option>
                </select>
                <button className="rounded-xl bg-sky-600 text-white px-4 py-2">Continuar</button>
              </form>
              <p className="mt-3 text-xs text-slate-500">* Exemplo de UI. Integrações reais de pagamento e vídeo entram depois.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Como funciona</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Encontre o profissional",
              desc: "Filtre por preço, especialidade e avaliações.",
            },
            { title: "Agende em 3 cliques", desc: "Escolha um horário e confirme o pagamento." },
            { title: "Atenda por vídeo", desc: "Receba link seguro e lembretes automáticos." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sky-600 text-sm font-semibold">Passo {i + 1}</div>
              <div className="mt-1 font-semibold">{s.title}</div>
              <p className="text-slate-600 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFISSIONAIS */}
      <section id="profissionais" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Profissionais em destaque</h2>
            <p className="text-slate-600">Resultados filtrados por sua busca.</p>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <article key={t.id} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-slate-600">{t.focus.join(" • ")}</p>
                  <p className="text-xs mt-1">⭐ {t.rating} • R$ {t.price}/sessão</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelected(t);
                      setOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl border hover:bg-sky-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setSelected(t); setOpen(true); }}
                className="mt-4 w-full rounded-xl bg-sky-600 text-white py-2"
              >
                Agendar sessão
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            {
              q: "Como funciona o pagamento?",
              a: "Você paga online com Pix ou cartão. O valor é repassado ao profissional menos a taxa da plataforma.",
            },
            {
              q: "As sessões são seguras?",
              a: "Sim. Utilizamos provedores de vídeo com criptografia e seguimos a LGPD.",
            },
            {
              q: "Os psicólogos são verificados?",
              a: "Solicitamos CRP ativo e verificação documental antes de liberar atendimentos.",
            },
            {
              q: "Posso remarcar?",
              a: "Sim, até 24h antes do horário agendado, salvo política do profissional.",
            },
          ].map((i, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="font-semibold">{i.q}</div>
              <p className="text-slate-600 text-sm mt-1">{i.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-bold">MentalCare</div>
            <p className="text-slate-600 mt-2">Plataforma exemplo. Configure termos, LGPD e verificação de CRP no produto real.</p>
          </div>
          <div className="grid gap-1">
            <div className="font-semibold">Links</div>
            <a href="#como-funciona" className="hover:text-sky-600">Como funciona</a>
            <a href="#profissionais" className="hover:text-sky-600">Profissionais</a>
            <a href="#faq" className="hover:text-sky-600">FAQ</a>
          </div>
          <div className="grid gap-2">
            <div className="font-semibold">Contato</div>
            <p>contato@mentalcare.app</p>
            <p className="text-slate-500">© {new Date().getFullYear()} MentalCare</p>
          </div>
        </div>
      </footer>

      {/* MODAL DE AGENDAMENTO */}
      {open && selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Agendar com {selected.name}</h3>
              <button onClick={() => setOpen(false)} className="text-slate-500">✕</button>
            </div>
            <p className="text-sm text-slate-600 mt-1">Sessões por vídeo. Valor: R$ {selected.price}.</p>

            <form className="mt-4 grid gap-3" onSubmit={(e)=> e.preventDefault()}>
              <input className="rounded-xl border px-3 py-2" placeholder="Seu nome" />
              <input className="rounded-xl border px-3 py-2" placeholder="Seu e-mail" />
              <select className="rounded-xl border px-3 py-2">
                {selected.slots.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <button className="rounded-xl bg-sky-600 text-white px-4 py-2">Confirmar</button>
            </form>

            <p className="text-xs text-slate-500 mt-3">
              * Exemplo. Para produção: integrar pagamentos (Mercado Pago/Stripe), vídeo (Jitsi/Twilio) e verificação de CRP.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
