import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import NewDeck from './NewDeck'
import List from './List'
import Live from './Live'
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';


const Main = (props) => {

    const Tab = createBottomTabNavigator();

    const Decks = () => <List/>
    const newDeck = () => <NewDeck/>
    const live = () => <Live/>
    
    const options = ({route}) => ({
      tabBarIcon: () => {
        if(route.name === 'DECKS'){
          return (<FontAwesome name='home' size={30} color='black'/>)
        } else if(route.name === 'NEW DECKS'){
          return (<Ionicons name="add-circle" size={24} color="black" />)
        } else {
          return <Ionicons name='ios-speedometer' size={30} color="black"/>
        }
      }
})


    return ( 
            <Tab.Navigator screenOptions={options}>
                <Tab.Screen name="DECKS" component={Decks} />
                <Tab.Screen name="NEW DECKS" component={newDeck} />
                <Tab.Screen name="LIVE" component={Live} />
            </Tab.Navigator>
     );
}
 
export default Main;