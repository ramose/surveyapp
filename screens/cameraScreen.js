import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather'

const CameraScreen = ({route}) => {
  const navigation = useNavigation()
  const param = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __takePicture = async () => {
    try {
      if (!camera) return;

      
      
      const photo = await camera.takePictureAsync({quality:0.3});
      // console.log(photo);

      setPreviewVisible(true);
      setCapturedImage(photo);
    } catch (error) {
      console.log(error);
    }
  };

  const CameraPreview = ({ photo }) => {
    console.log("sdsfds", photo);
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCapturedImage(false);
            setPreviewVisible(false);
          }}
          style={{
            position: "absolute",
            bottom: 80,
            right: 20,
            zIndex: 20,
            width: 50,
            height: 50,
            borderRadius: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Text>Ulang</Text> */}
          <Icon name='x' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            param.onReceiveValue(photo)
            navigation.goBack()
          }}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 20,
            width: 50,
            height: 50,
            borderRadius: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Text>Ambil</Text> */}
          <Icon name='check' size={30}/>
        </TouchableOpacity>
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
        <Camera
          style={{ flex: 1 }}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                >
                  <Icon name='camera' size={20}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      )}
      {/* <Button title="take picture" onPress={__takePicture} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default CameraScreen