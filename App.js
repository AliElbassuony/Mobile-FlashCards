import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers'
import NewCard from './components/NewCard'
import Main from './components/Main'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'


const store = createStore(reducer)

const main = () => <Main/>
const newCard = () => <NewCard/>
const quiz = () => <Quiz/>
const deck = () => <Deck/>

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const orange = '#f7600e';

const Stack = createStackNavigator();

export default class App extends React.Component{
  componentDidMount() {
    setLocalNotification()
  }
  
  render(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        <UdaciStatusBar backgroundColor={orange} style="light" />
        <Stack.Navigator>  
          <Stack.Screen name="Main" component={main} />
          <Stack.Screen name="Deck" component={deck} />
          <Stack.Screen name="NewCard" component={newCard} />
          <Stack.Screen name="Quiz" component={quiz} />
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
