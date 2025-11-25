import { useFonts } from 'expo-font';
import {
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_400Regular,
} from '@expo-google-fonts/inter';
import {
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

export const useAppFonts = () => {
  const [loaded] = useFonts({
    'inter-bold': Inter_700Bold,
    'inter-semibold': Inter_600SemiBold,
    'inter-regular': Inter_400Regular,
    'roboto-regular': Roboto_400Regular,
    'roboto-medium': Roboto_500Medium,
    'roboto-bold': Roboto_700Bold,
  });

  return loaded;
};

export const FONTS = {
  h1: { fontFamily: 'inter-bold', fontSize: 32, lineHeight: 38 },
  h2: { fontFamily: 'inter-bold', fontSize: 24, lineHeight: 32 },
  h3: { fontFamily: 'inter-semibold', fontSize: 18, lineHeight: 26 },
  body: { fontFamily: 'roboto-regular', fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: 'roboto-regular', fontSize: 14, lineHeight: 21 },
  button: { fontFamily: 'roboto-medium', fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: 'roboto-regular', fontSize: 12, lineHeight: 18 },
};

