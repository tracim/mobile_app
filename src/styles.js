import { StyleSheet } from 'react-native'
import { COLORS } from './branding/Config.js'

export const styles = StyleSheet.create({
  bgColorPrimary: {
    backgroundColor: COLORS.PRIMARY
  },

  pageContainer: {
    flex: 1
  },

  logo: {
    marginTop: 20,
    height: 60,
    width: 200,
    alignSelf: 'center'
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    // height: 48,
    minWidth: 48,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white'
  },

  buttonDisabled: {
    opacity: 0.5
  },

  openServerMenuButton: {
    backgroundColor: 'lightgrey',
    opacity: 0.5,
    position: 'absolute',
    bottom: 35,
    left: 10,
    borderRadius: 50,
    height: 40,
    width: 40,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  serverButton: {
    height: 42,
    marginEnd: 10,
    flex: 1,
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },

  buttonServerIcon: {
    marginEnd: 10,
    width: 42,
    height: 42,
  },

  addNewServerButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY
  },

  serverMenuItem: {
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  label: {
    textAlign: 'left',
    color: 'black',
    marginBottom: 5,
    marginTop: 10
  },

  link: {
    textAlign: 'right',
    paddingTop: 10
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
