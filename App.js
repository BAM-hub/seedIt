import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@rneui/themed';
import Navigation from './screens/Navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
    queryCache: {
      defaultTimeToLive: Infinity,
      cachTime: Infinity,
      staleTime: Infinity,
    },
    mutations: {
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
    textLightBlack: '#4A4A4A',
    black: '#000000',
  },
  inputContainerWrapper: {
    width: '90%',
    alignItems: 'center',
  },
  inputContainerPrimary: {
    backgroundColor: 'white',
    borderBottomColor: '#FFC107',
    borderBottomWidth: 2,
  },
  textBlack: {
    color: 'black',
  },
  textlight: {
    color: '#ABC09F',
  },
  inputContainerStylePrimary: {
    borderBottomWidth: 0.5,
    borderWidth: 0.5,
    borderColor: '#ABC09F',
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
