import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens';

export type AppStackNavParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackNavParams>();

const AppStackNav: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNav;
