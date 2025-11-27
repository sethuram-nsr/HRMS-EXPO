import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AdminDashBoard from "@/app/AdminDashBoard";
import Wall from "../Components/Screens/Wall";
import ProfileScreen from "../Components/Screens/Profile";
import Chat from "@/Components/Screens/Chat";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
           else if (route.name === "Chat") iconName = "chat-outline";
          else if (route.name === "Wall") iconName = "newspaper";
          else if (route.name === "Profile") iconName = "account";

          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={AdminDashBoard} />
         <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Wall" component={Wall} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
