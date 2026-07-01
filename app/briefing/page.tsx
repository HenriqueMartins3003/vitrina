"use client";
import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/AppShell";

// ── OPÇÕES ──────────────────────────────────────────────────────

const SEGMENTS = [
  "Beleza / Estética",
  "Saúde / Clínica / Consultório",
  "Restaurante / Alimentação",
  "Moda / Vestuário",
  "Serviços profissionais (advocacia, contabilidade, seguros…)",
  "E-commerce / Loja online",
  "Academia / Fitness",
  "Pet shop / Veterinário",
  "Outro",
];

const BUSINESS_AGES = ["Menos de 1 ano", "1 a 3 anos", "3 a 5 anos", "Mais de 5 anos"];

const SERVICE_LOCATIONS = [
  "Loja física / espaço próprio",
  "Atendimento a domicílio",
  "Online (todo o Brasil)",
  "Online + presencial",
];

const EMPLOYEE_COUNTS = ["Só eu", "2 a 5", "6 a 20", "Mais de 20"];

const AVG_TICKETS = [
  "Até R$100",
  "R$100 a R$300",
  "R$300 a R$800",
  "R$800 a R$2.000",
  "Acima de R$2.000",
];

const BUYING_CHANNELS = [
  "Presencialmente na loja",
  "WhatsApp",
  "Site / e-commerce",
  "Aplicativo (iFood, Rappi, etc.)",
  "Indicação / telefone",
  "Outro",
];

const TARGET_AUDIENCE_OPTS = [
  "Mulheres adultas (25–45 anos)",
  "Homens adultos (25–45 anos)",
  "Público jovem (18–25 anos)",
  "Pessoas acima de 45 anos",
  "Mães / família",
  "Empresários / profissionais liberais",
  "Estudantes",
  "Outro",
];

const CLIENT_VALUES_OPTS = [
  "Preço acessível",
  "Qualidade / resultado",
  "Atendimento personalizado",
  "Localização / conveniência",
  "Reputação / indicação",
  "Exclusividade",
  "Outro",
];

const TONE_OF_VOICES = [
  "Descontraído e próximo — como uma conversa com amigo",
  "Profissional e confiável — transmite segurança",
  "Sofisticado e refinado — exclusividade",
  "Divertido e irreverente — bem-humorado",
  "Educativo e informativo — ensina o cliente",
  "Ainda não sei definir",
];

const VISUAL_IDENTITIES = [
  "Sim, tenho tudo definido (logo, cores, fontes)",
  "Tenho logo mas nada além disso",
  "Não tenho nada ainda",
  "Estou reformulando",
];

const POSTING_FREQUENCIES = [
  "Não posto",
  "Raramente (menos de 1x por semana)",
  "1 a 2x por semana",
  "Quase todo dia",
];

// ── CONFIG BLOCO F (perguntas por segmento) ─────────────────────

type SQType = "radio" | "checkbox" | "text" | "textarea";
type SQ = { key: string; type: SQType; label: string; sub?: string; options?: string[]; optional?: boolean };

