
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Login from "./Login";
import AiBot from './../AiBot';
import AdminDashBoard from '@/app/AdminDashBoard';
import EmployeeDashBoard from '@/app/EmployeeDashBoard';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Login Screen */}
        <Stack.Screen name="Login" component={Login} />

        {/* HOME WITH TABS */}
        <Stack.Screen name="AdminHome" component={BottomTabs} />
        <Stack.Screen name="EmployeeHome" component={BottomTabs} />

        {/* Other Screens */}
        <Stack.Screen name="AiBot" component={AiBot} />
        <Stack.Screen name="AdminDashBoard" component={AdminDashBoard} />
        <Stack.Screen name="EmployeeDashBoard" component={EmployeeDashBoard} />
      </Stack.Navigator>
   
  );
}
