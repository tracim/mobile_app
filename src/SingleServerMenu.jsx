import { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
} from 'react-native'
import { SERVER_NAME, SERVER_URL } from './branding/Config.js'
import { fetchCredentials, getCredentials } from './authentificationHelper.js'
import { styles } from './styles.js'
import UpdateCredentialsModal from './modals/UpdateCredentialsModal.jsx'

export const SingleServerMenu = (props) => {
  const [displayUpdateCredentialsModal, setDisplayUpdateCredentialsModal] = useState(false)

  useEffect(() => {
    const handleCredentials = async () => {
      const credentials = await getCredentials(SERVER_URL)
      if (credentials) {
        fetchCredentials(
          SERVER_URL,
          credentials,
          () => {
            props.onPressServer(SERVER_NAME)
            setDisplayUpdateCredentialsModal(false)
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
          props.onPressServer(SERVER_NAME)
        }}
        currentServerURL={SERVER_URL}
        currentServerName={SERVER_NAME}
        showCloseButton={false}
      />
    </SafeAreaView>
  )
}
export default SingleServerMenu