const SEGMENT_QUESTIONS: Record<string, SQ[]> = {
  "Beleza / Estética": [
    {
      key: "procedures", type: "checkbox", label: "F1.1 Quais procedimentos você oferece?",
      options: ["Design de sobrancelha", "Limpeza de pele", "Extensão de cílios", "Micropigmentação", "Massagem / corporal", "Depilação", "Nail art / unhas", "Procedimentos faciais estéticos", "Outro"],
    },
    { key: "scheduling", type: "radio", label: "F1.2 Você atende com hora marcada ou aceita encaixe?", options: ["Somente hora marcada", "Aceito encaixe quando tenho vaga", "Aceito os dois"] },
    { key: "bookingChannel", type: "checkbox", label: "F1.3 Como o cliente agenda com você?", options: ["WhatsApp", "Instagram (direct ou link na bio)", "Site próprio", "Aplicativo (Booksy, Trinks, etc.)", "Telefone"] },
    { key: "promos", type: "textarea", label: "F1.4 Tem alguma promoção, combo ou programa de fidelidade ativo?", optional: true },
    { key: "differential", type: "textarea", label: "F1.5 Qual é o seu grande diferencial em relação às concorrentes da região?", sub: "Ex: Uso só produtos veganos. Atendo aos domingos. Faço atendimento domiciliar." },
  ],
  "Serviços profissionais (advocacia, contabilidade, seguros…)": [
    { key: "specialty", type: "radio", label: "F2.1 Qual é a sua especialidade?", options: ["Seguros (vida, auto, residencial, empresarial…)", "Advocacia", "Contabilidade / finanças", "Consultoria empresarial", "Coaching / mentoria", "RH / recrutamento", "Outro"] },
    { key: "clientType", type: "radio", label: "F2.2 Você atende pessoa física, pessoa jurídica ou os dois?", options: ["Só pessoa física", "Só pessoa jurídica", "Os dois"] },
    { key: "howClientFinds", type: "checkbox", label: "F2.3 Como o cliente chega até você hoje?", options: ["Indicação de amigos / família", "Indicação de outros clientes", "Redes sociais", "Google", "Eventos / networking", "Outro"] },
    { key: "mainObjection", type: "textarea", label: "F2.4 Qual é a principal objeção que o cliente tem antes de fechar com você?", sub: "Ex: Acham que seguro é caro. Não entendem a diferença entre as coberturas." },
    { key: "concreteResult", type: "textarea", label: "F2.5 Qual resultado concreto você entrega pro cliente?", sub: "Ex: Proteção financeira da família. Redução de até 30% no custo do seguro." },
    { key: "testimonials", type: "radio", label: "F2.6 Você pode mostrar cases ou depoimentos de clientes?", options: ["Sim, tenho depoimentos", "Tenho mas preciso de autorização", "Prefiro não usar"] },
  ],
  "Saúde / Clínica / Consultório": [
    { key: "specialty", type: "radio", label: "F3.1 Qual é a sua especialidade?", options: ["Clínica geral / medicina de família", "Odontologia", "Psicologia / terapia", "Nutrição", "Fisioterapia", "Dermatologia", "Ginecologia / obstetrícia", "Pediatria", "Ortopedia", "Outro"] },
    { key: "paymentType", type: "radio", label: "F3.2 Como funciona o atendimento?", options: ["Plano de saúde", "Particular", "Plano e particular", "Pacote de sessões"] },
    { key: "patientBooking", type: "checkbox", label: "F3.3 Como o paciente agenda?", options: ["WhatsApp", "Telefone", "Site próprio", "Plataforma de agendamento", "Direto na recepção"] },
    { key: "attendanceMode", type: "radio", label: "F3.4 Você atende presencialmente, online ou os dois?", options: ["Só presencial", "Só online / teleconsulta", "Presencial e online"] },
    { key: "patientProfile", type: "textarea", label: "F3.5 Qual é o perfil do seu paciente típico?", sub: "Ex: Adultos entre 30 e 55 anos com queixas de ansiedade e estresse. Maioria mulheres." },
    { key: "educationTopics", type: "textarea", label: "F3.6 Existe algum tema de saúde que você quer educar seu público agora?", sub: "Ex: Prevenção, quando procurar um especialista, mitos da área.", optional: true },
    { key: "contentSharing", type: "radio", label: "F3.7 Você pode compartilhar conteúdo educativo sem identificar pacientes?", options: ["Sim, à vontade", "Sim, mas preciso revisar antes de postar", "Prefiro não — só conteúdo institucional"] },
  ],
  "Restaurante / Alimentação": [
    { key: "establishmentType", type: "radio", label: "F4.1 Qual é o tipo do estabelecimento?", options: ["Restaurante / lanchonete com salão", "Delivery (só entrega)", "Delivery + salão", "Food truck / quiosque", "Cafeteria / café", "Confeitaria / doceria", "Dark kitchen", "Outro"] },
    { key: "deliveryPlatforms", type: "checkbox", label: "F4.2 Quais plataformas de delivery você usa?", options: ["iFood", "Rappi", "Delivery próprio pelo WhatsApp", "Não faço delivery", "Outro"] },
    { key: "cuisineStyle", type: "radio", label: "F4.3 Qual é o estilo da culinária?", options: ["Brasileira / caseira", "Árabe / mediterrânea", "Japonesa / asiática", "Italiana / pizza / massa", "Americana / burger", "Saudável / fit / vegana", "Doces / confeitaria", "Outro"] },
    { key: "openingHours", type: "text", label: "F4.4 Qual é o horário de funcionamento?", sub: "Ex: Seg a sex 11h–15h. Sex e sáb 11h–22h." },
    { key: "bestSellers", type: "textarea", label: "F4.5 Tem pratos ou produtos que são carro-chefe, que vendem mais?", sub: "Ex: Nosso X-burguer artesanal é o mais pedido.", optional: true },
    { key: "dietaryRestrictions", type: "radio", label: "F4.6 Tem alguma restrição alimentar que você atende? (vegetariano, sem glúten, etc.)", options: ["Sim", "Não"] },
    { key: "hasProfessionalPhotos", type: "radio", label: "F4.7 Você tem fotos profissionais dos pratos?", options: ["Sim", "Tenho fotos mas não são profissionais", "Não tenho — vou tirar"] },
  ],
  "Moda / Vestuário": [
    { key: "whatYouSell", type: "checkbox", label: "F5.1 O que você vende?", options: ["Roupas femininas", "Roupas masculinas", "Roupas infantis", "Unissex / streetwear", "Lingerie / moda íntima", "Calçados", "Acessórios", "Mix de categorias"] },
    { key: "brandStyle", type: "radio", label: "F5.2 Qual é o estilo da marca?", options: ["Casual / dia a dia", "Elegante / trabalho", "Festa / ocasião especial", "Esportivo / athleisure", "Sustentável / slow fashion", "Streetwear / urban", "Plus size / inclusivo", "Outro"] },
    { key: "priceRange", type: "radio", label: "F5.3 Qual é a faixa de preço dos produtos?", options: ["Popular — até R$80 por peça", "Intermediário — R$80 a R$250", "Premium — R$250 a R$600", "Luxo — acima de R$600"] },
    { key: "salesChannels", type: "checkbox", label: "F5.4 Onde você vende?", options: ["Loja física", "Instagram / direct", "Site próprio", "Shopee / Mercado Livre / Shein", "WhatsApp", "Atacado para lojistas"] },
    { key: "newArrivals", type: "radio", label: "F5.5 Com que frequência entram novidades na loja?", options: ["Toda semana", "A cada 15 dias", "Mensalmente", "Por coleção / temporada"] },
    { key: "outfitStyling", type: "radio", label: "F5.6 Você trabalha com looks montados / combinações?", options: ["Sim, gosto de mostrar combinações completas", "Às vezes", "Prefiro mostrar peça por peça"] },
    { key: "hasPhotos", type: "radio", label: "F5.7 Tem fotos das peças ou de clientes usando?", options: ["Sim, tenho lookbook / fotos profissionais", "Tenho fotos simples", "Não tenho ainda"] },
  ],
  "E-commerce / Loja online": [
    { key: "productsDesc", type: "textarea", label: "F6.1 O que você vende?", sub: "Ex: Produtos de beleza importados. Suplementos. Artigos de decoração." },
    { key: "storeLocation", type: "checkbox", label: "F6.2 Onde está a sua loja?", options: ["Site próprio", "Shopee", "Mercado Livre", "Amazon", "Magalu / Americanas", "Instagram Shopping", "Só pelo WhatsApp"] },
    { key: "salesRegion", type: "radio", label: "F6.3 Você vende para todo o Brasil ou região específica?", options: ["Todo o Brasil", "Só meu estado / região", "Exporto para outros países"] },
    { key: "avgDelivery", type: "radio", label: "F6.4 Qual é o prazo médio de entrega?", options: ["Até 3 dias úteis", "4 a 7 dias úteis", "Mais de 7 dias úteis", "Entrega local no mesmo dia / próximo dia"] },
    { key: "mainDifferential", type: "radio", label: "F6.5 Qual é o seu maior diferencial competitivo?", options: ["Preço mais baixo", "Produto exclusivo / difícil de achar", "Entrega mais rápida", "Atendimento personalizado", "Qualidade superior", "Outro"] },
    { key: "reviews", type: "radio", label: "F6.6 Você tem avaliações ou depoimentos de clientes?", options: ["Sim, tenho muitas avaliações positivas", "Tenho algumas", "Ainda não"] },
    { key: "topProducts", type: "textarea", label: "F6.7 Tem produtos com alta saída que quer destacar?", sub: "Ex: Meu kit de skincare é o mais pedido. Quero focar nele.", optional: true },
  ],
  "Academia / Fitness": [
    { key: "offerings", type: "checkbox", label: "F7.1 O que você oferece?", options: ["Academia completa com musculação", "Studio de pilates", "Crossfit / funcional", "Yoga / meditação", "Dança / zumba", "Natação", "Personal trainer", "Nutrição esportiva", "Outro"] },
    { key: "attendanceMode", type: "radio", label: "F7.2 Você atende presencialmente, online ou os dois?", options: ["Só presencial", "Só online", "Presencial e online"] },
    { key: "studentProfile", type: "radio", label: "F7.3 Qual é o perfil do seu aluno típico?", options: ["Iniciantes querendo começar a se exercitar", "Intermediários buscando evolução", "Atletas e praticantes avançados", "Público 40+ buscando saúde e qualidade de vida", "Emagrecimento como principal objetivo", "Misto"] },
    { key: "businessModel", type: "radio", label: "F7.4 Como funciona o modelo de negócio?", options: ["Mensalidade fixa", "Pacote de aulas avulsas", "Plano trimestral / semestral / anual", "Sessões individuais com personal", "Assinatura online"] },
    { key: "transformations", type: "radio", label: "F7.5 Você tem transformações de alunos para mostrar?", options: ["Sim, com autorização", "Tenho mas sem mostrar o rosto", "Prefiro não usar"] },
    { key: "upcomingEvents", type: "textarea", label: "F7.6 Tem algum desafio, campanha ou evento especial previsto?", sub: "Ex: Desafio 30 dias de pilates. Semana de aula experimental gratuita.", optional: true },
  ],
  "Pet shop / Veterinário": [
    { key: "services", type: "checkbox", label: "F8.1 O que você oferece?", options: ["Banho e tosa", "Consulta veterinária", "Vacinação", "Internação / cirurgia", "Venda de produtos / rações", "Hotel para pets", "Adestramento", "Transporte pet", "Outro"] },
    { key: "animals", type: "radio", label: "F8.2 Quais animais você atende?", options: ["Cães", "Gatos", "Cães e gatos", "Animais exóticos também"] },
    { key: "booking", type: "checkbox", label: "F8.3 Como o cliente agenda?", options: ["WhatsApp", "Telefone", "Aplicativo", "Presencialmente"] },
    { key: "hasPetPhotos", type: "radio", label: "F8.4 Você tem fotos dos pets atendidos?", options: ["Sim, com autorização dos tutores", "Tenho algumas", "Não tenho ainda"] },
    { key: "highlightService", type: "textarea", label: "F8.5 Tem algum serviço que quer destacar agora?", sub: "Ex: Quero encher a agenda de banho e tosa. Lançamos o hotel para pets esse mês.", optional: true },
    { key: "educativeContent", type: "radio", label: "F8.6 Você compartilha dicas de saúde e cuidados com pets no conteúdo?", options: ["Sim, adoro esse tipo de conteúdo educativo", "Às vezes", "Prefiro focar só nos serviços"] },
  ],
  "Outro": [
    { key: "businessDesc", type: "textarea", label: "F9.1 Como você descreveria o seu negócio em uma frase?", sub: "Ex: Sou fotógrafo de casamentos. Tenho uma escola de idiomas." },
    { key: "sellType", type: "radio", label: "F9.2 O que exatamente você vende — produto, serviço ou os dois?", options: ["Só produto", "Só serviço", "Produto e serviço juntos"] },
    { key: "howClientBuys", type: "checkbox", label: "F9.3 Como o cliente compra ou contrata você?", options: ["Me chama pelo WhatsApp", "Pelo Instagram / direct", "Pelo meu site", "Por indicação", "Em feiras / eventos", "Outro"] },
    { key: "clientType", type: "radio", label: "F9.4 O cliente é pessoa física ou empresa?", options: ["Só pessoa física", "Só empresas / CNPJ", "Os dois"] },
    { key: "salesProcess", type: "textarea", label: "F9.5 Como é o processo de venda até o cliente fechar com você?", sub: "Ex: Cliente manda mensagem, envio portfólio, faço reunião e mando proposta." },
    { key: "mainProblem", type: "textarea", label: "F9.6 Qual é o maior problema que você resolve para o seu cliente?", sub: "Ex: Registro o momento mais importante da vida do casal." },
    { key: "competitor", type: "textarea", label: "F9.7 Quem é seu principal concorrente e o que te diferencia?", optional: true },
    { key: "hasPortfolio", type: "radio", label: "F9.8 Você tem portfólio, cases ou exemplos do seu trabalho?", options: ["Sim", "Tenho mas é confidencial", "Ainda não tenho"] },
    { key: "sectorNotes", type: "textarea", label: "F9.9 Tem alguma coisa específica do seu setor que a gente precisa saber?", sub: "Ex: No meu setor é proibido fazer promessas de resultado. Tem muita sazonalidade.", optional: true },
  ],
};

