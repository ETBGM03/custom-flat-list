import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {ProductContextProvider} from './src/context/product-context';

import Home from './src/screens/Home';
import {
  CustomFlatListDarkTheme,
  CustomFlatListTheme,
} from './src/theme/AppTheme';

const App = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <ThemeProvider
      theme={isDark ? CustomFlatListDarkTheme : CustomFlatListTheme}>
      <ProductContextProvider>
        <Home />
      </ProductContextProvider>
    </ThemeProvider>
  );
};

export default App;
