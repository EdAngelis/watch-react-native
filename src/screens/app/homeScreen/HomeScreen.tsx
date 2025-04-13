import { useEffect, useState } from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendToWatch, listenFromWatch } from '../../../WearModule';


export function HomeScreen() {
  const [lastTap, setLastTap] = useState('');

  useEffect(() => {
    console.log('HomeScreen mounted');
    const unsubscribe = listenFromWatch((value: string) => {
      console.log('Received from watch:', value);
      setLastTap(value === '0' ? 'Right tap' : 'Left tap');
    });
    return unsubscribe;
  }, []);

  return (
    // Temporario
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Last tap from Wear OS: {lastTap}</Text>
      <Button title="Send 'Hi' to watch" onPress={() => sendToWatch('hi')} />
    </SafeAreaView>
  );
}
