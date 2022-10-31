import { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
} from 'react-native'
import { SERVER_NAME, SERVER_URL } from './branding/Config.js'
import {
  fetchCredentials,
  fetchTOU,
  getCredentials,
  getCurrentUserID,
  hasAcceptedTOU
} from './authentificationHelper.js'
import { styles } from './styles.js'
import UpdateCredentialsModal from './modals/UpdateCredentialsModal.jsx'
import AcceptTOUModal from './modals/AcceptTOUModal.jsx'

export const SingleServerMenu = (props) => {
  const [displayUpdateCredentialsModal, setDisplayUpdateCredentialsModal] = useState(false)
  const [displayTOUModal, setDisplayTOUModal] = useState(false)
  const [TOU, setTOU] = useState({})

  useEffect(() => {
    const handleCredentials = async () => {
      const credentials = await getCredentials(SERVER_URL)
      if (credentials) {
        fetchCredentials(
          SERVER_URL,
          credentials,
          async () => {
            // If the credentials are valid, we see if there is CGUs to accepts
            // Credentials are stored in the AsyncStorage only if they are valid
            // Therefore, if there are credentials, they are valid
            const TOU = await fetchTOU(SERVER_URL)
            setTOU(TOU)
            if (TOU) {
              // There is TOU to accept
              const userId = await getCurrentUserID(SERVER_URL)
              // We check if the user has already accepted the TOU
              const isTOUAccepted = await hasAcceptedTOU(SERVER_URL, userId)
              if (!isTOUAccepted) {
                // If not, we display the modal to accept the TOU
                setDisplayTOUModal(true)
              } else {
                // The user has already accepted the TOU
                props.onPressServer(SERVER_NAME)
                setDisplayUpdateCredentialsModal(false)
              }
            } else {
              // There is no TOU to accept, we can connect the user to the server
              props.onPressServer(SERVER_NAME)
              setDisplayUpdateCredentialsModal(false)
            }
          }
        )
      } else setDisplayUpdateCredentialsModal(true)
    }
    handleCredentials()
  }, [])

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        source={require('./branding/logo.png')}
        resizeMode='contain'
        style={styles.logo}
      />

      <UpdateCredentialsModal
        modalVisible={displayUpdateCredentialsModal}
        hideModal={() => {
          setDisplayUpdateCredentialsModal(false)
          // props.onPressServer(SERVER_NAME)
        }}
        currentServerURL={SERVER_URL}
        currentServerName={SERVER_NAME}
        showCloseButton={false}
      />

      {TOU && (
        <AcceptTOUModal
        modalVisible={displayTOUModal}
        currentServerURL={SERVER_URL}
        TOU={TOU}
        >

        </AcceptTOUModal>
      )}
    </SafeAreaView>
  )
}
export default SingleServerMenu
