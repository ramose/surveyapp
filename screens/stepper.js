import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SimpleStepper } from "react-native-simple-stepper";
import Stepper from "react-native-stepper";
import { Icon } from "react-native-vector-icons/Ionicons";

const MyStepper = () => {
  const [value, setValue] = useState(0);

  //   _valueChanged = (value) => {
  //     setValue(value);
  //   };
  return (
    <View style={styles.container}>
      {/* <SimpleStepper showText={true} valueChanged={(value) => setValue(value)} />; */}

      <Stepper
        initValue={2}
        minValue={0}
        stepValue={1}
        style={styles}
        decreaseComponent={
          <Icon family="Ionicons" name="remove" style={styles.iconStyle} />
        }
        increaseComponent={
          <Icon family="Ionicons" name="add" style={styles.iconStyle} />
        }
        valueChanged={(value) => this.onChangeDurationFilter(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerStyle: {
    flexDirection: "row",
  },
  decreaseButtonStyle: {
    padding: 0,
    borderWidth: 2,
    borderRightWidth: 1,
    borderColor: "red",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  increaseButtonStyle: {
    padding: 0,
    borderWidth: 2,
    borderLeftWidth: 1,
    borderColor: "red",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});

export default MyStepper;
