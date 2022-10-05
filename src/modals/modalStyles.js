import { StyleSheet } from 'react-native'
import { COLORS } from '../branding/Config.js'

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center'
  },

  modal: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10
  },

  title: {
    textAlign: 'left',
    fontSize: 18,
    color: 'black'
  },

  callToActionButton: {
    marginTop: 20,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center'
  }
})
