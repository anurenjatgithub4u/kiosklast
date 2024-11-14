import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import axios from 'axios';
import {MaterialIcons} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const ChooseGame = ({route}) => {
  const areaType = route.params;

  const navigation = useNavigation();
  const [userCredits, setUserCredits] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [pressedLebelOne, setPressedLevelOne] = useState(false);
  const [pressedNational, setPressedNational] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [pressedleveltwo, setPressedleveltwo] = useState(false);
  const [pressedlevelthree, setPressedlevelthree] = useState(false);
  const [areaValue, setAreaValue] = useState(0);
  const [levelValue, setLevelValue] = useState(0);
  const [commonLevel, setCommonLevel] = useState(0);
  const [commonArea, setCommonArea] = useState(0);
  const [areaText, setAreaText] = useState('');
  const [credits, setCredits] = useState(0);
  const [winningAmt, setwinningAmt] = useState('');

  const [CountrySymbol, setCountrySymbol] = useState([]);
  const [ContinentSymbol, setContinentSymbol] = useState([]);

  const [previousWinningNumbers, setPreviousWinningNumbers] = useState([]);
  const [countryName, setcountryName] = useState([]);
  const [ContinentWinningAmount, setContinentWinningAmount] = useState([]);
  const [CountryWinningAmount, setCountryWinningAmount] = useState([]);

  const [creditsMain, setcreditsMain] = useState(false);

  const [creditsForContinentLevelOne, setcreditsForContinentLevelOne] =
    useState('');
  const [creditsForContinentLevelTwo, setcreditsForContinentLevelTwo] =
    useState('');
  const [creditsForContinentLevelThree, setcreditsForContinentLevelThree] =
    useState('');

  const [dollar, setDollar] = useState('');
  const [playingCredits, setPlayingCredits] = useState('');

  const [creditsForCountryLevelOne, setcreditsForCountryLevelOne] =
    useState('');
  const [creditsForCountryLevelTwo, setcreditsForCountryLevelTwo] =
    useState('');
  const [creditsForCountryLevelThree, setcreditsForCountryLevelThree] =
    useState('');

  const [previousWinningContinentNumbers, setPreviousWinningContinentNumbers] =
    useState([]);

  const handleButtonPress = () => {
    navigation.navigate('ChooseLevel');
  };
  const handleMainScreen = () => {
    navigation.navigate('ChooseLevel');
  };

  const fetchPreviousGameWinningNumbers = async () => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    const prod = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;

    // const dev = `https://lottery-backend-dev.vercel.app/api/v1/user/game/get-previous-game-winning-numbers/${userId}`;
    // const isProduction = Constants.executionEnvironment === 'standalone';

    try {
      const response = await fetch(prod, {
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
        setPreviousWinningNumbers(data.message.country || []);
        setPreviousWinningContinentNumbers(data.message.continent || []);
        setcountryName(data.message.countryName);
        setContinentWinningAmount(data.message.ContinentWinningAmount);
        setCountryWinningAmount(data.message.CountryWinningAmount);
        setCountrySymbol(data.message.countrySymbol);
        setContinentSymbol(data.message.ContinentCurrencySymbol);

        setcreditsForContinentLevelOne(
          data.message.creditsForContinentLevelOne,
        );
        setcreditsForContinentLevelTwo(
          data.message.creditsForContinentLevelTwo,
        );
        setcreditsForContinentLevelThree(
          data.message.creditsForContinentLevelThree,
        );

        setcreditsForCountryLevelOne(data.message.creditsForCountryLevelOne);
        setcreditsForCountryLevelTwo(data.message.creditsForCountryLevelTwo);
        setcreditsForCountryLevelThree(
          data.message.creditsForCountryLevelThree,
        );
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
    const fetchCreditss = async () => {
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let fetchedCredit = '';

        if (areaValue === '1') {
          if (levelValue === '1') {
            fetchedCredit = creditsForContinentLevelOne;
          } else if (levelValue === '2') {
            fetchedCredit = creditsForContinentLevelTwo;
          } else {
            fetchedCredit = creditsForContinentLevelThree;
          }
        } else if (areaValue === '2') {
          if (levelValue === '1') {
            fetchedCredit = creditsForCountryLevelOne;
          } else if (levelValue === '2') {
            fetchedCredit = creditsForCountryLevelTwo;
          } else {
            fetchedCredit = creditsForCountryLevelThree;
          }
        }

        // Update state variables
        setcreditsMain(fetchedCredit);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchCreditss();
  }, []);

  const checkAndNavigate = async () => {
    const areaValue = await AsyncStorage.getItem('area');
    const levelValue = await AsyncStorage.getItem('level');

    console.log(
      'check check .....',
      countryName,
      CountrySymbol,
      ContinentWinningAmount,
      CountryWinningAmount,
      areaValue,
      levelValue,
    );
    navigation.navigate('CoupenCode');
  };

  useEffect(() => {
    const fetchDataWinnigAmt = async () => {
      console.log('winning Amt fetched', winningAmt);
      try {
        // Retrieve areaValue and levelValue from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');
        const levelValue = await AsyncStorage.getItem('level');

        // Set the areaText based on the areaValue
        let winningAmount = '';

        if (areaValue === '1') {
          winningAmount = ContinentWinningAmount;
        } else if (areaValue === '2') {
          winningAmount = CountryWinningAmount;
        } else {
          // Handle other area values if needed
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the value of 'area' from AsyncStorage
        const areaValue = await AsyncStorage.getItem('area');

        // Update the state with the fetched value
        setCommonArea(parseInt(areaValue) || 0);
      } catch (error) {
        console.error('Error fetching value for "area":', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Call handlePress wherever you need to trigger the functionality

  const handlePress = async () => {
    if (!pressed) {
      // Store area value in AsyncStorage as 1 only on the first click
      await AsyncStorage.setItem('area', '1');
      // Update commonArea to 1 on the first click
    }

    await AsyncStorage.setItem('area', '1');
    setCommonArea(1);
    setDollar(ContinentWinningAmount);
    setPressed(!pressed);
    console.log('area is testing......', commonArea);
  };

  const handlePressNational = async () => {
    setPressedNational(!pressedNational);

    if (!pressedNational) {
      // Store area value in AsyncStorage as 2 when National button is clicked
      await AsyncStorage.setItem('area', '2');
    }

    await AsyncStorage.setItem('area', '2');
    setDollar(CountryWinningAmount);
    setPressed(!pressed);
    console.log('ares is testing......', commonArea);
    setCommonArea(2);
  };

  const handlePressLevelOne = async () => {
    setPressedLevelOne(!pressedLebelOne);

    if (!pressedLebelOne) {
      // Store level value in AsyncStorage as 1 when Level 1 button is clicked
      await AsyncStorage.setItem('level', '1');
    }
    await AsyncStorage.setItem('level', '1');
    setCommonLevel(1);

    if (commonArea === 2) {
      setDollar(CountryWinningAmount / 4);
      setPlayingCredits(creditsForCountryLevelOne);
    } else if (commonArea === 1) {
      setPlayingCredits(creditsForContinentLevelOne);
      setDollar(ContinentWinningAmount / 4);
    }

    console.log('level is testing......', commonLevel);
  };

  const handlePressLevelTwo = async () => {
    setPressedleveltwo(!pressedleveltwo);
    setCommonLevel(commonLevel == 1);
    if (!pressedleveltwo) {
      // Store level value in AsyncStorage as 2 when Level 2 button is clicked
      await AsyncStorage.setItem('level', '2');
      const areaValue = await AsyncStorage.getItem('area');

      console.log('level  value ', areaValue);
    }
    await AsyncStorage.setItem('level', '2');

    if (commonArea === 2) {
      setDollar(CountryWinningAmount / 2);
      setPlayingCredits(creditsForCountryLevelTwo);
    } else if (commonArea === 1) {
      setPlayingCredits(creditsForContinentLevelTwo);
      setDollar(ContinentWinningAmount / 2);
    }
    setCommonLevel(2);
    console.log('level is testing......', commonLevel);
  };

  const handlePressLevelThree = async () => {
    setPressedlevelthree(!pressedlevelthree);

    if (!pressedlevelthree) {
      // Store level value in AsyncStorage as 3 when Level 3 button is clicked
      await AsyncStorage.setItem('level', '3');
    }
    await AsyncStorage.setItem('level', '3');
    if (commonArea === 2) {
      setDollar(CountryWinningAmount);
      setPlayingCredits(creditsForCountryLevelThree);
    } else if (commonArea === 1) {
      setPlayingCredits(creditsForContinentLevelThree);
      setDollar(ContinentWinningAmount);
    }
    setCommonLevel(3);
    console.log('level is testing......', commonLevel);
  };

  function numberWithCommas(x) {
    if (x.toString().length <= 3) {
      return x.toString(); // No formatting needed for numbers with 3 or fewer digits
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Formatting for numbers with more than 3 digits
    }
  }

  function interpolateColor(color1, color2, factor) {
    const hex = c => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${hex(r)}${hex(g)}${hex(b)}`;
  }

  const color1 = '#F0C735';
  const color2 = '#D98F39';
  const midpointColor = interpolateColor(color1, color2, 0.5);

  return (
    <View
      style={{
        backgroundColor: '#BA8DF3',
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: '12%',
        height: hp(100),
      }}>
      <View style={{flexDirection: 'row', marginBottom: '8%'}}>
        <Text style={styles.welcomeText}>Choose game </Text>
      </View>

      <TouchableHighlight
        style={[
          styles.buttonContainerMain,
          {
            backgroundColor:
              commonArea == 1 ? '#31A062' : 'rgba(49, 160, 98, 0.33)',
          },
        ]}
        onPress={handlePress}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text
          style={[
            styles.buttonText,
            {color: commonArea == 1 ? 'white' : 'white'},
          ]}>
          Continental
          {'\n'}
          <Text
            style={[
              styles.buttonTextSmallTwo,
              {color: commonArea == 1 ? 'white' : 'white'},
            ]}>
            Win up to {ContinentSymbol}
            {numberWithCommas(ContinentWinningAmount)}
          </Text>
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[
          styles.buttonContainerMain,
          {
            backgroundColor:
              commonArea === 2 || areaType === 2
                ? '#31A062'
                : 'rgba(49, 160, 98, 0.33)',
          },
        ]}
        onPress={handlePressNational}
        underlayColor="#31A062" // This sets the color when the button is pressed
      >
        <Text
          style={[
            styles.buttonText,
            {color: commonArea == 2 ? 'white' : 'white'},
          ]}>
          National
          {'\n'}
          <Text
            style={[
              styles.buttonTextSmallTwo,
              {color: commonArea == 2 ? 'white' : 'white'},
            ]}>
            Win up to {CountrySymbol}
            {numberWithCommas(CountryWinningAmount)}
          </Text>
        </Text>
      </TouchableHighlight>

      <Text style={styles.chooseLevel}>Choose Level </Text>

      <TouchableHighlight
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              commonLevel === 1 ? '#31A062' : 'rgba(49, 160, 98, 0.33)',
          },
        ]}
        onPress={handlePressLevelOne}
        underlayColor="#31A062">
        <Text
          style={[
            styles.buttonText,
            {color: commonLevel === 3 ? 'white' : 'white'},
          ]}>
          Level 1{'\n'}
          {commonArea === 0 ? null : (
            <Text
              style={[
                styles.buttonTextLevelThree,
                {color: commonArea === 0 ? 'white' : 'white'},
              ]}>
              {commonArea === 1
                ? `${creditsForContinentLevelOne} Credits Win Upto ${ContinentSymbol}${numberWithCommas(
                    ContinentWinningAmount / 4,
                  )}`
                : `${creditsForCountryLevelOne} Credits Win Upto ${CountrySymbol}${numberWithCommas(
                    CountryWinningAmount / 4,
                  )}`}
            </Text>
          )}
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              commonLevel === 2 ? '#31A062' : 'rgba(49, 160, 98, 0.33)',
          },
        ]}
        onPress={handlePressLevelTwo}
        underlayColor="#31A062">
        <Text
          style={[
            styles.buttonText,
            {color: commonLevel === 3 ? 'white' : 'white'},
          ]}>
          Level 2{'\n'}
          {commonArea === 0 ? null : (
            <Text
              style={[
                styles.buttonTextLevelThree,
                {color: commonArea === 0 ? 'white' : 'white'},
              ]}>
              {commonArea === 1
                ? `${creditsForContinentLevelTwo} Credits Win Upto ${ContinentSymbol}${numberWithCommas(
                    ContinentWinningAmount / 2,
                  )}`
                : `${creditsForCountryLevelTwo} Credits Win Upto ${CountrySymbol}${numberWithCommas(
                    CountryWinningAmount / 2,
                  )}`}
            </Text>
          )}
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[
          styles.buttonContainer,
          {
            backgroundColor:
              commonLevel === 3 ? '#31A062' : 'rgba(49, 160, 98, 0.33)',
          },
        ]}
        onPress={handlePressLevelThree}
        underlayColor="#31A062">
        <Text
          style={[
            styles.buttonText,
            {color: commonLevel === 3 ? 'white' : 'white'},
          ]}>
          Level 3{'\n'}
          {commonArea === 0 ? null : (
            <Text
              style={[
                styles.buttonTextLevelThree,
                {color: commonArea === 0 ? 'white' : 'white'},
              ]}>
              {commonArea === 1
                ? `${creditsForContinentLevelThree} Credits Win Upto ${ContinentSymbol}${numberWithCommas(
                    ContinentWinningAmount,
                  )}`
                : `${creditsForCountryLevelThree} Credits Win Upto ${CountrySymbol}${numberWithCommas(
                    CountryWinningAmount,
                  )}`}
            </Text>
          )}
        </Text>
      </TouchableHighlight>

      <TouchableOpacity
        style={{
          width: '100%',
          marginVertical: 10,
          marginTop: 1,
          padding: 10,
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={checkAndNavigate}>
        <LinearGradient
          colors={
            commonLevel > 0 && commonArea > 0
              ? ['#F0C735', '#D98F39']
              : ['#F0C735', midpointColor, '#F0C735']
          } // Example colors, replace with your desired gradient colors
          style={[styles.playGameButton]}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Play Game</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    width: 354,
    height: 41,
    color: 'white',

    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
  },
  buycreditscard: {
    width: wp('83%'), // Adjust the percentage as needed
    margin: wp('0.5%'), // Responsive margin
    padding: wp('4%'), // Responsive padding
    borderRadius: wp('4%'), // Responsive borderRadius
    backgroundColor: '#F0C735',
    elevation: 3,
    height: hp('6%'), // Responsive height using heightPercentageToDP
    paddingLeft: wp('4%'), // Responsive paddingLeft
    marginRight: wp('1%'), // Responsive marginRight
    marginLeft: wp('10%'), // Responsive marginLeft
    alignSelf: 'center',
    marginTop: 10,
    marginRight: '10%',
  },

  buttonContainer: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: '2%', // Adjust margin as needed
    padding: '2%', // Adjust padding as needed
    alignItems: 'center',
    borderRadius: 20,
    height: '8%',
    alignSelf: 'center',
  },

  buttonContainerMain: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: '2%', // Adjust margin as needed
    padding: '2%', // Adjust padding as needed
    alignItems: 'center',
    borderRadius: 20,
    height: '8%',
    alignSelf: 'center',
  },

  playGameButton: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e1b411',
  },
  buttonContainerTwo: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    height: 100,
  },

  PlayGamebuttonContainer: {
    backgroundColor: '#31A062',
    width: '90%',
    marginVertical: 10,
    marginTop: 35,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },

  buttonTextSmallTwo: {
    textAlign: 'center',
    fontSize: 16,
  },

  buttonTextLevelThree: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },

  chooseLevel: {
    width: 354,
    height: 41,
    top: 10,
    left: 30,
    color: 'white',
    fontSize: 30, // Adjust the font size as needed
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: '5%',
    marginTop: 10,
  },
});

export default ChooseGame;
