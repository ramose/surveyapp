import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { ButtonGroup, ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listRumahUrl } from '../services/api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const Main = ({ route, navigation }) => {
  const params = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [priviledge, setPriviledge] = useState(null)
  const [user, setuser] = useState(null)
  const [listRumah, setListRumah] = useState([])
  const component1 = () => <Text>Aktifitas</Text>;
  const component2 = () => <Text>Daftar Rumah</Text>;
  const [loading, setLoading] = useState(false)

  const buttons = [{ element: component1 }, { element: component2 }];

  const listhh = [
    {
      nama: "Pak Agung Sentosa",
      no: 1,
      done: true,
    },
    {
      nama: "Mambo Jambo",
      no: 2,
      done: true,
    },
    {
      nama: "Pak Keluarga Cemara",
      no: 3,
      done: false,
    },
    {
      nama: "Bu Lurah",
      no: 6,
      done: false,
    },
    {
      nama: "Timothy Dalton",
      no: 8,
      done: false,
    },
  ];

  function updateIndex(index) {
    setSelectedIndex(index);
  }

  useEffect(() => {
    getUser()
  }, []);

  useEffect(() => {
    getRumah()
  }, [user]);
  

  const getUser = async (value) => {
    try {
      let user = await AsyncStorage.getItem('@user')
      setuser(user)
    } catch (e) {
      // saving error
      console.log('error get data:', e)
    }
  };

  function getRumah() {
    setLoading(true);
    try {
      axios
        .get(listRumahUrl + "/privilege=" + user.priviledge + "&id_user=" + user.id) //privilege={{privilege}}&id_user={{id_user}}
        .then((response) => {
          // console.log(response.data);
          if (response.data.status === "error") {
            Alert.alert(" ", response.data.message, [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          } else {
            // console.log('------- list rumah ----------------');
            // console.log(response.data.data);
            // setData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("error:", error);
    }
  }

  // const listRumah = () => {};

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 50, borderRadius: 10 }}
        selectedTextStyle={{ color: "white" }}
        selectedButtonStyle={{ backgroundColor: "lightgreen" }}
        textStyle={{ fontWeight: "bold" }}
      />

      <View style={{ flex: 1 }}>
        {selectedIndex === 0 && (
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {params.item.cluster_name}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              {moment(params.item.pickup_date).format("DD-MMMM-YYYY")}
            </Text>
            <Button
              mode="contained"
              color="green"
              onPress={() => navigation.navigate("pickup")}
            >
              Mulai
            </Button>
          </View>
        )}
        {selectedIndex === 1 && (
          <FlatList
            data={listhh}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => {
              return (
                <View style={{ width: Dimensions.get("window").width }}>
                  <ListItem bottomDivider>
                    {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                    <ListItem.Content>
                      <ListItem.Title>{item.nama}</ListItem.Title>
                      <ListItem.Subtitle>No. Rumah{item.no}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Text style={{color: item.done?'green':'red'}}>{item.done===false?'Belum':'Sudah'}</Text>
                  </ListItem>
                </View>
              );
            }}
          />
        )}
      </View>
      <Text>v.0.0.1</Text>
    </View>
  );
};
export default Main;
