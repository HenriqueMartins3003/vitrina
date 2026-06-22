const logos = [
  "Barbearia do João",
  "Clínica Bella Forma",
  "Restaurante Sabor & Arte",
  "Estúdio FitLife",
  "Ótica Visão Clara",
  "Salão Encanto",
  "Pet Shop Feliz",
  "Pizzaria Bella Napoli",
  "Academia FitZone",
  "Boutique Femme",
];

export default function SocialProof() {
  const doubled = [...logos, ...logos];

  return (
    <section
      className="py-12 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">
        Negócios que confiam na Vitrina
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--dark), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--dark), transparent)",
          }}
        />

        <div className="marquee-track">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-8"
              style={{ whiteSpace: "nowrap" }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.4)",
                  flexShrink: 0,
                }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "#6b7280" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
