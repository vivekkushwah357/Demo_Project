import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailData = ({ route }) => {
  const { itemTitle } = route.params;
  const { itemId } = route.params;
  const { itemUser } = route.params;
  



  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'white', padding:10, borderRadius:10}}>
      <Text style={styles.title}>Detail Data</Text>
      <Text style={styles.itemId}> User Items : {itemUser}</Text>
      <Text style={styles.itemId}> User Id : {itemId}</Text>
      <Text style={styles.itemId}>{itemTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:'5%',
    backgroundColor:'lightblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
    textAlign: 'center',
  },
  itemId: {
    fontSize: 18,
    color:'black',
    marginTop:'3%',
  },    
});

export default DetailData;
