export type ScopeDecision =
  | { decision: "allow" }
  | { decision: "refuse"; reason: "obviously_out_of_scope" };

const HARD_OUT_OF_SCOPE_PATTERNS = [
  /\bweather\b/i,
  /\btemperature\b/i,
  /\bworld cup\b/i,
  /\bsports score\b/i,
  /\brecipe\b/i,
  /\bhomework\b/i,
  /\bstock price\b/i,
  /\bbitcoin price\b/i,
  /\bmedical advice\b/i
];

export function classifyScope(question: string): ScopeDecision {
  const q = question.trim();

  if (!q) {
    return { decision: "refuse", reason: "obviously_out_of_scope" };
  }

  const isObviouslyOutOfScope = HARD_OUT_OF_SCOPE_PATTERNS.some((pattern) =>
    pattern.test(q)
  );

  if (isObviouslyOutOfScope) {
    return { decision: "refuse", reason: "obviously_out_of_scope" };
  }

  return { decision: "allow" };
}