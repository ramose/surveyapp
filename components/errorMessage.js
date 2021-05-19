import React from 'react'
import {Text} from 'react-native'

const errorMessage = msg => {
  console.log(msg);
  if (msg === undefined) {
    return <Text style={{color: 'red'}}>This is required.</Text>;
  } else {
    return <Text style={{color: 'red'}}>{msg}</Text>;
  }
};

export default errorMessage;
