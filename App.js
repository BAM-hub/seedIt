import React from 'react';
import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Auth from './screens/Auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Auth />
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
