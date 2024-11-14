import { StyleSheet, Text, View,Dimensions,ActivityIndicator } from 'react-native'
import React, { useState , useEffect} from 'react'
import {  TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

import { responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Alert } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const CoupenCode = ({route }) => {
  const [code,setCode] = useState("");
  const [password,setpassword] = useState("");
  const [typee,setTypee] = useState("");
  const [levele,setLevele] = useState("");
  const [countryNamee,setcountryName] = useState("");

  const [loading, setLoading] = useState(false);


  const [CountrySymbol, setCountrySymbol] = useState([]);
  const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
  const [CountryWinningAmount, setCountryWinningAmount] = useState([]);
  const [customerrName, setcustomerName] = useState("");


  const navigation = useNavigation();

 
    const fetchPreviousGameWinningNumbers = async () => {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      const userId = await AsyncStorage.getItem("userId");
  
      const prod = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;
  

  
      
  
      try {
        const response = await fetch(prod, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(
          "Error fetching previous game winning numbers:",
          error.message
        );
        throw new Error(
          "Something went wrong while fetching previous game winning numbers"
        );
      }
    };

   


  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchPreviousGameWinningNumbers();
         
          setcountryName(data.message.countryName);
          setContinentWinningAmount(data.message.ContinentWinningAmount);
          setCountryWinningAmount(data.message.CountryWinningAmount)
          setCountrySymbol(data.message.countrySymbol)
        
          console.log("country winning numbers country winning numbers  country winning numbers country winning numbers", data.message.countryName)// Assuming "country" is an array
        } catch (error) {
          console.error(error.message);
          // Handle the error
        }
      };
  
      fetchData(); // Invoke the fetchData function when the component mounts
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          try {
            const data = await fetchPreviousGameWinningNumbers();
           
           setcountryName(data.message.countryName);
          setContinentWinningAmount(data.message.ContinentWinningAmount);
          setCountryWinningAmount(data.message.CountryWiningAmount)
          setCountrySymbol(data.message.countrySymbol)
        
           
            // setContinentWinningAmount(data.message.ContinentWinningAmount);
            // setCountryWinningAmount(data.message.CountryWinningAmount)
            console.log("country winning numbers country winning numbers  country winning numbers country winning numbers", data.message.countryName)// Assuming "country" is an array
          } catch (error) {
            console.error(error.message);
            // Handle the error
          }
        };
    
        fetchData(); // Invoke the fetchData function when the screen is focused
    
        // Cleanup function
        return () => {
          // Any cleanup code if needed
        };
      }, []) // Dependency array to ensure the effect runs only once
    );
    const verifyCouponBeforeGame = async () => {
      console.log("Winning amounts....", CountryWinningAmount, ContinentWinningAmount, countryNamee);
    
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
    
      const gameLevel = levele;
      const gameType = typee;
    
      try {
        setLoading(true);
    
        // Log the data before making the request
        console.log("Sending data:", { code, gameType, gameLevel });
    
        const response = await axios.post(
          'https://lottery-backend-dev.vercel.app/api/v1/user/verify-coupon-before-game',
          { code, gameType, gameLevel },
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`
            }
          }
        );
    
        // Check if response status is OK
        if (response.status === 200 && response.data.success) {
          // Log success response
          console.log("Success response:", response.data);
    
          // Navigate to PlayScreen
          navigation.navigate('PlayScreen', { 
            countryNamee, 
            ContinentWinningAmount, 
            CountryWinningAmount,
            customerName: response.data.data.customerName,
            createdAt: response.data.data.createdAt,
            value: response.data.data.value,
            transactionId: response.data.data.transactionId,
            kioskOwnerName: response.data.data.generatedBy.kioskOwnerName,
            location: response.data.data.generatedBy.location,
            code
          });
    
          // Log navigation success
          console.log("Navigating to PlayScreen with data:", {
            countryNamee, ContinentWinningAmount, CountryWinningAmount,
            customerName: response.data.data.customerName,
            createdAt: response.data.data.createdAt,
            value: response.data.data.value,
            transactionId: response.data.data.transactionId,
            kioskOwnerName: response.data.data.generatedBy.kioskOwnerName,
            location: response.data.data.generatedBy.location,
            code
          });
    
          // Update customerName state
          setcustomerName(response.data.data.customerName);
    
        } else {
          console.log("Error in response data:", response.data);
        }
    
      } catch (error) {
        // Log the error details
        console.error("Error in axios request:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    


   



  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const levelValue = await AsyncStorage.getItem('level');
        if (levelValue == 1) {
          setLevele("1");
        }else if(levelValue == 2){
          setLevele("2");
        }else if(levelValue == 3){
          setLevele("3");
        }else{

        }
      } catch (error) {
        console.error('Error fetching level:', error);
      }
    };

    fetchLevel(); // Call fetchLevel function when component mounts

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const AreaValue = await AsyncStorage.getItem('area');
        if (AreaValue == 1) {
          setTypee("Africa");
        } else {
          setTypee(countryNamee);
        }
      } catch (error) {
        console.error('Error fetching level:', error);
      }
    };
  
    fetchArea(); // Call fetchLevel function when component mounts
  
    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [countryNamee]);
  
  const navi= async () => {
     console.log("again check check",typee)
    navigation.navigate('PlayScreen',{countryNamee,ContinentWinningAmount,CountryWinningAmount})
  }
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
  
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
     

      
    </View>
  </View>

  <Text style={styles.title}>Coupon Code</Text>

  <Text style={styles.title2}>Enter your kiosk coupon code</Text>

  <View
    style={{
        backgroundColor: '#B6B6B4',
        borderRadius: 20,
        padding: .8,

        marginBottom: 6,
        shadowColor: '#363636',
     
        
        borderLeftWidth:0,
            borderRightWidth:0,
        width:'100%',
        borderColor:'#363636'
    }}
>

    <TextInput
      label="Enter Code"
     

      style={{
        color: 'white',
        width: '100%',
        height: 60.5,
        borderBottomColor: 'white',
        borderBottomWidth: 0,
        borderLeftWidth:.2,
        borderRightWidth:.2,
        borderTopWidth:.2,
        backgroundColor:'white',
        borderRadius: 20,
        overflow:'hidden',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }}

    activeUnderlineColor="gray"
      keyboardType="email-address"
      autoCapitalize="none"
      value={code}
      onChangeText={setCode}
    />

    </View>

    {loading ? (
    <ActivityIndicator style={{ marginTop: 15 }} color="#31A062" size="large" />
  ) : (

    <Button onPress={verifyCouponBeforeGame} style={{ backgroundColor: 'green', marginTop: 10 }}>
  <Text style={{ color: 'white' }}>
    Done
  </Text>
</Button>
  )}

   

    </View>
  )
}

export default CoupenCode

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