import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  openServerMenuButton: {
    backgroundColor: 'lightgrey',
    opacity: 0.5,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    height: 40,
    width: 40,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  serverMenuButton: {
    alignSelf: 'center',
    marginVertical: 5,
    width: '80%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  addNewServerButton: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center'
  },

  newServerForm: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 15
  },

  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },

  blackText: {
    color: 'black'
  },

  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  errorMessage: {
    fontSize: 20,
    color: 'gray'
  }
})
