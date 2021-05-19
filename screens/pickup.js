import React, { useEffect, useState } from "react";
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
} from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useLayoutEffect } from "react";

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

  const _updateInfo = (info) => {
    try {
      setInfo(JSON.parse(info));
    } catch (error) {
      setError(true);
    }
  };

  const _updatePhoto = (photo) => {
    // setInfo(JSON.parse(info));
    setPhoto(photo);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        // return (
        //   <Icon
        //     name="check"
        //     size={30}
        //     color="white"
        //     style={{ marginHorizontal: 10 }}
        //     onPress={() => showAlert()}
        //   />
        // );
        if (info != null && photo != null) {
          return (
            <Icon
              name="check"
              size={30}
              color="white"
              style={{ marginHorizontal: 10 }}
              onPress={() => showAlert()}
            />
          );
        }
      },
    });
  }, [info, photo]);

  const showAlert = () => {
    // Alert.alert("Ambil Sampah", "Data sudah tercatat.", [
    //   { text: "OK", onPress: () => navigation.goBack() },
    // ]);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} animationType="slide" visible={showModal}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: "transparent",
          }}
        >
          <View style={{ flex: 1 }} />
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
              Data Berhasil Disimpan!
            </Text>
            <Button
              mode="contained"
              color="green"
              onPress={() => {
                setShowModal(false);
                navigation.goBack()
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
                <Text style={styles.text}>{info.name}</Text>
                <Text style={styles.text}>No. Rumah: {info.no_rumah}</Text>
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
              <Icon
                name="minus"
                size={50}
                onPress={() => setTotal(total - step)}
              />

              <Icon
                name="plus"
                size={50}
                onPress={() => setTotal((total) => total + step)}
              />
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
