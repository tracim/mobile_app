import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // justifyContent: 'center'
  },

  serverMenuButton: {
    alignSelf: 'center',
    marginVertical: 5,
    width: '80%',
  },
  
  addNewServerButton: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center'
  },

  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  blackText: {
    color: 'black'
  },
})