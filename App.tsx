import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { Routes } from './src/routes/routes';

function App(){

  return (
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
          <FlashMessage position="top" duration={3000} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
  );
}

export default App;
