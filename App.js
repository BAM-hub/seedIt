import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@rneui/themed';
import Auth from './screens/Auth';
import CameraComponent from './components/CameraComponent';
import Navigation from './screens/Navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const theme = createTheme({
  colors: {
    primary: '#357960',
    secondary: '#ABC09F',
    accent: '#FFC107',
    natural: '#CBD7BF',
    naturalComplement: '#FAEED9',
    white: '#FFFFFF',
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ThemeProvider theme={theme}>
          {/* <Auth /> */}
          {/* <CameraComponent /> */}
          <Navigation />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
