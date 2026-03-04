import { useState, useEffect } from 'react';
import { Calculator, Home, Percent, Calendar, DollarSign, PieChart, Info, RotateCcw, Wallet } from 'lucide-react';
import { InputGroup } from './components/InputGroup';
import { ResultCard } from './components/ResultCard';
import { CostBreakdown } from './components/CostBreakdown';
import { AmortizationChart } from './components/AmortizationChart';
import {
  calculateMonthlyRepayment,
  calculateStampDutyMOT,
  calculateStampDutyLoan,
  calculateLegalFees,
} from './utils/calculator';

export default function App() {
  // State
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(4.25);
  const [tenureYears, setTenureYears] = useState(35);

  const handleReset = () => {
    setPropertyPrice(500000);
    setDownPaymentPercent(10);
    setInterestRate(4.25);
    setTenureYears(35);
  };

  // Derived values
  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  
  const monthlyRepayment = calculateMonthlyRepayment(
    loanAmount,
    interestRate,
    tenureYears
  );

  const stampDutyMOT = calculateStampDutyMOT(propertyPrice);
  const stampDutyLoan = calculateStampDutyLoan(loanAmount);
  const legalFees = calculateLegalFees(propertyPrice);
  
  const totalInterest = (monthlyRepayment * tenureYears * 12) - loanAmount;
  const totalPayment = monthlyRepayment * tenureYears * 12;

  // Estimate min income based on DSR 70% (Debt Service Ratio)
  // This assumes the loan is the only commitment, which is rarely true, but serves as a baseline.
  const minIncomeReq = monthlyRepayment / 0.7;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">
              MY Home Loan Calculator
            </h1>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight sm:hidden">
              MY Loan Calc
            </h1>
          </div>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-indigo-600" />
                Property Details
              </h2>
              
              <div className="space-y-8">
                <InputGroup
                  label="Property Price"
                  value={propertyPrice}
                  onChange={setPropertyPrice}
                  min={100000}
                  max={5000000}
                  step={10000}
                  unit="RM"
                />

                <InputGroup
                  label={`Down Payment (${downPaymentPercent}%)`}
                  value={downPaymentPercent}
                  onChange={setDownPaymentPercent}
                  min={0}
                  max={50}
                  step={1}
                  unit="%"
                />
                <div className="text-right text-sm text-slate-500 font-medium -mt-6">
                  {new Intl.NumberFormat('en-MY', {
                    style: 'currency',
                    currency: 'MYR',
                    minimumFractionDigits: 0,
                  }).format(downPaymentAmount)}
                </div>

                <InputGroup
                  label="Interest Rate"
                  value={interestRate}
                  onChange={setInterestRate}
                  min={2.0}
                  max={8.0}
                  step={0.05}
                  unit="%"
                />

                <InputGroup
                  label="Loan Tenure"
                  value={tenureYears}
                  onChange={setTenureYears}
                  min={5}
                  max={35}
                  step={1}
                  unit="Years"
                />
              </div>
            </div>

            {/* Quick Summary for Mobile */}
            <div className="bg-indigo-900 rounded-xl p-6 text-white lg:hidden">
              <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider mb-1">
                Monthly Repayment
              </div>
              <div className="text-4xl font-bold mb-4">
                {new Intl.NumberFormat('en-MY', {
                  style: 'currency',
                  currency: 'MYR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(monthlyRepayment)}
              </div>
              <div className="text-sm text-indigo-200">
                Loan Amount: {new Intl.NumberFormat('en-MY', {
                  style: 'currency',
                  currency: 'MYR',
                  compactDisplay: 'short',
                  notation: 'compact'
                }).format(loanAmount)}
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard
                label="Monthly Repayment"
                value={monthlyRepayment}
                icon={<Calendar className="w-5 h-5" />}
                className="bg-indigo-50 border-indigo-100 ring-1 ring-indigo-200 sm:col-span-2 lg:col-span-1"
              />
              <ResultCard
                label="Min Net Income"
                value={minIncomeReq}
                icon={<Wallet className="w-5 h-5" />}
                className="bg-emerald-50 border-emerald-100 ring-1 ring-emerald-200"
              />
              <ResultCard
                label="Total Interest"
                value={totalInterest}
                icon={<PieChart className="w-5 h-5" />}
              />
              <ResultCard
                label="Total Payment"
                value={totalPayment}
                icon={<DollarSign className="w-5 h-5" />}
              />
            </div>

            {/* Chart & Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AmortizationChart
                principal={loanAmount}
                interestRate={interestRate}
                tenureYears={tenureYears}
              />
              <CostBreakdown
                stampDutyMOT={stampDutyMOT}
                stampDutyLoan={stampDutyLoan}
                legalFees={legalFees}
              />
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex gap-3 items-start">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Note on Entry Costs & Eligibility</p>
                <p>
                  Legal fees and stamp duty are estimated based on standard rates. 
                  First-time home buyers may be eligible for stamp duty exemptions (e.g., i-Miliki). 
                  Minimum Net Income is estimated based on a 70% Debt Service Ratio (DSR), assuming this is your only loan.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}