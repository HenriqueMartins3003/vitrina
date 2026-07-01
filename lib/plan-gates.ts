export function canAccessTikTok(planName: string | null | undefined): boolean {
  return planName === "Vitrina" || planName === "Autoridade";
}

export function getPostLimit(planName: string | null | undefined): number {
  switch (planName) {
    case "Autoridade": return 30;
    case "Vitrina": return 20;
    case "Presença": return 12;
    default: return 0;
  }
}