// ── TIPOS ────────────────────────────────────────────────────────

type SD = Record<string, string | string[]>;

type FormState = {
  // Bloco A
  businessName: string;
  segment: string;
  segmentOther: string;
  businessAge: string;
  serviceLocation: string;
  cityState: string;
  employeeCount: string;
  // Bloco B
  products: string;
  avgTicket: string;
  buyingChannels: string[];
  buyingChannelOther: string;
  highlightProduct: string;
  // Bloco C
  targetAudience: string[];
  targetAudienceOther: string;
  clientValues: string[];
  clientValuesOther: string;
  clientPain: string;
  // Bloco D
  toneOfVoice: string;
  brandReferences: string;
  contentToAvoid: string;
  visualIdentity: string;
  // Bloco E
  instagramHandle: string;
  tiktokHandle: string;
  facebookLink: string;
  hasNoSocial: boolean;
  postingFrequency: string;
  whatFailed: string;
  // Bloco F
  segmentData: SD;
};

const defaultForm: FormState = {
  businessName: "", segment: "", segmentOther: "", businessAge: "",
  serviceLocation: "", cityState: "", employeeCount: "",
  products: "", avgTicket: "", buyingChannels: [], buyingChannelOther: "", highlightProduct: "",
  targetAudience: [], targetAudienceOther: "", clientValues: [], clientValuesOther: "", clientPain: "",
  toneOfVoice: "", brandReferences: "", contentToAvoid: "", visualIdentity: "",
  instagramHandle: "", tiktokHandle: "", facebookLink: "", hasNoSocial: false,
  postingFrequency: "", whatFailed: "",
  segmentData: {},
};

