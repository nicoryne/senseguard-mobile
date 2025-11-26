import TemperatureChart from '../charts/TemperatureChart';

interface TemperatureDisplayProps {
  leftFoot: number;
  rightFoot: number;
  className?: string;
}

export default function TemperatureDisplay({ leftFoot, rightFoot, className = '' }: TemperatureDisplayProps) {
  return <TemperatureChart leftFoot={leftFoot} rightFoot={rightFoot} className={className} />;
}

