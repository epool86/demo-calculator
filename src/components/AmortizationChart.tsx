import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AmortizationChartProps {
  principal: number;
  interestRate: number;
  tenureYears: number;
}

export function AmortizationChart({
  principal,
  interestRate,
  tenureYears,
}: AmortizationChartProps) {
  const data = [];
  let balance = principal;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;
  
  // Calculate monthly payment (PMT)
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Initial data point
  data.push({
    year: 0,
    balance: principal,
    interestPaid: 0,
    principalPaid: 0,
  });

  let totalInterest = 0;
  let totalPrincipal = 0;

  for (let i = 1; i <= totalMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    
    balance -= principalPaid;
    totalInterest += interest;
    totalPrincipal += principalPaid;

    // Add data point for each year
    if (i % 12 === 0) {
      data.push({
        year: i / 12,
        balance: Math.max(0, balance),
        interestPaid: totalInterest,
        principalPaid: totalPrincipal,
      });
    }
  }

  return (
    <div className="h-80 w-full bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
      <h3 className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider">
        Loan Balance Projection
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) =>
                new Intl.NumberFormat('en-MY', {
                  notation: 'compact',
                  compactDisplay: 'short',
                  style: 'currency',
                  currency: 'MYR',
                }).format(value)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat('en-MY', {
                  style: 'currency',
                  currency: 'MYR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              name="Loan Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
