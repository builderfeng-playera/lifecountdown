import { Heart, Wind, Clock, Calendar } from "lucide-react";

interface LifeMetrics {
  age: number;
  remainingYears: number;
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingHeartbeats: number;
  remainingBreaths: number;
  lifeExpectancy: number;
}

interface LifeCountdownDisplayProps {
  metrics: LifeMetrics;
}

export function LifeCountdownDisplay({ metrics }: LifeCountdownDisplayProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color 
  }: {
    icon: any;
    title: string;
    value: string;
    subtitle: string;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 mr-3" style={{ color }} />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600">{subtitle}</div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Life Countdown</h2>
        <p className="text-gray-600">
          Based on age {metrics.age} and average life expectancy of {metrics.lifeExpectancy} years
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          icon={Heart}
          title="Remaining Heartbeats"
          value={formatNumber(metrics.remainingHeartbeats)}
          subtitle="At ~70 beats per minute"
          color="#ef4444"
        />
        
        <MetricCard
          icon={Wind}
          title="Remaining Breaths"
          value={formatNumber(metrics.remainingBreaths)}
          subtitle="At ~15 breaths per minute"
          color="#3b82f6"
        />
        
        <MetricCard
          icon={Calendar}
          title="Remaining Years"
          value={metrics.remainingYears.toString()}
          subtitle={`${formatNumber(metrics.remainingDays)} days left`}
          color="#10b981"
        />
        
        <MetricCard
          icon={Clock}
          title="Remaining Hours"
          value={formatNumber(metrics.remainingHours)}
          subtitle={`${formatNumber(metrics.remainingMinutes)} minutes left`}
          color="#f59e0b"
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-gray-700 text-lg leading-relaxed">
          💭 <strong>Remember:</strong> These numbers are based on averages and are meant to inspire, not frighten. 
          Every heartbeat and breath is precious. Make them count by living fully, loving deeply, and pursuing what matters most to you.
        </p>
      </div>
    </div>
  );
}
