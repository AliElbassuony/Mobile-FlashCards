import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import {useNavigation} from '@react-navigation/native';


const DeckList = (props) => {

      const { decks, deckList } = props
      const navigation = useNavigation();
      
      return ( 
        <View style={styles.container}>
              { deckList.map(({title, number}) => {
                return (
                    <View key={title} style={styles.view}>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(
                        'Deck',
                        { deckId: title, number: number} 
                      )}>
                        <Text> {title} </Text>
                      </TouchableOpacity>
                      <Text style={styles.text}> { number } Cards</Text>
                    </View>
                )
              })}
              
        </View>
      )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#00dba0',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
  },
  text:{
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 5,
    borderColor: '#f7600e',
    borderWidth: 3,
    width: 300,

    
  }
});

const mapStateToProps = (decks) => {
    return {
      deckList: Object.keys(decks).map(deck => ({
        title: decks[deck].title,
        number: decks[deck].questions.length
      })),
      decks,
    }
}

export default connect(mapStateToProps)(DeckList);