import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={{flex: 1, position: 'absolute'}}>
      <View
        style={{
          height:'50%',
          width:'100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          backgroundColor:'white',
        }}>
        <ActivityIndicator size="large" color={'BLUE'} />
      </View>
    </View>
  );
};

export default Loader;
