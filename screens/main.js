import moment from 'moment'
import React, {  useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Button } from 'react-native-paper'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})

const Main = ({route, navigation}) => {

  const params = route.params

  useEffect(() => {
    // do something
  }, [])

  return(
    <View style={styles.container}>
      <View>
        <Text style={{fontSize:40, fontWeight:'bold', alignSelf: 'center', textAlign:'center'}}>{params.item.cluster_name}</Text>
        <Text style={{fontSize:20, fontWeight:'bold', alignSelf: 'center', textAlign:'center'}}>{moment(params.item.pickup_date).format('DD-MMMM-YYYY')}</Text>
        </View>
      <Button mode='contained' color='green' onPress={() => navigation.navigate('pickup')}>Mulai</Button>
      <Text>v.0.0.1</Text>
    </View>
  )
}
export default Main