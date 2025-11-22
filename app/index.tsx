// import Geolocation from '@react-native-community/geolocation';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login"
// import EmployeeDetails from './EmployeeDetails';
import AiBot from './../AiBot';
// import Forgotpassword from './Forgotpassword';
// import Setpassword from './Setpassword';
import Time_sheet from './../Time_sheet';
import { RootSiblingParent } from 'react-native-root-siblings';
import AdminDashBoard from '@/app/AdminDashBoard';
import EmployeeDashBoard from '@/app/EmployeeDashBoard';
import { Text } from "react-native";
// import UserDetails from './UserProfile';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <RootSiblingParent>
    // <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'SAG TECH' }}
        />
        {/* <Stack.Screen name="Timesheet" component={Time_sheet} />  */}
         <Stack.Screen
          name="AdminDashBoard"
          component={AdminDashBoard}
          options={({ navigation }) => ({
            title: "Admin Dashboard",
            headerShown: false,

            headerRight: () => (
              <Text
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }}
                style={{
                  color: "red",
                  marginRight: 15,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Logout
              </Text>
            ),
          })}
        />
        <Stack.Screen name="EmployeeDashBoard" component={EmployeeDashBoard} />
        <Stack.Screen name="Alphadot Chatbot" component={AiBot} />
        {/* <Stack.Screen name="EmpAttendence" component={EmpAttendence} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
        <Stack.Screen name="Setpassword" component={Setpassword} />
        {/* <Stack.Screen name="Userprofile" component={UserDetails} /> */}
      </Stack.Navigator>
    // </NavigationContainer>

    // </RootSiblingParent>
  );
};

