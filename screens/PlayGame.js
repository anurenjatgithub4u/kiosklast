import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import axios from 'axios';


import LinearGradient from 'react-native-linear-gradient';

import {Alert} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import CoupenCode from './CoupenCode';

const PlayGame = ({route}) => {
  const {
    countryNamee,
    ContinentWinningAmount,
    CountryWinningAmount,
    customerName,
    createdAt,
    value,
    transactionId,
    kioskOwnerName,
    location,
    code,
  } = route.params;

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const navigation = useNavigation();
  const [areaText, setAreaText] = useState('');

  const [typee, setTypee] = useState('');
  const [levele, setLevele] = useState('');

  // const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
  // const [CountryWinningAmount, setCountryWinningAmount] = useState([]);
  const [countryName, setcountryName] = useState([]);
  const [Symbol, setSymbol] = useState('');

  const [totalSelectedNumbers, setTotalSelectedNumbers] = useState([]);

  const [genearalSymbol, setGeneralSymbol] = useState('');
  const [area, setArea] = useState('');
  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] =
    useState([]);

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);

  const [checkingCredits, setCheckingCredits] = useState('');
  const [drawdate, setdrawdate] = useState([]);

  const [response, setResponse] = useState(null);

  const [creditsMain, setcreditsMain] = useState(false);

  const [winnerAmt, setwinningAmt] = useState('');
  const [levelText, setLevelText] = useState('');

  const [credits, setcredits] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingTwo, setLoadingTwo] = useState(false);

  const fetchPreviousGameWinningNumbers = async () => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    const prod = `https://lottery-backend-tau.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    try {
      const response = await fetch(dev, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
        'Error fetching previous game winning numbers:',
        error.message,
      );
      throw new Error(
        'Something went wrong while fetching previous game winning numbers',
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPreviousGameWinningNumbers();

        setcountryName(data.message.countryName);
        setSymbol(data.message.countrySymbol);
        // setContinentWinningAmount(data.message.ContinentWinningAmount);
        // setCountryWinningAmount(data.message.CountryWinningAmount)
        console.log(
          'country winning numbers country winning numbers  country winning numbers country winning numbers',
          data.message.countryName,
        ); // Assuming "country" is an array
      } catch (error) {
        console.error(error.message);
        // Handle the error
      }
    };

    fetchData(); // Invoke the fetchData function when the component mounts
  }, []);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const levelValue = await AsyncStorage.getItem('level');
        if (levelValue == 1) {
          setLevele('1');
          setLevelText('1');
        } else if (levelValue == 2) {
          setLevele('2');
          setLevelText('2');
        } else if (levelValue == 3) {
          setLevele('3');
          setLevelText('3');
        } else {
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
          setTypee('Africa');
          setAreaText('Africa');
          setcountryName('Africa');
        } else if (AreaValue == 2) {
          setTypee(countryNamee);
          setAreaText(countryNamee);
          setcountryName(countryNamee);
        } else {
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
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchSymbol = async () => {
        try {
          // Retrieve areaValue from AsyncStorage
          const areaValue = await AsyncStorage.getItem('area');

          // Set the symbol based on the areaValue
          let newSymbol = '';

          if (areaValue === '1') {
            newSymbol = '$';
          } else if (areaValue === '2') {
            newSymbol = Symbol;
          } else {
            // Handle other area values if needed
          }

          // Update state variable
          setGeneralSymbol(newSymbol);
        } catch (error) {
          console.error(
            'Error fetching data from AsyncStorage:',
            error.message,
          );
        }
      };

      // Call the fetchSymbol function when the screen is focused
      fetchSymbol();

      // Cleanup function
      return () => {
        // Any cleanup code if needed
      };
    }, []), // Dependency array to ensure the effect runs only once
  );

  

  const createGame = async () => {
    try {
      const storedUserDetails = await AsyncStorage.getItem('userDetails');
      const userId = await AsyncStorage.getItem('userId');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedUserCredits = await AsyncStorage.getItem('userCredits');
      const userCredits = storedUserCredits ? parseInt(storedUserCredits) : 0;
  
      // Parse the stored JSON string to get the user details object
      const userDetails = storedUserDetails
        ? JSON.parse(storedUserDetails)
        : null;
  
      const level = levele;
      const userNewCredits = 1000;
      const gameNumber = selectedNumbers;
      const area = countryName;
  
      setLoading(true);
      console.log(
        'testing...',
        userId,
        level,
        userNewCredits,
        selectedNumbers,
        area,
        storedAccessToken,
        code,
      );
  
      const response = await axios.post(
        'https://lottery-backend-dev.vercel.app/api/v1/user/game/new-game',
        {
          userId,
          gameLevel: 2,
          credits: userNewCredits,
          selectedNumbers: gameNumber,
          gameType: area,
          couponCode: code,
          typeOfGame:'weekly'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedAccessToken}`, // Ensure you're using storedAccessToken here
          },
        },
      );
  
      const announcementDate = response.data.data.announcementDate;
      const currentDate = new Date();
  
      if (response.data.statusCode === 200) {
        console.log('if checking.....', announcementDate);
        navigation.navigate('PlayedGame', {
          gameNumber,
          currentDate: currentDate.toISOString(),
          gameType: areaText,
          gameSymbol: genearalSymbol,
          announcementDate: announcementDate,
          level: levelText,
          winnerAmt,
          customerName,
          createdAt,
          value,
          transactionId,
          kioskOwnerName,
          location,
          code,
        });
      } else {
        throw new Error(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      // Log and display the error in an alert box
      if (error.response) {
        console.error('Error response:', error.response.data);
  
        // Show an alert box with the error message
        Alert.alert(
          'Error', // Title of the alert
          error.response.data.message || 'Something went wrong', // Message from the error
          [{ text: 'OK' }] // Button to dismiss the alert
        );
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Error', 'No response from the server.', [{ text: 'OK' }]);
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message, [{ text: 'OK' }]);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const validateAndCreateGame = async () => {
    const AreaValue = await AsyncStorage.getItem('area');
    console.log(
      'checkinggg...',
      areaText,
      ContinentWinningAmount,
      CountryWinningAmount,
      winnerAmt,
      AreaValue,
      customerName,
    );
    // Check if selectedNumbers is an array and has exactly 6 numbers
    if (Array.isArray(selectedNumbers) && selectedNumbers.length === 6) {
      // Check if there are any undefined values in the selectedNumbers array
      if (selectedNumbers.includes(undefined)) {
        Alert.alert('', 'Please enter exactly 6 numbers', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        try {
          // Call your createGame function
          await createGame();
        } catch (error) {
          console.error('Error during game creation:', error);
          // Handle the error as needed
        }
      }
    } else {
      Alert.alert('', 'Please enter exactly 6 numbers', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      // Handle the case where selectedNumbers doesn't contain 6 numbers
      // You might want to display a message to the user or take appropriate action
    }
  };

  useEffect(() => {
    const fetchDataWinnigAmt = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let winningAmount = '';

        if (areaValue === '1') {
          if (levelValue === '1') {
            winningAmount = ContinentWinningAmount / 4;
          } else if (levelValue === '2') {
            winningAmount = ContinentWinningAmount / 2;
          } else {
            winningAmount = ContinentWinningAmount;
          }
        } else {
          if (levelValue === '1') {
            winningAmount = CountryWinningAmount / 4;
          } else if (levelValue === '2') {
            winningAmount = CountryWinningAmount / 2;
          } else {
            winningAmount = CountryWinningAmount;
          }
        }

        // Update state variables
        setwinningAmt(winningAmount);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchDataWinnigAmt();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataWinnigAmt = async () => {
        try {
          // Retrieve areaValue and levelValue from AsyncStorage
          const areaValue = await AsyncStorage.getItem('area');
          const levelValue = await AsyncStorage.getItem('level');

          // Set the areaText based on the areaValue
          let winningAmount = '';

          if (areaValue === '1') {
            if (levelValue === '1') {
              winningAmount = ContinentWinningAmount / 4;
            } else if (levelValue === '2') {
              winningAmount = ContinentWinningAmount / 2;
            } else {
              winningAmount = ContinentWinningAmount;
            }
          } else {
            if (levelValue === '1') {
              winningAmount = CountryWinningAmount / 4;
            } else if (levelValue === '2') {
              winningAmount = CountryWinningAmount / 2;
            } else {
              winningAmount = CountryWinningAmount;
            }
          }

          // Update state variables
          setwinningAmt(winningAmount);
        } catch (error) {
          console.error(
            'Error fetching data from AsyncStorage:',
            error.message,
          );
        }
      };

      // Call the fetchDataWinnigAmt function when the screen is focused
      fetchDataWinnigAmt();

      // Cleanup function
      return () => {
        // Any cleanup code if needed
      };
    }, []), // Dependency array to ensure the effect runs only once
  );

  const handleSelectBoxClick = index => {
    // Set the highlighted index for the initial selection of empty boxes
    setHighlightedIndex(index);
    console.log('highlited Index', highlightedIndex);
    console.log('selected numbers again', selectedNumbers);
    console.log('total numbers again', selectedNumbers.length);
  };

  const handleNumberClick = number => {
    if (highlightedIndex !== null && selectedNumbers.length < 6) {
      if (selectedNumbers.includes(number)) {
        alert('Number already selected. Please choose a different number.');
        return; // Don't proceed further
      }

      setSelectedNumbers(prevNumbers => {
        const newNumbers = [...prevNumbers];
        newNumbers[highlightedIndex] = number;
        return newNumbers;
      });

      // Move highlight to the next box
      setHighlightedIndex(prevIndex =>
        prevIndex < 5 ? prevIndex + 1 : prevIndex,
      );
    } else {
      setSelectedNumbers(prevNumbers => {
        const newNumbers = [...prevNumbers];
        newNumbers[highlightedIndex] = number;
        return newNumbers;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '5%',
          paddingTop: '10%',
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 17,
            textAlign: 'center',
            flex: 1,
            color: 'white',
            fontSize: SCREEN_WIDTH * 0.06,
          }}>
          Play Game
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {' '}
        {areaText}, Level{levelText}, {genearalSymbol}
        {winnerAmt}
      </Text>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        {/* UI for displaying selected numbers */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {selectedNumbers
            .sort((a, b) => a - b) // Sort the selected numbers in ascending order
            .slice(0, 6) // Take the first six sorted numbers
            .map((number, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectBoxClick(index)}
                style={{
                  width: SCREEN_WIDTH * 0.11,
                  height: SCREEN_WIDTH * 0.11,
                  borderRadius: SCREEN_WIDTH * 0.02,
                  margin: SCREEN_WIDTH * 0.015,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: highlightedIndex === index ? 'white' : 'white',
                  backgroundColor:
                    highlightedIndex === index ? '#31A062' : '#BA8DF3',
                  alignSelf: 'center',
                }}>
                <Text style={{color: 'white'}}>{number}</Text>
              </TouchableOpacity>
            ))}
        </View>
        {/* Display the sorted selected numbers array */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        {[...Array(60).keys()].map((number, index) => (
          <TouchableOpacity
            key={number + 1}
            onPress={() => handleNumberClick(number + 1)}
            style={{
              width: SCREEN_WIDTH * 0.1,
              height: SCREEN_WIDTH * 0.09,
              borderRadius: SCREEN_WIDTH * 0.02,
              margin: SCREEN_WIDTH * 0.01,
              marginRight: SCREEN_WIDTH * 0.02,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: highlightedIndex === index ? 'white' : 'white',
              backgroundColor: selectedNumbers.includes(number + 1)
                ? '#31A062'
                : '#BA8DF3',
            }}>
            <Text style={{color: 'white'}}>{number + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Console log the selected numbers */}

      <LinearGradient colors={['#F0C735', '#D98F39']} style={styles.doneButton}>
        <TouchableOpacity onPress={createGame}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.doneButtonText}>Done</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop:"5%",
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05, // Use a percentage of the screen width
    backgroundColor: '#BA8DF3',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06, // Adjust font size based on screen width
    fontWeight: 'bold',
    left: '120%',
    color: 'white',
  },
  bell: {
    width: 24,
    height: 24,
    top: 1,
    left: 150,
    padding: '2px 3.5px 2px 3.5px',
  },
  logout: {
    marginTop: 5,
    width: 24,
    height: 24,
    top: 1,
    left: 165,
    padding: '2px 3.5px 2px 3.5px',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    marginBottom: SCREEN_WIDTH * 0.05,
    color: 'white',
    marginRight: SCREEN_WIDTH * 0.2,
    marginBottom: '2%',
    marginTop: '3%',
    alignSelf: 'flex-start',
    marginLeft: '4%',
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  selectedNumberBox: {
    width: SCREEN_WIDTH * 0.11,
    height: SCREEN_WIDTH * 0.11,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: SCREEN_WIDTH * 0.01,
  },
  selectedNumber: {
    fontSize: SCREEN_WIDTH * 0.04,
    color: 'white',
  },
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: SCREEN_WIDTH * 0.05,
    maxWidth: SCREEN_WIDTH * 0.8, // Maximum width to ensure 6 columns
  },

  numberButton: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1,
    borderRadius: SCREEN_WIDTH * 0.02, // Make it a perfect circle
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: SCREEN_WIDTH * 0.01,
  },

  doneButton: {
    backgroundColor: '#F0C735',
    paddingVertical: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: SCREEN_WIDTH * 0.01,

    width: '85%',
    marginTop: SCREEN_WIDTH * 0.05,
    borderWidth: 2,
    borderColor: '#e1b411',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.04,
    alignSelf: 'center',
  },
  selectedNumberBoxSelected: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#31A078',
  },
});

export default PlayGame;
