import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from "react-native";
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { useRoute, useNavigation } from '@react-navigation/native';

const NewCard = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const deckId  = route.params.deckId;
    const deck = deckId;

    const [ question, setQuestion ] = React.useState('');
    const [ answer, setAnswer ] = React.useState('');
    const { dispatch } = props;


    
    const handleBtn = () => {
        const card = {
          question,
          answer
        }

        dispatch(addCard(deck,card))
        addCardToDeck( deck , card);

       

        setQuestion('');
        setAnswer('');

         navigation.navigate(
          'Main'
        )
    } 
    return ( 
        <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={question => setQuestion(question)}
              value={question}
              placeholder="Qusetion?"
            />
            <TextInput
              style={styles.input}
              onChangeText={answer => setAnswer(answer)}
              value={answer}
              placeholder="Answer"
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={handleBtn}  
                disabled={question === '' || answer === ''}>

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

export default connect()(NewCard); 