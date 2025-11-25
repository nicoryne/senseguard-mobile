import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { COLORS } from '../../lib/colors';

const { width } = Dimensions.get('window');

interface Props {
  foot: 'left' | 'right';
}

const FootVisualization: React.FC<Props> = ({ foot }) => {
  const flipped = foot === 'right' ? { transform: [{ scaleX: -1 }] } : null;

  return (
    <View style={styles.container}>
      <Svg
        width={width * 0.7}
        height={200}
        viewBox="0 0 200 400"
        style={flipped || undefined}
      >
        <Defs>
          <LinearGradient id="heatmap" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.pressure.critical} />
            <Stop offset="40%" stopColor={COLORS.pressure.high} />
            <Stop offset="70%" stopColor={COLORS.pressure.moderate} />
            <Stop offset="100%" stopColor={COLORS.pressure.low} />
          </LinearGradient>
        </Defs>
        <Path
          d="M63 8c-13 6-18 21-20 34-5 35-22 62-29 97-7 33-6 70 12 99 12 19 29 35 35 57 4 14 10 27 22 35 15 11 38 13 54 2 15-10 20-29 25-45 8-23 23-42 31-65 12-36 16-79 2-115-9-25-26-46-43-66C137 30 118 5 90 3 81 2 71 3 63 8Z"
          fill="url(#heatmap)"
          opacity={0.9}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.surface.background,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default FootVisualization;



