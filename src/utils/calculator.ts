export const calculateMonthlyRepayment = (
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): number => {
  if (principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) return 0;

  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;

  return principal * (numerator / denominator);
};

export const calculateStampDutyMOT = (propertyPrice: number): number => {
  let duty = 0;
  let remaining = propertyPrice;

  // Tier 1: First 100k @ 1%
  const tier1 = Math.min(remaining, 100000);
  duty += tier1 * 0.01;
  remaining -= tier1;

  if (remaining <= 0) return duty;

  // Tier 2: Next 400k @ 2%
  const tier2 = Math.min(remaining, 400000);
  duty += tier2 * 0.02;
  remaining -= tier2;

  if (remaining <= 0) return duty;

  // Tier 3: Next 500k @ 3%
  const tier3 = Math.min(remaining, 500000);
  duty += tier3 * 0.03;
  remaining -= tier3;

  if (remaining <= 0) return duty;

  // Tier 4: Excess > 1M @ 4%
  duty += remaining * 0.04;

  return duty;
};

export const calculateStampDutyLoan = (loanAmount: number): number => {
  return loanAmount * 0.005;
};

export const calculateLegalFees = (price: number): number => {
  // Based on Solicitors' Remuneration Order 2023 (Simplified)
  // First 500k: 1.25%
  // Next 7M: 1.0%
  // Excess: Negotiable (often < 1%)
  
  let fee = 0;
  let remaining = price;

  // Tier 1: First 500k @ 1.25%
  const tier1 = Math.min(remaining, 500000);
  fee += tier1 * 0.0125;
  remaining -= tier1;

  if (remaining <= 0) return Math.max(fee, 500); // Minimum RM500

  // Tier 2: Next 7M @ 1.0%
  const tier2 = Math.min(remaining, 7000000);
  fee += tier2 * 0.01;
  remaining -= tier2;

  if (remaining <= 0) return fee;

  // Tier 3: Excess (simplified to 1% for estimation, though often negotiable)
  fee += remaining * 0.01;

  return Math.max(fee, 500);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
