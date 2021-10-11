import React from "react";
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from "react-native";
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { useRoute, useNavigation } from '@react-navigation/native';

const NewDeck = (props) => {
    const navigation = useNavigation();
    const [deck, setDeck] = React.useState('');
    const { dispatch } = props

    const handleBtn = () => {

      dispatch(addDeck(deck))
      saveDeck(deck);

      setDeck('');

       navigation.navigate(
          'Main'
        )
  }
    return ( 
        <View style={styles.container}>
            <Text>
              What is the Title of your new deck?
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={deck => setDeck(deck)}
              value={deck}
              placeholder="Deck Title"
            />
            <TouchableOpacity style={styles.button} onPress={handleBtn}  disabled={deck === ''}>
            <Text style={{color:'#fff'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
     );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 150,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#00dba0',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  }
});

const mapStateToProps = () => {

}

export default connect()(NewDeck) ;