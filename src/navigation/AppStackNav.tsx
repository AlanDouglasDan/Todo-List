import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Task, Calendar } from '../screens';

export type AppStackNavParams = {
  Home: undefined;
  Task: undefined;
  Calendar: { category?: any };
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

      <Stack.Screen
        name="Task"
        component={Task}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNav;
