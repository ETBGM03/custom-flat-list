import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';

import Home from './src/pages/Home';
import {
  CustomFlatListDarkTheme,
  CustomFlatListTheme,
} from './src/theme/AppTheme';

const App = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <ThemeProvider
      theme={isDark ? CustomFlatListDarkTheme : CustomFlatListTheme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
