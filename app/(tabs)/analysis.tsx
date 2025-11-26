import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import AIInsightCard from '@/components/analysis/AIInsightCard';
import PredictionCard from '@/components/analysis/PredictionCard';
import AdviceCard from '@/components/analysis/AdviceCard';
import Card from '@/components/ui/Card';
import FAB from '@/components/ui/FAB';

export default function AnalysisScreen() {
  // Mock AI insights
  const insights = [
    {
      title: 'Pressure Pattern Detected',
      insight: 'Your left foot shows consistent high pressure in the heel region. Consider adjusting your walking pattern or footwear.',
      severity: 'warning' as const,
      icon: 'pulse',
    },
    {
      title: 'Gait Improvement',
      insight: 'Your stride symmetry has improved by 8% over the past week. Keep up the rehabilitation exercises!',
      severity: 'info' as const,
      icon: 'trending-up',
    },
    {
      title: 'Temperature Anomaly',
      insight: 'Right foot temperature is slightly elevated. Monitor for any signs of inflammation or injury.',
      severity: 'warning' as const,
      icon: 'thermometer',
    },
  ];

  const predictions = [
    {
      title: 'Risk Assessment',
      prediction: 'Based on current trends, your risk of developing complications remains low. Continue monitoring pressure patterns.',
      confidence: 87,
      timeframe: 'Next 30 days',
      trend: 'stable' as const,
    },
    {
      title: 'Gait Quality Forecast',
      prediction: 'Your gait quality is expected to improve by 12% over the next month if you maintain current exercise routine.',
      confidence: 92,
      timeframe: 'Next 4 weeks',
      trend: 'up' as const,
    },
  ];

  const advice = [
    {
      title: 'Ankle Mobility Exercises',
      advice: 'Perform 10-15 ankle circles in each direction, 3 times daily. This will help improve your gait symmetry and reduce pressure points.',
      category: 'exercise' as const,
      priority: 'high' as const,
    },
    {
      title: 'Footwear Recommendation',
      advice: 'Consider shoes with better arch support and cushioning. Your current footwear may be contributing to heel pressure.',
      category: 'lifestyle' as const,
      priority: 'medium' as const,
    },
    {
      title: 'Regular Monitoring',
      advice: 'Continue wearing the insole sensors during all walking activities. Consistent data collection improves AI predictions.',
      category: 'prevention' as const,
      priority: 'high' as const,
    },
    {
      title: 'Rest Periods',
      advice: 'Take 5-minute breaks every hour during extended walking. This helps prevent excessive pressure buildup.',
      category: 'lifestyle' as const,
      priority: 'low' as const,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1" contentContainerClassName="pb-32">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
            AI Analysis
          </Text>
          <Text className="text-base text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto' }}>
            Insights, predictions, and personalized advice
          </Text>
        </View>

        {/* AI Insights Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Insights
          </Text>
          {insights.map((insight, index) => (
            <AIInsightCard
              key={index}
              title={insight.title}
              insight={insight.insight}
              severity={insight.severity}
              icon={insight.icon}
              className="mb-3"
            />
          ))}
        </View>

        {/* Predictions Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Predictions
          </Text>
          {predictions.map((prediction, index) => (
            <PredictionCard
              key={index}
              title={prediction.title}
              prediction={prediction.prediction}
              confidence={prediction.confidence}
              timeframe={prediction.timeframe}
              trend={prediction.trend}
              className="mb-3"
            />
          ))}
        </View>

        {/* Advice Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Personalized Advice
          </Text>
          {advice.map((item, index) => (
            <AdviceCard
              key={index}
              title={item.title}
              advice={item.advice}
              category={item.category}
              priority={item.priority}
              className="mb-3"
            />
          ))}
        </View>

        {/* Additional AI Features */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Additional Analysis
          </Text>
          
          <Card className="p-4 mb-3">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-[#4982BB] items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg" style={{ fontFamily: 'Inter' }}>
                  AI
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                  Anomaly Detection
                </Text>
                <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                  2 anomalies detected in the past week
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
              The AI has identified unusual pressure patterns that may require attention.
            </Text>
          </Card>

          <Card className="p-4 mb-3">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-[#e7a38d] items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg" style={{ fontFamily: 'Inter' }}>
                  AI
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                  Pattern Recognition
                </Text>
                <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                  Walking pattern improving consistently
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
              The AI recognizes positive trends in your gait pattern over the last 2 weeks.
            </Text>
          </Card>

          <Card className="p-4 mb-3">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-[#10B981] items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg" style={{ fontFamily: 'Inter' }}>
                  AI
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                  Health Trend Analysis
                </Text>
                <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                  Overall health metrics trending upward
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
              Comprehensive analysis shows improvement across pressure, gait, and temperature metrics.
            </Text>
          </Card>
        </View>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </SafeAreaView>
  );
}

