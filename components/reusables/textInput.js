import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
  },
  input:{
    paddingTop:3,
    paddingBottom:3,
    backgroundColor:'transparent',
    fontSize:20,
    fontWeight:'bold'
  },
  label:{
    
    fontSize:20,
    color:'gray'
  },
  border: {
    height: 1,
    backgroundColor:'gray'
  },
});

const CustomTextInput = props => {
  return (
    <Controller
      control={props.control}
      render={({field: {onChange, onBlur, value}}) => (
        <View style={styles.container}>
          <Text style={styles.label}>{props.label}</Text>

          <TextInput
          secureTextEntry={props.secureTextEntry}
          style={styles.input}
            disabled={props.disabled}
            onBlur={onBlur}
            onChangeText={value => {
              onChange(value);
            }}
            value={value}
            mode="outlined"
            keyboardType={props.type}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
          />
          <View style={styles.border}/>
        </View>
      )}
      name={props.name}
      rules={{required: props.required}}
      defaultValue={props.defaultValue}
    />
  );
};

export default CustomTextInput;

CustomTextInput.propTypes = {
  label: PropTypes.string,
  control: PropTypes.object,
  style: PropTypes.object,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  secureTextEntry: PropTypes.bool
};
