import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableHighlight,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Colors,
  IconButton,
  Subheading,
  Title,
} from "react-native-paper";
import { jadwalHariIniUrl, jadwalUrl } from "../../services/api";
import axios from "axios";
import moment from "moment";
import { ButtonGroup } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const JadwalScreen = ({ route }) => {
  const nav = useNavigation();
  const params = route.params;
  //   const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [jadwalToday, setJadwalToday] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const component1 = () => <Text>Jadwal Hari Ini</Text>;
  const component2 = () => <Text>Semua Jadwal</Text>;
  const component3 = () => <Text>ButtonGroup</Text>;

  const buttons = [{ element: component1 }, { element: component2 }];

  function updateIndex(index) {
    setSelectedIndex(index);

    if (index === 0) {
      getJadwalHariIni(params.data.id);
    } else {
      getJadwal(params.data.id);
    }
  }

  useEffect(() => {
    getJadwalHariIni(params.data.id);
  }, []);

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => (
        // <Text style={{color: 'black', paddingRight: 10}}>Reload</Text>
        <IconButton
          icon="refresh"
          color="black"
          onPress={() => {
            //   let d = JSON.parse(props.data)
            // console.log(params.data.id);

            getJadwal(params.data.id);
          }}
        />
      ),
    });
    // getJadwal
  }, []);

  function getJadwalHariIni(id) {
    setLoading(true);
    let today = moment(new Date()).format("YYYY-MM-DD");
    let path =
      jadwalHariIniUrl + today + "/" + id + "/" + params.data.id_company;

    try {
      axios
        .get(jadwalHariIniUrl + today + "/" + id + "/" + params.data.id_company)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "error") {
            Alert.alert(" ", response.data.message, [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          } else {
            let res = response.data.data;
            setData(res);
            // res.forEach((d) => {
            //   let dd = moment(d.pickup_date).format("DD-MMMM-YYYY");
            //   let temp = [];
            //   if (dd === today) {
            //     temp.push(d);
            //   }
            //   setData(temp);
            // });
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

  function getJadwal(id) {
    setLoading(true);
    try {
      axios
        .get(jadwalUrl + id + "/" + 0)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "error") {
            Alert.alert(" ", response.data.message, [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          } else {
            console.log(response.data.data);
            setData(response.data.data);
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

  function logout() {
    Alert.alert("", "Yakin akan keluar?", [
      { 
        text: "YA",
        onPress: () => nav.replace('login')
      },
      { 
        text: "TIDAK",
        style:'cancel'
      }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card style={{ margin: 10, padding: 10, borderRadius: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Title>{params.data.name}</Title>
            <Subheading>{params.data.company_name}</Subheading>
          </View>
          <Button icon="close" onPress={() => logout()}>
            Keluar
          </Button>
        </View>
      </Card>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 50, borderRadius: 10 }}
        selectedTextStyle={{ color: "white" }}
        selectedButtonStyle={{ backgroundColor: "lightgreen" }}
        textStyle={{ fontWeight: "bold" }}
      />
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator
            animating={true}
            color={Colors.green400}
            size={30}
          />
        </View>
      )}
      {!loading && data.length === 0 && (
        <View style={styles.center}>
          <Subheading>Tidak ada jadwal.</Subheading>
        </View>
      )}
      {!loading && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => "" + item.id_schedule}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                underlayColor="yellow"
                onPress={() => nav.navigate("home", { item: item })}
              >
                <View style={{ padding: 12 }}>
                  <Title>{item.cluster_name}</Title>
                  <Subheading>
                    {moment(item.pickup_date).format("DD-MMMM-YYYY")}
                  </Subheading>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default JadwalScreen;
