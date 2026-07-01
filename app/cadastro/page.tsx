"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const SEGMENTS = [
  "Restaurante / Alimentação",
  "Moda / Vestuário",
  "Saúde / Bem-estar",
  "Beleza / Estética",
  "Serviços profissionais",
  "E-commerce",
  "Outro",
];

const OBJECTIVES = [
  "Atrair mais clientes para o meu negócio",
  "Crescer minha audiência / seguidores",
  "Lançar um produto ou serviço novo",
  "Outro objetivo",
];

function CadastroForm() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "";
  const priceId = searchParams.get("priceId") || "";

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [segment, setSegment] = useState("");
  const [city, setCity] = useState("");
  const [objective, setObjective] = useState(OBJECTIVES[0]);

  const steps = [
    { label: "Dados da conta", num: 1 },
    { label: "Sobre o negócio", num: 2 },
    { label: "Pagamento", num: 3 },
  ];

  function validateStep1() {
    if (!name || !businessName || !email || !password || !confirmPassword || !whatsapp) {
      setError("Preencha todos os campos obrigatórios");
      return false;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    setError("");
    return true;
  }

  function validateStep2() {
    if (!segment || !city) {
      setError("Preencha todos os campos obrigatórios");
      return false;
    }
    setError("");
    return true;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  }

  async function handleSubmit() {
    if (!validateStep2()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, businessName, whatsapp, segment, city }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Conta criada, mas erro ao fazer login automático. Faça login manualmente.");
        setLoading(false);
        return;
      }

      if (priceId && !priceId.includes("placeholder")) {
        const checkoutRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId, planName }),
        });
        const checkoutData = await checkoutRes.json();
        if (checkoutData.url) {
          window.location.href = checkoutData.url;
          return;
        }
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="cad-layout">
      {/* LEFT PANEL */}
      <div className="cad-left">
        <div className="cad-left-glow1" />
        <div className="cad-left-glow2" />
        <Link href="/" className="cad-logo">Vitrina</Link>
        <div className="cad-hero-text">
          <h2>
            Suas redes no<br />
            <span>piloto automático</span>.<br />
            Do jeito certo.
          </h2>
          <p>
            Conta pra gente sobre o seu negócio e a Vitrina cuida do resto — posts, Reels, agendamento e tudo mais.
          </p>
        </div>

        {planName && (
          <div className="cad-plan-selected">
            <span className="cad-plan-label">Plano selecionado</span>
            <span className="cad-plan-name">{planName}</span>
          </div>
        )}

        <div className="cad-steps-list">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`cad-step-item ${step > s.num ? "done" : ""} ${step === s.num ? "active" : ""}`}
            >
              <div className="cad-step-num">
                {step > s.num ? "✓" : s.num}
              </div>
              <span className="cad-step-text">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="cad-right">
        <div className="cad-progress">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`cad-prog-bar ${step > s.num ? "done" : ""} ${step === s.num ? "active" : ""}`}
            />
          ))}
        </div>

        {error && (
          <div className="cad-error">{error}</div>
        )}

        {/* STEP 1: Account data */}
        {step === 1 && (
          <div>
            <h3 className="cad-section-title">Dados da conta</h3>
            <p className="cad-section-sub">Essas informações são para acessar a plataforma</p>

            <div className="cad-field-row">
              <div className="cad-field">
                <label className="wf-label">Nome completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="cad-field">
                <label className="wf-label">Nome do negócio / marca *</label>
                <input
                  type="text"
                  placeholder="Ex: Café da Maria"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
            </div>

            <div className="cad-field">
              <label className="wf-label">E-mail *</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="cad-field-row">
              <div className="cad-field">
                <label className="wf-label">Senha * (mín. 6 caracteres)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="cad-field">
                <label className="wf-label">Confirmar senha *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="cad-field">
              <label className="wf-label">WhatsApp *</label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="cad-divider" />

            <button onClick={handleNext} className="btn btn-primary btn-full">
              Continuar →
            </button>

            <div className="cad-login-link">
              Já tem uma conta?{" "}
              <Link href="/login">Entrar</Link>
            </div>
          </div>
        )}

        {/* STEP 2: About the business */}
        {step === 2 && (
          <div>
            <h3 className="cad-section-title">Sobre o negócio</h3>
            <p className="cad-section-sub">Usamos isso para personalizar tudo pra você</p>

            <div className="cad-field-row">
              <div className="cad-field">
                <label className="wf-label">Segmento *</label>
                <select value={segment} onChange={(e) => setSegment(e.target.value)}>
                  <option value="">Selecionar...</option>
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="cad-field">
                <label className="wf-label">Cidade / Estado *</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="cad-field">
              <label className="wf-label">Principal objetivo *</label>
              <div className="cad-radio-group">
                {OBJECTIVES.map((obj) => (
                  <div
                    key={obj}
                    className={`radio-item ${objective === obj ? "selected" : ""}`}
                    onClick={() => setObjective(obj)}
                  >
                    <div className="radio-dot" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cad-divider" />

            <div className="cad-actions">
              <button onClick={() => { setStep(1); setError(""); }} className="btn btn-ghost">
                ← Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                {loading ? "Criando conta..." : "Criar conta e continuar →"}
              </button>
            </div>

            <p className="cad-terms">
              Ao continuar, você aceita os{" "}
              <span>Termos de Uso</span> e{" "}
              <span>Política de Privacidade</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--muted)" }}>Carregando...</div>
      </div>
    }>
      <CadastroForm />
    </Suspense>
  );
}
