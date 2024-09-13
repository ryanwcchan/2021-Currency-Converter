import React, { useState, useContext, /* useEffect} */} from 'react';
import {  
    View,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
    // Keyboard
} from 'react-native';
import { format } from 'date-fns';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


import colors from '../constants/colors';
import { ConversionInput } from '../components/ConversionInput';
import { Button } from '../components/Button';
import { KeyboardSpacer } from '../components/KeyboardSpacer';
import { ConversionContext } from '../util/ConversionContext';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        flex: 1
    },
    content: {
        paddingTop: screen.height * 0.0005
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -70,
        marginTop: -20
    },
    logoBackground: {
        width: screen.width * 0.45,
        height: screen.height * 0.45
    },
    logo: {
        position: 'absolute',
        width: screen.width * 0.25,
        height: screen.height * 0.25
    },
    textHeader: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20,
        textAlign: "center"
    },
    text: {
        color: colors.white,
        fontSize: 13,
        textAlign: "center"
    },
    header: {
        alignItems: "flex-end",
        marginHorizontal: 20,
        marginVertical: 20
    },
    loadingMessage: {
      textAlign: "center",
      color: colors.white,
      fontSize: 30,
      marginTop: 10
    }
});

export default ({ navigation }) => {
  // Let baseCurrency = 'USD';
  // let quoteCurrency = 'GBP';

  const { 
    baseCurrency, 
    quoteCurrency, 
    swapCurrencies, 
    date, 
    rates,
    isLoading 
  } = useContext(ConversionContext);
  const [value, setValue] = useState('100');
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const conversionRate = rates[quoteCurrency];

//   useEffect(() => {
//     const showListener = Keyboard.addListener('keyboardDidShow', () => {
//         setScrollEnabled(true);
//     });

//     const hideListener = Keyboard.addListener('keyboardDidHide', () => {
//         setScrollEnabled(false);
//     });

//     return () => {
//         showListener.remove();
//         hideListener.remove();
//     };
//   }, [])

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <StatusBar barStyle='light-content' backgroundColor={colors.blue} />
        
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push('Options')}>
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/background.png')} style={styles.logoBackground} resizeMode='contain' />
            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
          </View>
      
          <Text style={styles.textHeader}>Currency Converter</Text>

          {isLoading ? (
            <>
              <ActivityIndicator 
                color={colors.white} 
                size="large"
                marginTop={10}
              />
              <Text style={styles.loadingMessage}>
                Loading
                {"\n"}
                Please Wait...              
              </Text>
            </>
          ) : (
            <>
              <ConversionInput
                text={baseCurrency}
                value={value}
                onButtonPress={() => 
              navigation.push("CurrencyList", { 
                title: 'Base Currency', 
                isBaseCurrency: true,
              })
            }
                onChangeText={text => setValue(text)}
                keyboardType="numeric"
              />
              <ConversionInput
                text={quoteCurrency}
                value={value && `${(parseFloat(value) * conversionRate).toFixed(2)}`}
                editable={false}
                onButtonPress={() => 
              navigation.push("CurrencyList", { 
                title: 'Quote Currency', 
                isBaseCurrency: false,
              })
            }
              />
              <Text style={styles.text}>
                {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${
              date && format(new Date(date), 'MMMM do, yyyy')
            }`}
              </Text>
              <Text style={styles.text}>
                *Conversion rates not accurate*
              </Text>
              <Button text="Reverse Currencies" onPress={() => swapCurrencies()} />
            </>
          )}
          
          <KeyboardSpacer onToggle={(keyboardIsVisable) => setScrollEnabled(keyboardIsVisable)} />
          {/* <View style={{ height: screen.height }} /> */}
        </View>
      </ScrollView>
    </View>
  );
};