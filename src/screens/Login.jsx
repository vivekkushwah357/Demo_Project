import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
        }
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };

    fetchLoginData();
  }, []);

 

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('email', values.email);
      await AsyncStorage.setItem('password', values.password);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert('Login successful');
      navigation.navigate('Start');
    } catch (error) {
      Alert.alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.loginBox}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login Screen</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <TextInput
                name="email"
                placeholder="Email Address"
                style={styles.textInput}
                onChangeText={(text) => {
                  setEmail(text);
                  handleChange('email')(text);
                }}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                placeholderTextColor={'gray'}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={{ width: '100%', marginRight: 15 }}>
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={(text) => {
                    setPassword(text);
                    handleChange('password')(text);
                  }}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!showPassword}
                  textContentType="password"
                  placeholderTextColor={'gray'}
                />

                <Pressable
                  style={{ position: 'absolute', right: 10, marginTop: 20 }}
                  onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                    <Text style={styles.show}>show</Text>
                  ) : (
                    <Text style={styles.show}>hide</Text>
                  )}
                </Pressable>
              </View>

              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.buttonView}>
                <Button
                  onPress={handleSubmit}
                  title={isLoading ? 'Logging In...' : 'LOGIN'}
                  disabled={!isValid || isLoading}
                />
              </View>
              <Text
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password?
              </Text>
            </>
          )}
        </Formik>
        {isLoading && <Loader />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
show:{
  color:'gray',
},
  loginText:{
color:'black',
fontWeight:'bold',
fontSize:21,
  },
  loginContainer: {
    justifyContent: 'center',
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
    color:'black',
    fontSize:14,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: '1%',
  },
  forgotPassword: {
    marginTop: '4%',
    color: 'blue',
    textDecorationLine: 'underline',

  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonView:{
    marginTop: '5%',
  width:'50%',
  borderRadius:10,

  }
});

export default Login;
