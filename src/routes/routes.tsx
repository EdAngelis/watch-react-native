import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useRoutes, type Stacks } from './hook/useRoutes';
import { AppRoutes } from './appRoutes/AuthRoutes';

export const stacks: Record<Stacks, React.ReactElement> = {
  Loading: <></>,
  Auth: <></>,
  App: <AppRoutes />,
};

export function Routes() {
  const stack = useRoutes();

  const Stack = stacks[stack];

  return (
    <NavigationContainer  theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
      },
    }}>
      {Stack}
    </NavigationContainer>
  );
}
