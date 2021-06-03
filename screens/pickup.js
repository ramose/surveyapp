import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Modal from "react-native-modal";
import axios from "axios";
import { urlPostData } from "../services/api";
import { LogBox } from "react-native";
import { TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  card: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    width: "auto",
  },
  text: {
    fontSize: 18,
  },
  cardFloat: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    width: "90%",
    position: "absolute",
    bottom: 20,
  },
});

const Pickup = () => {
  const navigation = useNavigation();
  // const { width, height } = useWindowDimensions();
  const [info, setInfo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [total, setTotal] = useState(1.0);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const step = 0.25;
  const [alertMessage, setAlertMessage] = useState("");
  const user = useRef(null);
  const [busy, setBusy] = useState(false);

  // LogBox.ignoreWarnings([
  //   'Non-serializable values were found in the navigation state',
  // ]);

  LogBox.ignoreAllLogs(true);

  const _updateInfo = (info) => {
    let s = info.split("|");
    // let sJson = JSON.parse(s)
    // console.log(s.owner);

    try {
      setInfo(s);
    } catch (error) {
      setError(true);
      setAlertMessage("Tidak dapat membaca data");
      setShowModal(true);
    }
  };

  const _updatePhoto = (photo) => {
    // setInfo(JSON.parse(info));
    setPhoto(photo);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        // if (info != null && photo != null) {
        return (
          <Icon
            name="send"
            size={30}
            color="white"
            style={{ marginHorizontal: 10 }}
            onPress={() => postData()}
          />
        );
        // }
      },
    });
  }, [info, photo]);

  useEffect(() => {
    getUser();
  }, []);

  function updateVolume(add) {
    
    if (add) {
      setTotal((total) => total + step);
    } else {
      if (total > 0) {
        setTotal((total) => total - step);
      }
    }
  }

  async function getUser() {
    try {
      let _user = await AsyncStorage.getItem("@user");
      // console.log(_user)
      user.current = JSON.parse(_user);
    } catch (e) {
      // saving error
      console.log("error get data:", e);
    }
  }

  function postData() {
    // console.log(user.current.id)
    setBusy(true);

    let data = {
      collector_id: user.current.id.toString(),
      id_home: info[0],
      id_cluster: info[6],
      id_housing: info[4],
      volume: total.toString(),
      pictures: photo.uri,
    };

    // console.log(data);

    const formData = new FormData();
    formData.append("collector_id", user.current.id.toString());
    formData.append("id_home", info[0]);
    formData.append("id_cluster", info[6]);
    formData.append("id_housing", info[4]);
    formData.append("volume", total.toString());
    formData.append("photo", {
      uri: photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    // console.log("urlPostData:", urlPostData);

    axios({
      url: urlPostData,
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // console.log("res:", res.status);
        if (res.status === 201) {
          setBusy(false);
          setAlertMessage("Data berhasil disimpan!");
          setShowModal(true);
        }
      })
      .catch((err) => console.log("err:", err));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={false} animationType="slide" visible={true}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator animating={true} size='large' />
          <Text style={{fontSize:30}}>Menyimpan data...</Text>
        </View>
      </Modal>
      <Modal transparent={false} animationType="slide" visible={showModal}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
          {/* <View style={{ flex: 1 }} /> */}
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontSize: 16,
                textAlignVertical: "center",
              }}
            >
              {alertMessage}
            </Text>
            <Button
              mode="contained"
              color="green"
              onPress={() => {
                setShowModal(false);
                if (!error) {
                  navigation.goBack();
                }
              }}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setError(false);
          navigation.navigate("scanner", { onReceiveValue: _updateInfo });
        }}
      >
        <Card style={styles.card}>
          <View>
            <Title>Kode Rumah</Title>
            {info === null && !error && (
              <Text>Pindai kode yang ada di rumah</Text>
            )}
            {error && (
              <Text style={{ color: "red" }}>Kode tidak dikenali!</Text>
            )}
            {info != null && (
              <View>
                <Text style={styles.text}>{info[1]}</Text>
                <Text style={styles.text}>No. Rumah: {info[2]}</Text>
              </View>
            )}
          </View>
        </Card>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("camera", { onReceiveValue: _updatePhoto })
        }
      >
        <Card style={styles.card}>
          <View>
            <Title>Foto</Title>
            {photo === null && <Text>Ambil foto sampah</Text>}
            {photo != null && (
              <View>
                <Image
                  source={{ uri: photo && photo.uri }}
                  style={{
                    // width: 120,
                    height: 120,
                    resizeMode: "contain",
                  }}
                />
              </View>
            )}
          </View>
        </Card>
      </Pressable>

      <Card style={styles.card}>
        <View>
          <Title>Banyak Sampah</Title>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 50 }}>{total}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight onPress={() => updateVolume(false)} underlayColor='yellow'>
              <Icon
                name="minus"
                size={50}
                
              />
              </TouchableHighlight>

              <TouchableHighlight onPress={() => updateVolume(true)} underlayColor='yellow'>
              <Icon
                name="plus"
                size={50}
                
              />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Card>

      {/* <Card style={styles.cardFloat}>
        <View>
          <Title>Simpan</Title>
        </View>
      </Card> */}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};
export default Pickup;
