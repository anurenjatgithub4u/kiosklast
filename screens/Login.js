import { StyleSheet, Text, View,Dimensions,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {  TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements'; 

import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth ,responsiveScreenHeight} from "react-native-responsive-dimensions";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [mobileNumberLogin, setMobileNumberLogin] = useState('');

  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
 

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const fetchAndConsoleStoredAccessToken = async () => {
    try {
      // Retrieve accessToken from AsyncStorage
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      const storedUserId = await AsyncStorage.getItem('userId');
      const storedCredits = await AsyncStorage.getItem('credits');
      
      // Log the stored accessToken
      console.log('Stored Access Token:', storedAccessToken);
      console.log('Stored user id:', storedUserId);
      console.log('Stored user credits agin again:', storedCredits);
      console.log('Stored refreshToken:', storedRefreshToken);


    } catch (error) {
      console.error('Error fetching stored Access Token:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const storedPushToken = await AsyncStorage.getItem('ExpoPushToken');
  
      if (!email || !password) {
        Alert.alert(
          '',
          'Please fill in all fields',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }
  
      const response = await axios.post('https://lottery-backend-dev.vercel.app/api/v1/auth/login', {
        email,
        password,
        pushNotificationToken: storedPushToken,
      });
  
      console.log("response", response);
  
      if (response.status === 200) {
        const result = response.data;
  
        console.log('User logged in successfully:', result);
  
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        const credits = result.data.user.credits;
        const userId = result.data.user._id;
        const userName = result.data.user.name;
        const userDate = result.data.user.createdAt;
        const userNumber = 1;
        // Setting the value for 'loginId' key
        
        console.log('User Details:', result.message.user);
        console.log('Access Token:', accessToken);
        console.log('Credits:', credits);
        console.log('UserId', userId);
        console.log('UserName..', userName);
        console.log('Refresh Token:', result.message.refreshToken);
  
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userDate', userDate);
        await AsyncStorage.setItem('credits', credits.toString());
        await AsyncStorage.setItem('userNumber', userNumber.toString());

        
        await new Promise(resolve => setTimeout(resolve, 2000));
         navigation.navigate('KioskLanding');
        // navigation.navigate("LocalAuthenticationScreen")
        fetchAndConsoleStoredAccessToken();
      } else {
        
  
        Alert.alert(
          '',
          'Login Failed',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
    } catch (error) {
      
      Alert.alert(
        '',
        'Login Failed',
        [{ text: error.response.data.message, onPress: () => console.log('OK Pressed') }]
      );
    } finally {
      setLoading(false);
    }
  };



  const loginWithNumber = async () => {
    try {

      const number = `${selectedCountry}${mobileNumberLogin}`
      const response = await fetch('https://lottery-backend-dev.vercel.app/api/v1/auth/login-with-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: number,
        }),
      });
      
      if (!response.ok) {
        // Handle error cases
        const errorData = await response.json();
        console.error(`Error: ${errorData.message}`);

       
        // You may want to display an error message to the user
      } else {
        // Request successful
        const responseData = await response.json();
        navigation.navigate('LoginOtp',{mobileNumber: number})
        console.log("Success",responseData); // You can handle the success response here
        // For example, display a success message to the user or redirect them
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Handle unexpected errors
    }
  };

  const loginUser = async () => {
    const storedPushToken = await AsyncStorage.getItem('ExpoPushToken');
  
    if (email && password) {
      // If email and password are provided, call handleLogin
      await handleLogin(email, password, storedPushToken);
    } else {
      // If email and password are not provided, call loginWithNumber
      await loginWithNumber(storedPushToken);
    }
  };
  return (
    <View  style={{padding:16,backgroundColor:"white",height:"100%"}}>
      <View
    style={{
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginRight: 190,
      marginTop:'8%'
    
    }}
  >
  <HeaderBackButton onPress={() => navigation.goBack()} />

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
     

      
    </View>
  </View>

  <Text style={styles.title}>Kiosk Login</Text>

  <Text style={styles.title2}>Play and Manage Your Games</Text>


  <View

style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:responsiveHeight(7),
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 20,
      
      color: 'white',  
      overflow: "hidden",}}
      
      
      >
      <TextInput
        label="Email"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:responsiveHeight(7),
        
         }}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      </View>

    


       
<View

style={{ borderColor: 'black',
      backgroundColor: 'white',
      marginTop:15,
      width: '100%',
      marginBottom: 10,
      height:responsiveHeight(7),
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 15,
      borderRadius: 20,
      
      color: 'white',  
      overflow: "hidden",}}
      
      
      >
      <TextInput
        label="Password"
        
        style={{
          color: 'white',
          backgroundColor: 'white',
          height:responsiveHeight(7),
        
         }}
         activeUnderlineColor="gray"
         secureTextEntry={!showPassword}
         value={password}
         onChangeText={setpassword}
      />
  <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: responsiveWidth(3.7), position: 'absolute', right: 0, }}
        >
       
        </TouchableOpacity>


      </View>






    {loading ? (
    <ActivityIndicator style={{ marginTop: 15 }} color="#31A062" size="large" />
  ) : (
    <Button
      mode="contained"
      onPress={loginUser}
      contentStyle={{
        height:responsiveHeight(7),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{
        backgroundColor: '#31A062',
        width: '100%',
        marginVertical: 10,
        marginTop: 15,
      }}
      
    >
      Login
    </Button>
  )}

<Text style={{ marginVertical: 10  , color: '#31A062',textAlign:'center' }}  onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  inputContainer: {
    borderWidth: 2, // Border on all sides
    borderRadius: 10, // Border radius in all corners
    borderColor: 'black', // Border color
    paddingHorizontal: 10, // Adjust as needed
    paddingVertical: 5, // Adjust as needed
    margin: 10, // Adjust as needed
  },
  input: {
    // Additional TextInput styles can be added here
  },

  
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
    fontWeight: "bold",
    marginLeft:responsiveWidth(8),
    color: "black",
  },

  title2: {
    fontSize: SCREEN_WIDTH * 0.04, // Adjust font size based on screen width
     marginBottom:responsiveScreenHeight(5),
    marginLeft:responsiveWidth(8),
    color: "black",
  },
})