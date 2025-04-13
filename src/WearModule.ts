import {NativeModules, NativeEventEmitter} from 'react-native';

const {WearModule} = NativeModules;

if (!WearModule) {
  console.error(
    'WearModule is not linked. Make sure the native module is properly registered.',
  );
  console.warn(
    'If you are running on Android, ensure that WearModule is added to MainApplication.kt and the app is rebuilt.',
  );
}

const WearEvents = WearModule ? new NativeEventEmitter(WearModule) : null;

export const sendToWatch = async (value: string) => {
  if (!WearModule) {
    console.error('WearModule is not available.');
    return;
  }
  try {
    const res = await WearModule.sendMessageToWatch(value.toString());
    console.log('Sent to watch:', res);
  } catch (e) {
    console.error('Error sending:', e);
  }
};

export const listenFromWatch = (callback: any) => {
  if (!WearEvents) {
    console.error(
      'WearEvents is not available. Ensure the native module is properly linked.',
    );
    return () => {
      console.warn('No-op cleanup function as WearEvents is unavailable.');
    };
  }
  const subscription = WearEvents.addListener(
    'WearCounterUpdate',
    ({value}) => {
      console.log('Received from watch:', value);
      callback(value);
    },
  );

  return () => subscription.remove();
};
