# GabAI Sense Guard - Cursor AI Prompt for React Native + NativeWind UI Development

## Purpose
This prompt is designed to be copied and pasted into Cursor IDE to generate beautiful, consistent UI components and screens for the GabAI Sense Guard mobile app using React Native and NativeWind (Tailwind CSS for React Native).

---

## System Context

### Design System Constants
You are building a healthcare mobile app called **GabAI Sense Guard** using React Native with NativeWind styling. The app monitors diabetic neuropathy through plantar pressure analysis and gait tracking.

### Brand Colors (Reference)
- **Primary Blue**: `#4982BB` (Trust, medical, professional)
- **Accent Terracotta**: `#e7a38d` (Warmth, approachability)
- **Success Green**: `#10B981` (Positive metrics)
- **Warning Orange**: `#F59E0B` (Alerts, attention needed)
- **Error Red**: `#EF4444` (Critical alerts)
- **Neutral Light**: `#F8F9FA` (Backgrounds)
- **Neutral Dark**: `#2A2D34` (Text, headers)
- **White**: `#FFFFFF` (Cards, surfaces)

### Typography System
- **Heading Font**: Inter (Bold 700, SemiBold 600)
  - H1: 32px, Bold
  - H2: 24px, Bold
  - H3: 18px, SemiBold
  
- **Body Font**: Roboto (Regular 400, SemiBold 600)
  - Body: 16px
  - Small: 14px
  - Caption: 12px

### Key Design Principles
1. **Clean & Minimal**: Remove unnecessary elements, focus on data clarity
2. **Accessibility First**: High contrast, readable fonts, proper touch targets (min 44x44)
3. **Consistent Spacing**: Use 4px grid system (4, 8, 12, 16, 20, 24, 32, 40, 48px)
4. **Healthcare Focus**: Professional appearance, trust-building, data-centric
5. **NativeWind Best Practices**: Use Tailwind utilities over StyleSheet, mobile-first responsive design
6. **Performance**: Lazy load heavy components, optimize renders, use React.memo where appropriate

---

## Component Development Guidelines

### When Creating Components:

