import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import Pickup from "./screens/pickup";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Scanner from "./screens/scanner";
import CameraScreen from "./screens/cameraScreen";
import Main from "./screens/main";
import * as ScreenOrientation from 'expo-screen-orientation';
import LoginScreen from "./screens/login/loginScreen";
import JadwalScreen from "./screens/jadwal/jadwal";

const stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }, []);
  
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="login">
        <stack.Screen
          name="pickup"
          component={Pickup}
          options={{
            title: "Ambil Sampah",
            headerStyle: {
              backgroundColor: "green",
            },
            headerTintColor: "white",
          }}
        />
        <stack.Screen name="scanner" component={Scanner} />
        <stack.Screen name="camera" component={CameraScreen} options={{
          title: "Kamera"
        }}/>
        <stack.Screen
          name="home"
          component={Main}
          options={{
            headerShown: true,
            title:''
          }}
        />
        <stack.Screen
          name="jadwal"
          component={JadwalScreen}
          options={{
            headerShown:false,
            title: 'Jadwal'
          }}
        />

<stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title:'Login'
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