// ── HELPER COMPONENTS ────────────────────────────────────────────

function Radio({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => (
        <div key={opt} className={`radio-item${value === opt ? " selected" : ""}`} onClick={() => onChange(opt)}>
          <div className="radio-dot" />
          <span style={{ fontSize: 13 }}>{opt}</span>
        </div>
      ))}
    </div>
  );
}

function Checkbox({
  options, values, onChange, otherValue, onOtherChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  function toggle(opt: string) {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => (
        <div key={opt}>
          <div className={`checkbox-item${values.includes(opt) ? " checked" : ""}`} onClick={() => toggle(opt)}>
            <div className="checkbox-box">{values.includes(opt) ? "✓" : ""}</div>
            <span style={{ fontSize: 13 }}>{opt}</span>
          </div>
          {opt === "Outro" && values.includes("Outro") && onOtherChange && (
            <input
              type="text"
              placeholder="Qual?"
              value={otherValue || ""}
              onChange={(e) => onOtherChange(e.target.value)}
              style={{ marginTop: 6, fontSize: 12 }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Q({ label, sub, optional, children }: { label: string; sub?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: sub ? 4 : 12 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{label}</p>
        {optional && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", background: "var(--surface2)", border: "1px solid var(--border2)", padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap", marginTop: 2 }}>opcional</span>}
      </div>
      {sub && <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, lineHeight: 1.6, fontStyle: "italic" }}>{sub}</p>}
      {children}
    </div>
  );
}

// ── BLOCOS ───────────────────────────────────────────────────────

function BlocoA({ form, upd }: { form: FormState; upd: (p: Partial<FormState>) => void }) {
  return (
    <div>
      <Q label="1. Qual é o nome do seu negócio?">
        <input type="text" placeholder="Ex: Studio Glow, Café da Maria" value={form.businessName} onChange={(e) => upd({ businessName: e.target.value })} />
      </Q>
      <Q label="2. Qual é o seu segmento?">
        <Radio options={SEGMENTS} value={form.segment} onChange={(v) => upd({ segment: v, segmentOther: "" })} />
        {form.segment === "Outro" && (
          <input type="text" placeholder="Descreva seu segmento" value={form.segmentOther} onChange={(e) => upd({ segmentOther: e.target.value })} style={{ marginTop: 8 }} />
        )}
      </Q>
      <Q label="3. Há quanto tempo o negócio existe?">
        <Radio options={BUSINESS_AGES} value={form.businessAge} onChange={(v) => upd({ businessAge: v })} />
      </Q>
      <Q label="4. Onde você atende?">
        <Radio options={SERVICE_LOCATIONS} value={form.serviceLocation} onChange={(v) => upd({ serviceLocation: v })} />
        {form.serviceLocation === "Online + presencial" && (
          <input type="text" placeholder="Cidade e Estado" value={form.cityState} onChange={(e) => upd({ cityState: e.target.value })} style={{ marginTop: 8 }} />
        )}
      </Q>
      <Q label="5. Quantos funcionários tem o negócio?">
        <Radio options={EMPLOYEE_COUNTS} value={form.employeeCount} onChange={(v) => upd({ employeeCount: v })} />
      </Q>
    </div>
  );
}

function BlocoB({ form, upd }: { form: FormState; upd: (p: Partial<FormState>) => void }) {
  return (
    <div>
      <Q label="6. O que você vende?" sub="Descreva seus principais produtos ou serviços. Ex: Faço limpeza de pele, design de sobrancelha. Meu carro-chefe é o combo pele + sobrancelha.">
        <textarea rows={4} placeholder="Descreva aqui..." value={form.products} onChange={(e) => upd({ products: e.target.value })} />
      </Q>
      <Q label="7. Qual é o ticket médio por cliente?">
        <Radio options={AVG_TICKETS} value={form.avgTicket} onChange={(v) => upd({ avgTicket: v })} />
      </Q>
      <Q label="8. Como o cliente compra de você?">
        <Checkbox
          options={BUYING_CHANNELS}
          values={form.buyingChannels}
          onChange={(v) => upd({ buyingChannels: v })}
          otherValue={form.buyingChannelOther}
          onOtherChange={(v) => upd({ buyingChannelOther: v })}
        />
      </Q>
      <Q label="9. Você tem algum produto ou serviço que quer destacar agora?" optional>
        <input type="text" placeholder="Ex: Quero focar no combo pele + sobrancelha esse mês" value={form.highlightProduct} onChange={(e) => upd({ highlightProduct: e.target.value })} />
      </Q>
    </div>
  );
}

function BlocoC({ form, upd }: { form: FormState; upd: (p: Partial<FormState>) => void }) {
  return (
    <div>
      <Q label="10. Quem é o seu cliente ideal?" sub="Pode marcar mais de um.">
        <Checkbox
          options={TARGET_AUDIENCE_OPTS}
          values={form.targetAudience}
          onChange={(v) => upd({ targetAudience: v })}
          otherValue={form.targetAudienceOther}
          onOtherChange={(v) => upd({ targetAudienceOther: v })}
        />
      </Q>
      <Q label="11. O que o seu cliente mais valoriza na hora de escolher você?">
        <Checkbox
          options={CLIENT_VALUES_OPTS}
          values={form.clientValues}
          onChange={(v) => upd({ clientValues: v })}
          otherValue={form.clientValuesOther}
          onOtherChange={(v) => upd({ clientValuesOther: v })}
        />
      </Q>
      <Q label="12. Qual é a maior dor ou problema que o seu cliente resolve com você?" sub="Ex: Minha cliente quer se sentir bonita e confiante sem gastar muito tempo.">
        <textarea rows={3} placeholder="Descreva aqui..." value={form.clientPain} onChange={(e) => upd({ clientPain: e.target.value })} />
      </Q>
    </div>
  );
}

function BlocoD({
  form, upd, media, fileRef, onFileChange, onRemoveMedia,
}: {
  form: FormState;
  upd: (p: Partial<FormState>) => void;
  media: { file: File; preview: string }[];
  fileRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (i: number) => void;
}) {
  return (
    <div>
      <Q label="13. Como você descreveria o tom de voz da sua marca?">
        <Radio options={TONE_OF_VOICES} value={form.toneOfVoice} onChange={(v) => upd({ toneOfVoice: v })} />
      </Q>
      <Q label="14. Tem alguma marca que você admira no Instagram ou TikTok?" sub="Coloca o @ ou o nome. Ex: @studio.glow, @nubank. Não precisa ser do mesmo ramo." optional>
        <input type="text" placeholder="@exemplomarca" value={form.brandReferences} onChange={(e) => upd({ brandReferences: e.target.value })} />
      </Q>
      <Q label="15. Tem alguma coisa que você NÃO quer que apareça no seu conteúdo?" sub="Ex: Não quero falar de preço, não quero conteúdo muito informal." optional>
        <textarea rows={3} placeholder="Liste aqui..." value={form.contentToAvoid} onChange={(e) => upd({ contentToAvoid: e.target.value })} />
      </Q>
      <Q label="16. Você tem identidade visual definida? (logo, cores, fontes)">
        <Radio options={VISUAL_IDENTITIES} value={form.visualIdentity} onChange={(v) => upd({ visualIdentity: v })} />
      </Q>
      <Q label="17. Sobe aqui fotos ou vídeos do seu negócio que podemos usar nos posts." sub="JPG, PNG, MP4 · opcional mas muito recomendado" optional>
        <input type="file" ref={fileRef} onChange={onFileChange} accept="image/*,video/*" multiple hidden />
        <div
          onClick={() => fileRef.current?.click()}
          style={{ border: "2px dashed var(--border2)", borderRadius: 8, padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--purple)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border2)")}
        >
          <p style={{ color: "var(--muted)", fontSize: 12 }}>Clique para enviar fotos ou vídeos</p>
          <p style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>JPG, PNG, MP4 — até 50MB cada</p>
        </div>
        {media.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            {media.map((m, i) => (
              <div key={i} style={{ position: "relative", width: 72, height: 72, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border2)" }}>
                {m.file.type.startsWith("video/") ? (
                  <video src={m.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <img src={m.preview} alt={m.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveMedia(i); }}
                  style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </Q>
    </div>
  );
}

function BlocoE({ form, upd }: { form: FormState; upd: (p: Partial<FormState>) => void }) {
  return (
    <div>
      <Q label="18. Quais redes você usa hoje?">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { key: "instagramHandle", label: "Instagram", placeholder: "@handle" },
            { key: "tiktokHandle", label: "TikTok", placeholder: "@handle" },
            { key: "facebookLink", label: "Facebook", placeholder: "Link da página" },
          ].map(({ key, label, placeholder }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", width: 90, flexShrink: 0 }}>{label}</span>
              <input
                type="text"
                placeholder={placeholder}
                value={form[key as keyof FormState] as string}
                onChange={(e) => upd({ [key]: e.target.value } as Partial<FormState>)}
              />
            </div>
          ))}
          <div
            className={`checkbox-item${form.hasNoSocial ? " checked" : ""}`}
            onClick={() => upd({ hasNoSocial: !form.hasNoSocial })}
          >
            <div className="checkbox-box">{form.hasNoSocial ? "✓" : ""}</div>
            <span style={{ fontSize: 13 }}>Não tenho nenhuma ainda</span>
          </div>
        </div>
      </Q>
      <Q label="19. Com que frequência você posta hoje, sem a Vitrina?">
        <Radio options={POSTING_FREQUENCIES} value={form.postingFrequency} onChange={(v) => upd({ postingFrequency: v })} />
      </Q>
      <Q label="20. O que você já tentou fazer nas redes e não funcionou?" sub="Ex: Tentei fazer Reels mas ficava travada na frente da câmera. Contratei uma menina mas ela sumiu." optional>
        <textarea rows={3} placeholder="Conta aqui..." value={form.whatFailed} onChange={(e) => upd({ whatFailed: e.target.value })} />
      </Q>
    </div>
  );
}

function BlocoF({ form, updSD }: { form: FormState; updSD: (p: SD) => void }) {
  const qs = SEGMENT_QUESTIONS[form.segment] || [];
  const sd = form.segmentData;

  if (qs.length === 0) return null;

  function sdStr(key: string): string {
    const v = sd[key];
    return typeof v === "string" ? v : "";
  }
  function sdArr(key: string): string[] {
    const v = sd[key];
    return Array.isArray(v) ? v : [];
  }

  return (
    <div>
      {qs.map((q) => (
        <Q key={q.key} label={q.label} sub={q.sub} optional={q.optional}>
          {q.type === "radio" && q.options && (
            <Radio options={q.options} value={sdStr(q.key)} onChange={(v) => updSD({ [q.key]: v })} />
          )}
          {q.type === "checkbox" && q.options && (
            <Checkbox
              options={q.options}
              values={sdArr(q.key)}
              onChange={(v) => updSD({ [q.key]: v })}
              otherValue={sdStr(q.key + "Other")}
              onOtherChange={(v) => updSD({ [q.key + "Other"]: v })}
            />
          )}
          {q.type === "text" && (
            <input type="text" placeholder="Responda aqui..." value={sdStr(q.key)} onChange={(e) => updSD({ [q.key]: e.target.value })} />
          )}
          {q.type === "textarea" && (
            <textarea rows={3} placeholder="Responda aqui..." value={sdStr(q.key)} onChange={(e) => updSD({ [q.key]: e.target.value })} />
          )}
        </Q>
      ))}
    </div>
  );
}

// ── GERADOR DE PROMPT ────────────────────────────────────────────

function buildPrompt(form: FormState): string {
  const seg = form.segment === "Outro" && form.segmentOther ? form.segmentOther : form.segment;
  const networks = [
    form.instagramHandle && `Instagram (${form.instagramHandle})`,
    form.tiktokHandle && `TikTok (${form.tiktokHandle})`,
    form.facebookLink && `Facebook (${form.facebookLink})`,
  ].filter(Boolean).join(", ") || "redes ainda não definidas";

  const audience = [...form.targetAudience, form.targetAudienceOther]
    .filter(Boolean).join(", ");
  const values = [...form.clientValues, form.clientValuesOther]
    .filter(Boolean).join(", ");

  const sdLines = Object.entries(form.segmentData)
    .filter(([, v]) => v && (!Array.isArray(v) || v.length > 0))
    .map(([k, v]) => `  - ${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  return `
╔══════════════════════════════════════════════════════════════╗
║         PROMPT DE CONTEÚDO — VITRINA                        ║
╚══════════════════════════════════════════════════════════════╝

## CONTEXTO DO NEGÓCIO
- Nome: ${form.businessName || "—"}
- Segmento: ${seg || "—"}
- Tempo de existência: ${form.businessAge || "—"}
- Onde atende: ${form.serviceLocation || "—"}${form.cityState ? ` — ${form.cityState}` : ""}
- Funcionários: ${form.employeeCount || "—"}

## PRODUTO E SERVIÇO
- O que vende: ${form.products || "—"}
- Ticket médio: ${form.avgTicket || "—"}
- Como o cliente compra: ${form.buyingChannels.join(", ") || "—"}${form.buyingChannelOther ? `, ${form.buyingChannelOther}` : ""}
- Destaque do mês: ${form.highlightProduct || "não definido"}

## PÚBLICO-ALVO
- Cliente ideal: ${audience || "—"}
- O que mais valoriza: ${values || "—"}
- Maior dor / problema: ${form.clientPain || "—"}

## POSICIONAMENTO
- Tom de voz: ${form.toneOfVoice || "—"}
- Referências de marca: ${form.brandReferences || "—"}
- O que NÃO deve aparecer: ${form.contentToAvoid || "nada específico"}
- Identidade visual: ${form.visualIdentity || "—"}

## REDES SOCIAIS
- Redes ativas: ${networks}
- Frequência atual de posts: ${form.postingFrequency || "—"}
- O que já tentou e não funcionou: ${form.whatFailed || "não informado"}
${sdLines ? `\n## DADOS ESPECÍFICOS DO SEGMENTO\n${sdLines}` : ""}

══════════════════════════════════════════════════════════════

## INSTRUÇÃO PARA O CLAUDE

Com base nos dados acima, gere 12 posts para o mês para "${form.businessName || "este negócio"}".

Para CADA post, siga exatamente este formato:

---
POST [número] — [TIPO: Feed / Reels / Carrossel / Story] — [REDE: Instagram / TikTok]
DATA SUGERIDA: [dia do mês]
HORÁRIO: [ex: 18h00]

COPY:
[Texto completo do post com emojis e quebras de linha naturais]

HASHTAGS:
[10-15 hashtags relevantes]

CTA:
[Call-to-action específico]

PROMPT DE IMAGEM (Midjourney / DALL-E / Firefly):
[Prompt em inglês, detalhado: estilo visual, composição, iluminação, paleta de cores, elementos do negócio, mood. Sempre finalizar com: high quality, professional, --ar 4:5]
---

DIRETRIZES OBRIGATÓRIAS:
• Tom de voz: "${form.toneOfVoice || "natural e próximo"}"
• Público-alvo: ${audience || "definir com base no segmento"}
• NUNCA incluir: ${form.contentToAvoid || "nada específico"}
• Mix de conteúdo: 50% educativo/valor, 30% produto/serviço, 20% conexão/bastidores
• Para Reels e Stories: incluir também roteiro de 3-5 cenas
• Os prompts de imagem devem refletir o tom visual da marca e o segmento ${seg}
• Distribuir os 12 posts ao longo do mês (2ª, 4ª e 6ª são os melhores dias)
`.trim();
}

// ── PÁGINA PRINCIPAL ─────────────────────────────────────────────

const BLOCKS = [
  { label: "Identificação", letter: "A" },
  { label: "Produto e serviço", letter: "B" },
  { label: "Público-alvo", letter: "C" },
  { label: "Posicionamento", letter: "D" },
  { label: "Redes sociais", letter: "E" },
];

export default function Briefing() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [completed, setCompleted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<{ file: File; preview: string }[]>([]);

  useEffect(() => {
    fetch("/api/briefing")
      .then((r) => r.json())
      .then((data) => {
        if (data?.onboardingData) {
          setForm({ ...defaultForm, ...data.onboardingData });
        }
        if (data?.completed) setCompleted(true);
      })
      .catch(() => {});
  }, []);

  const hasSegmentBlock = (SEGMENT_QUESTIONS[form.segment]?.length ?? 0) > 0;
  const totalSteps = hasSegmentBlock ? BLOCKS.length + 1 : BLOCKS.length;
  const isLastStep = step === totalSteps - 1;

  function upd(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function updSD(patch: SD) {
    setForm((prev) => ({ ...prev, segmentData: { ...prev.segmentData, ...patch } }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const newMedia = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setMedia((prev) => [...prev, ...newMedia]);
    e.target.value = "";
  }

  function removeMedia(i: number) {
    setMedia((prev) => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, idx) => idx !== i);
    });
  }

  async function save(done = false) {
    setSaving(true);
    try {
      await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboardingData: form, completed: done }),
      });

      if (done) {
        const prompt = buildPrompt(form);
        console.log(prompt);

        setCompleted(true);
        setForm(defaultForm);
        setMedia((prev) => { prev.forEach((m) => URL.revokeObjectURL(m.preview)); return []; });
        setStep(0);
      }

      setSaveMsg(done ? "Briefing concluído! ✓" : "Salvo ✓");
      setTimeout(() => setSaveMsg(""), 2500);
    } catch {
      setSaveMsg("Erro ao salvar");
    }
    setSaving(false);
  }

  async function next() {
    await save(isLastStep);
    if (!isLastStep) setStep((s) => s + 1);
  }

  const blockLabels = hasSegmentBlock
    ? [...BLOCKS, { label: form.segment || "Específico", letter: "F" }]
    : BLOCKS;

  return (
    <AppShell>
      <div style={{ padding: "32px 32px 64px", maxWidth: 760 }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p className="wf-label">Onboarding</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", marginBottom: 6 }}>
            Briefing do negócio
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            Respondido uma vez, logo após o pagamento. Base permanente do cliente.
          </p>
        </div>

        {/* Completed banner */}
        {completed && (
          <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "var(--green)", fontSize: 16 }}>✓</span>
            <p style={{ fontSize: 13, color: "var(--green)" }}>Briefing completo! Você ainda pode editar qualquer campo e salvar novamente.</p>
          </div>
        )}

        {/* Progress */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
          {blockLabels.map((b, i) => (
            <div
              key={i}
              className={`cad-prog-bar${i < step ? " done" : i === step ? " active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setStep(i)}
              title={`Bloco ${b.letter}: ${b.label}`}
            />
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8, whiteSpace: "nowrap" }}>
            {step + 1} / {totalSteps}
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 28, overflowX: "auto" }}>
          {blockLabels.map((b, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`nav-btn${i === step ? " active" : ""}`}
              style={{ fontSize: 10, padding: "4px 10px", flexShrink: 0 }}
            >
              {b.letter} · {b.label}
            </button>
          ))}
        </div>

        {/* Block title */}
        <div style={{ marginBottom: 28, padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0 }}>
            {blockLabels[step]?.letter}
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>{blockLabels[step]?.label}</p>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
              {step === 0 && "Identificação do negócio"}
              {step === 1 && "Produtos e serviços oferecidos"}
              {step === 2 && "Quem é seu cliente ideal"}
              {step === 3 && "Tom de voz e identidade visual"}
              {step === 4 && "Presença nas redes sociais"}
              {step === 5 && `Perguntas específicas para ${form.segment || "seu segmento"}`}
            </p>
          </div>
        </div>

        {/* Save message */}
        {saveMsg && (
          <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 8, background: saveMsg.includes("Erro") ? "rgba(255,95,95,0.1)" : "rgba(74,222,128,0.1)", border: `1px solid ${saveMsg.includes("Erro") ? "rgba(255,95,95,0.3)" : "rgba(74,222,128,0.3)"}`, fontSize: 13, color: saveMsg.includes("Erro") ? "var(--red)" : "var(--green)" }}>
            {saveMsg}
          </div>
        )}

        {/* Block content */}
        <div className="card">
          {step === 0 && <BlocoA form={form} upd={upd} />}
          {step === 1 && <BlocoB form={form} upd={upd} />}
          {step === 2 && <BlocoC form={form} upd={upd} />}
          {step === 3 && (
            <BlocoD form={form} upd={upd} media={media} fileRef={fileRef} onFileChange={handleFileChange} onRemoveMedia={removeMedia} />
          )}
          {step === 4 && <BlocoE form={form} upd={upd} />}
          {step === 5 && <BlocoF form={form} updSD={updSD} />}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center" }}>
          {step > 0 && (
            <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
              ← Voltar
            </button>
          )}
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={next}
            disabled={saving}
          >
            {saving ? "Salvando..." : isLastStep ? "Concluir briefing ✓" : "Próximo →"}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => save(false)}
            disabled={saving}
            title="Salvar sem avançar"
          >
            Salvar
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "var(--dim)", marginTop: 12 }}>
          Suas respostas são salvas automaticamente. Você pode voltar e editar a qualquer momento.
        </p>
      </div>
    </AppShell>
  );
}