1. **Use NativeWind Classes**: Always prefer `className` with NativeWind (Tailwind) utilities over StyleSheet.create()
   \`\`\`typescript
   // ✅ GOOD - NativeWind
   <View className="bg-white rounded-2xl p-4 shadow-md">
   
   // ❌ AVOID - StyleSheet
   const styles = StyleSheet.create({
     card: { backgroundColor: 'white', borderRadius: 8 },
   });
   \`\`\`

2. **Color Palette**: Use explicit color hex codes or Tailwind extended colors
   \`\`\`typescript
   // ✅ Use hex or extended theme
   className="bg-[#4982BB]" // Primary blue
   className="text-[#2A2D34]" // Dark text
   \`\`\`

3. **Spacing System**: Use Tailwind spacing (p, m, gap) based on 4px grid
   \`\`\`typescript
   className="p-4"  // 16px padding
   className="gap-3" // 12px gap
   className="mb-2" // 8px margin-bottom
   \`\`\`

4. **Typography**: Apply font families and sizes via NativeWind
   \`\`\`typescript
   className="font-bold text-2xl text-[#2A2D34]" // H1 style
   className="font-normal text-base text-[#6B7280]" // Body style
   \`\`\`

5. **Shadows & Borders**: Use Tailwind shadow utilities for depth
   \`\`\`typescript
   className="shadow-lg rounded-2xl border border-gray-100"
   \`\`\`

6. **Interactive States**: Handle touch feedback with opacity changes
   \`\`\`typescript
   <Pressable 
     className="active:opacity-70"
     onPress={handlePress}
   >
     <Text>Touch Me</Text>
   </Pressable>
   \`\`\`

---

## NativeWind Configuration Setup

### tailwind.config.js
\`\`\`javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4982BB',
        'accent': '#e7a38d',
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'neutral': {
          'light': '#F8F9FA',
          'lighter': '#FFFFFF',
          'dark': '#2A2D34',
          'medium': '#6B7280',
        },
      },
      fontFamily: {
        'inter': ['inter'],
        'roboto': ['roboto'],
      },
    },
  },
  plugins: [],
};
\`\`\`

---

## Screen Component Templates

### Patient Dashboard Screen Template

\`\`\`typescript
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { getPressureHistory } from '@/services/firebase/firestore';

// Components
import FootVisualization from '@/components/ThreeD/FootVisualization';
import MetricCard from '@/components/Cards/MetricCard';
import GaitQualityChart from '@/components/Charts/GaitQualityChart';
import AlertCard from '@/components/Cards/AlertCard';

const DashboardScreen = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pressureData, setPressureData] = useState(null);
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left');
  const [leftFootLoad, setLeftFootLoad] = useState(45);
  const [rightFootLoad, setRightFootLoad] = useState(62);
  const [asymmetryPercent, setAsymmetryPercent] = useState(17);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        const data = await getPressureHistory(currentUser.uid, 1);
        if (data.length > 0) setPressureData(data[data.length - 1]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4982BB" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-6 pb-4">
        <Text className="font-inter font-bold text-2xl text-[#2A2D34]">
          Your Foot Health
        </Text>
        <Text className="font-roboto text-base text-[#6B7280] mt-1">
          Real-time pressure monitoring
        </Text>
      </View>

      {/* Gait Asymmetry Widget */}
      <View className="bg-white rounded-2xl p-5 shadow-md mb-4 border-l-4 border-[#4982BB]">
        <Text className="font-bold text-lg text-[#2A2D34] mb-3">Gait Asymmetry</Text>
        <View className="flex-row gap-3">
          {/* Left Foot */}
          <View className="flex-1">
            <View className="bg-gray-200 rounded-xl h-32 mb-2 relative overflow-hidden">
              <View 
                className="bg-gradient-to-t from-[#4982BB] to-blue-400 absolute bottom-0 w-full"
                style={{ height: `${leftFootLoad}%` }}
              />
            </View>
            <Text className="text-center font-semibold text-[#2A2D34]">Left: {leftFootLoad}%</Text>
          </View>
          {/* Right Foot */}
          <View className="flex-1">
            <View className="bg-gray-200 rounded-xl h-32 mb-2 relative overflow-hidden">
              <View 
                className="bg-gradient-to-t from-[#e7a38d] to-orange-300 absolute bottom-0 w-full"
                style={{ height: `${rightFootLoad}%` }}
              />
            </View>
            <Text className="text-center font-semibold text-[#2A2D34]">Right: {rightFootLoad}%</Text>
          </View>
        </View>
        <View className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <Text className="text-yellow-800 font-semibold">⚠️ Asymmetry Detected: {asymmetryPercent}%</Text>
        </View>
      </View>

      {/* 3D Foot Visualization */}
      <View className="px-4 py-4">
        <FootVisualization foot={selectedFoot} pressureData={pressureData} />
      </View>

      {/* Foot Toggle */}
      <View className="px-4 gap-2 flex-row justify-center mb-4">
        <Pressable
          className={`flex-1 py-3 rounded-lg items-center ${
            selectedFoot === 'left'
              ? 'bg-[#4982BB]'
              : 'bg-[#F8F9FA]'
          }`}
          onPress={() => setSelectedFoot('left')}
        >
          <Text
            className={`font-roboto font-semibold text-base ${
              selectedFoot === 'left'
                ? 'text-white'
                : 'text-[#2A2D34]'
            }`}
          >
            Left Foot
          </Text>
        </Pressable>
        <Pressable
          className={`flex-1 py-3 rounded-lg items-center ${
            selectedFoot === 'right'
              ? 'bg-[#4982BB]'
              : 'bg-[#F8F9FA]'
          }`}
          onPress={() => setSelectedFoot('right')}
        >
          <Text
            className={`font-roboto font-semibold text-base ${
              selectedFoot === 'right'
                ? 'text-white'
                : 'text-[#2A2D34]'
            }`}
          >
            Right Foot
          </Text>
        </Pressable>
      </View>

      {/* Metrics Grid */}
      <View className="px-4 py-2 gap-3">
        <MetricCard
          title="Max Pressure"
          value="425 kPa"
          status="normal"
          icon="📊"
        />
        <MetricCard
          title="Gait Quality"
          value="87%"
          status="good"
          icon="🚶"
        />
        <MetricCard
          title="Temperature"
          value="32.5°C"
          status="normal"
          icon="🌡️"
        />
      </View>

      {/* Alerts Section */}
      <View className="px-4 py-4">
        <Text className="font-inter font-semibold text-lg text-[#2A2D34] mb-3">
          Recent Alerts
        </Text>
        <AlertCard
          type="warning"
          title="High Pressure Detected"
          description="Zone 4 showing elevated pressure"
          timestamp="2 hours ago"
        />
      </View>

      {/* Charts Section */}
      <View className="px-4 py-4">
        <Text className="font-inter font-semibold text-lg text-[#2A2D34] mb-3">
          Weekly Trends
        </Text>
        <GaitQualityChart data={pressureData} />
      </View>

      {/* Spacer */}
      <View className="h-12" />
    </ScrollView>
  );
};

export default DashboardScreen;
\`\`\`

### Caregiver Dashboard Integration

### Unified Patient/Caregiver View
\`\`\`typescript
// screens/shared/UnifiedDashboard.tsx
const UnifiedDashboardScreen = ({ navigation }: any) => {
  const { currentUser, userRole } = useAuth();
  const [connectedPatients, setConnectedPatients] = useState([]);

  if (userRole === 'patient') {
    // Show patient's personal dashboard
    return <DashboardScreen navigation={navigation} />;
  } else if (userRole === 'caregiver') {
    // Show list of connected patients + their data
    return (
      <ScrollView className="flex-1 bg-white">
        <View className="px-4 pt-6 pb-4">
          <Text className="font-inter font-bold text-2xl text-[#2A2D34]">
            My Patients
          </Text>
        </View>

        {connectedPatients.map((patient: any) => (
          <Pressable
            key={patient.id}
            className="mx-4 mb-3 bg-white border border-[#E5E7EB] rounded-2xl p-4 active:opacity-70"
            onPress={() => navigation.navigate('PatientDetail', { patientId: patient.id })}
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="font-inter font-semibold text-lg text-[#2A2D34]">
                  {patient.name}
                </Text>
                <Text className="font-roboto text-sm text-[#6B7280] mt-1">
                  Last reading: {patient.lastReading}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${
                patient.status === 'normal'
                  ? 'bg-[#10B981]/10'
                  : 'bg-[#F59E0B]/10'
              }`}>
                <Text className={`font-roboto text-xs font-semibold ${
                  patient.status === 'normal'
                    ? 'text-[#10B981]'
                    : 'text-[#F59E0B]'
                }`}>
                  {patient.status}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  }
};
\`\`\`

---

## Reusable Component Examples

### MetricCard Component
\`\`\`typescript
// components/Cards/MetricCard.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface MetricCardProps {
  title: string;
  value: string | number;
  status: 'normal' | 'good' | 'warning' | 'critical';
  icon?: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  status,
  icon,
  unit,
  trend,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#4982BB';
    }
  };

  return (
    <View className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Text className="font-roboto text-sm text-[#6B7280]">{title}</Text>
          <View className="flex-row items-baseline mt-2">
            <Text className="font-inter font-bold text-2xl text-[#2A2D34]">
              {value}
            </Text>
            {unit && (
              <Text className="font-roboto text-sm text-[#6B7280] ml-1">
                {unit}
              </Text>
            )}
          </View>
        </View>
        {icon && <Text className="text-2xl">{icon}</Text>}
      </View>

      {trend && (
        <View className="flex-row items-center gap-1">
          <Text className={trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'}>
          </Text>
          <Text className="font-roboto text-xs text-[#6B7280]">
            {trend === 'up'
              ? 'Increasing'
              : trend === 'down'
              ? 'Decreasing'
              : 'Stable'}
          </Text>
        </View>
      )}

      {/* Status Indicator */}
      <View
        className="absolute top-4 right-4 w-3 h-3 rounded-full"
        style={{ backgroundColor: getStatusColor() }}
      />
    </View>
  );
};

export default MetricCard;
\`\`\`

### Alert Card Component
\`\`\`typescript
// components/Cards/AlertCard.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface AlertCardProps {
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
  onDismiss?: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  type,
  title,
  description,
  timestamp,
  onDismiss,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'error':
        return { bg: '#EF4444', light: '#FEE2E2' };
      case 'warning':
        return { bg: '#F59E0B', light: '#FEF3C7' };
      case 'info':
        return { bg: '#4982BB', light: '#DBEAFE' };
    }
  };

  const colors = getTypeColor();

  return (
    <View className={`bg-white border-l-4 rounded-lg p-4 mb-3`}
      style={{ borderLeftColor: colors.bg }}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-inter font-semibold text-base text-[#2A2D34] flex-1">
          {title}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss} className="p-1">
            <Text className="text-lg">✕</Text>
          </Pressable>
        )}
      </View>
      <Text className="font-roboto text-sm text-[#6B7280] mb-2">
        {description}
      </Text>
      <Text className="font-roboto text-xs text-[#9CA3AF]">
        {timestamp}
      </Text>
    </View>
  );
};

export default AlertCard;
\`\`\`

### Custom Button Component
\`\`\`typescript
// components/UI/Button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
}) => {
  const getStyles = () => {
    const baseClass = 'rounded-lg items-center justify-center font-semibold';
    
    let sizeClass = '';
    if (size === 'small') sizeClass = 'px-4 py-2';
    else if (size === 'medium') sizeClass = 'px-6 py-3';
    else sizeClass = 'px-8 py-4';

    let variantClass = '';
    if (variant === 'primary')
      variantClass = 'bg-[#4982BB] active:opacity-80';
    else if (variant === 'secondary')
      variantClass = 'bg-[#e7a38d] active:opacity-80';
    else if (variant === 'outline')
      variantClass = 'border-2 border-[#4982BB] active:bg-[#4982BB]/5';
    else if (variant === 'danger')
      variantClass = 'bg-[#EF4444] active:opacity-80';

    return `${baseClass} ${sizeClass} ${variantClass}`;
  };

  const getTextColor = () => {
    if (variant === 'outline') return 'text-[#4982BB]';
    return 'text-white';
  };

  return (
    <Pressable
      className={`${getStyles()} ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={`font-roboto font-semibold text-base ${getTextColor()}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
\`\`\`

---

## 3D Foot Visualization Implementation

### Key Requirements
- Use React Native OpenGL / Expo GL for 3D rendering
- Support interactive rotation and zoom
- Real-time pressure data mapping
- Transparent background
- Pressure color gradient (blue → green → yellow → red)
- Performance optimized for 60fps

### Implementation Approach
\`\`\`typescript
// components/ThreeD/FootVisualization.tsx
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';

interface FootVisualizationProps {
  foot: 'left' | 'right';
  pressureData: any;
}

const FootVisualization: React.FC<FootVisualizationProps> = ({
  foot,
  pressureData,
}) => {
  const glRef = useRef<GLView>(null);

  const onContextCreate = async (gl: any) => {
    // Initialize THREE.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ gl, antialias: true, alpha: true });
    
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Load foot model and apply pressure visualization
    // Map pressure values to colors and apply to geometry
    // Add lighting, shadows, and responsive controls

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View className="w-full h-64 rounded-2xl overflow-hidden bg-white border border-[#E5E7EB]">
      <GLView
        ref={glRef}
        onContextCreate={onContextCreate}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default FootVisualization;
\`\`\`

---

## Forms & Input Handling

### Login Form Example
\`\`\`typescript
// components/Forms/LoginForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/UI/Button';

const LoginForm = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await logIn(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="px-6 py-8">
      <Text className="font-inter font-bold text-2xl text-[#2A2D34] mb-2">
        Welcome Back
      </Text>
      <Text className="font-roboto text-base text-[#6B7280] mb-6">
        Sign in to your account
      </Text>

      {/* Email Input */}
      <View className="mb-4">
        <Text className="font-roboto font-semibold text-sm text-[#2A2D34] mb-2">
          Email
        </Text>
        <TextInput
          className="border border-[#E5E7EB] rounded-lg px-4 py-3 font-roboto text-base text-[#2A2D34]"
          placeholder="you@example.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Text className="font-roboto font-semibold text-sm text-[#2A2D34] mb-2">
          Password
        </Text>
        <TextInput
          className="border border-[#E5E7EB] rounded-lg px-4 py-3 font-roboto text-base text-[#2A2D34]"
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
      </View>

      {/* Login Button */}
      <Button
        title="Sign In"
        onPress={handleLogin}
        size="large"
        loading={loading}
      />

      {/* Sign Up Link */}
      <View className="mt-4 flex-row justify-center">
        <Text className="font-roboto text-base text-[#6B7280]">
          Don't have an account?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text className="font-roboto font-semibold text-base text-[#4982BB]">
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginForm;
\`\`\`

---

## Charts & Data Visualization

### Gait Quality Chart Example
\`\`\`typescript
// components/Charts/GaitQualityChart.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface GaitQualityChartProps {
  data: any;
}

const GaitQualityChart: React.FC<GaitQualityChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [75, 78, 82, 80, 85, 88, 87],
        color: () => '#4982BB',
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View className="bg-white rounded-2xl p-4 border border-[#E5E7EB]">
      <Text className="font-inter font-semibold text-lg text-[#2A2D34] mb-4">
        Weekly Gait Quality
      </Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: () => '#E5E7EB',
          labelColor: () => '#6B7280',
          strokeWidth: 2,
          propsForLabels: {
            fontSize: 12,
          },
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
};

export default GaitQualityChart;
\`\`\`

---

## Performance Optimization Tips

1. **Use React.memo for expensive components**
   \`\`\`typescript
   export default React.memo(MetricCard);
   \`\`\`

2. **Lazy load data with useFocusEffect**
   \`\`\`typescript
   import { useFocusEffect } from '@react-navigation/native';
   
   useFocusEffect(
     React.useCallback(() => {
       loadData();
     }, [])
   );
   \`\`\`

3. **Debounce search and filter operations**
   \`\`\`typescript
   const debouncedSearch = useCallback(
     debounce((query: string) => search(query), 500),
     []
   );
   \`\`\`

4. **Virtualize long lists**
   \`\`\`typescript
   <FlashList
     data={items}
     renderItem={renderItem}
     estimatedItemSize={100}
   />
   \`\`\`

---

## Common Implementation Patterns

### Handling Real-time Data Updates
\`\`\`typescript
useEffect(() => {
  const unsubscribe = listenToLiveData(currentUser.uid, (newData) => {
    setPressureData(newData);
    // Map pressure values to 3D model colors
    updateFootVisualization(newData);
  });

  return () => unsubscribe();
}, [currentUser]);
\`\`\`

### Tab Navigation State Persistence
\`\`\`typescript
const PatientTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      lazy: false, // Prevent remounting screens
      unmountOnBlur: false,
    }}
  >
    {/* Tab screens */}
  </Tab.Navigator>
);
\`\`\`

---

## Testing NativeWind Styles

Before deployment, ensure:
- ✅ All text passes contrast ratio tests (WCAG AA)
- ✅ Touch targets are minimum 44x44
- ✅ Fonts render correctly on different devices
- ✅ Colors display consistently on different screen types
- ✅ Responsive breakpoints work properly

---

## Next Steps

1. Copy this prompt into Cursor AI when building each screen
2. Adjust component names and data based on specific screen requirements
3. Follow the NativeWind utilities consistently across all components
4. Test on actual devices (Android & iOS) before releasing
5. Monitor performance with React DevTools Profiler

---

## Quick Reference: NativeWind Utilities

\`\`\`typescript
// Spacing
p-4 m-2 gap-3 mt-2 mb-4 px-6 py-3

// Colors
bg-[#4982BB] text-white text-[#2A2D34]

// Layout
flex flex-row items-center justify-between w-full h-64

// Typography
font-bold font-semibold text-lg text-base text-sm

// Borders & Shadows
border rounded-lg rounded-2xl shadow-md shadow-lg

// Interactive
active:opacity-70 disabled:opacity-50

// Responsive
md:text-lg lg:px-8 sm:flex-col
\`\`\`

---

**Generated for GabAI Sense Guard | React Native + NativeWind**
**Updated: 2025**
