import React from "react";
import {View, Text, StyleSheet, Platform, TouchableOpacity} from "react-native";
import { connect } from 'react-redux'
import { useRoute, useNavigation } from '@react-navigation/native';

const Deck = (props)=> {

    const navigation = useNavigation();
    const route = useRoute();
    const deckId  = route.params.deckId
    const number = route.params.number

    const handleOnPress = () => {
        navigation.navigate(
              'NewCard',
              {deckId: deckId}
            )
    }

    const handlePress = () => {
        if(number) {
              navigation.navigate(
                'Quiz',
                {deckId: deckId, number: number}
              )
          } else {
            alert('Add Cards!')
          }
    }

    return ( 
        <View style={styles.container}>
            <Text style={styles.text}> {deckId} </Text>
            <Text style={styles.text}> {number}  Cards</Text>
            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
              <Text> Add Card </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text> Start Quiz </Text>
            </TouchableOpacity>
        </View>
     )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 30
  },
  text: {
    fontSize: 40,
    margin: 15,
    color: '#00287a'
  },button: {
    padding: 10,
    backgroundColor: '#00dba0',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 15,
  }
});

const mapStateToProps = (decks) => {
    const route = useRoute();
    const deckId  = route.params.deckId
    return {

      deckList: Object.keys(decks).map(deck => ({
        title: decks[deck].title,
        number: decks[deck].questions.length
      })),
    }
}

export default connect()(Deck);