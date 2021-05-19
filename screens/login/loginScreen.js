import React, { useState } from "react";
// import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
// import * as firebase from 'firebase';

import { Text, Button } from "react-native-paper";
import { loginUrl } from "../../services/api";
import Services from "../../services/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/reusables/textInput";
import { useForm } from "react-hook-form";
import errorMessage from "../../components/errorMessage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("supir2");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  function onSubmit(data) {
    console.log("submit");
    // onLogin(data);
    login(data);
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@user", value);
    } catch (e) {
      // saving error
    }
  };

  const onLogin = async (data) => {
    setLoading(true);

    try {
      let response = await fetch(Services.loginUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      setLoading(false);

      let json = await response.json();

      if (json.status === "error") {
        Alert.alert(" ", json.message, [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      } else {
        storeData(username);
        navigation.navigate("Main");
      }

      // console.log('login:',json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function login(data) {
    console.log("url:", loginUrl);
    setLoading(true);

    //* post

    axios
      .post(loginUrl, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        
        if (response.data.status === "error") {
          Alert.alert(" ", response.data.message, [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        } else {
            // console.log('id:',response.data.data.id);
        //   storeData(JSON.stringify(response.data.data));
            navigation.navigate('jadwal', {data: response.data.data});
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  // const errorMessage = msg => {
  //   console.log(msg);
  //   if (msg === undefined) {
  //     return <Text style={{color: 'red'}}>This is required.</Text>;
  //   } else {
  //     return <Text style={{color: 'red'}}>{msg}</Text>;
  //   }
  // };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      {/* <StatusBar style="auto" translucent backgroundColor="#f7f7f7" /> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require('../../../assets/images/login.png')}
            />
          </View> */}

        <Text
          style={{
            fontSize: 40,
            marginVertical: 20,
            fontWeight: "bold",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Carbon Picker
        </Text>

        <View
          style={{
            width: Dimensions.get("window").width * 0.8,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "#fff",
          }}
        >
          {/* <Text
              style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                padding: 30,
              }}
              size="h3">
              Login
            </Text> */}

          {errors.username && errorMessage()}
          <CustomTextInput
            label="Username"
            control={control}
            name="username"
            required={true}
            defaultValue={username}
          />

          {errors.password && errorMessage()}
          <CustomTextInput
            label="Password"
            control={control}
            name="password"
            required={true}
            secureTextEntry={true}
            defaultValue={password}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{
              marginTop: 20,
            }}
            disabled={loading}
          >
            {loading ? "Loading" : "LOGIN"}
          </Button>

          {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
              }}>
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace('Register');
                }}>
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                  }}>
                  Register here
                </Text>
              </TouchableOpacity>
            </View> */}
          {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace('ForgetPassword');
                }}>
                <Text style={{fontWeight: 'bold'}}>Forget password</Text>
              </TouchableOpacity>
            </View> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
