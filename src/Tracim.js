import { useEffect, useState } from 'react'
import { View, StatusBar, Button } from 'react-native'
import WebView from './Webview.js'
import ServerMenu from './ServerMenu.js'

const serverListConfig = require('../server_list.json')

export const Tracim = () => {
  const [activeServerURL, setActiveServerURL] = useState('')
  const [serverList, setServerList] = useState([])

  useEffect(() => {
    setServerList(serverListConfig.server)
  }, [serverListConfig])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />

      {serverList.length > 0 && !activeServerURL && (
        <ServerMenu
          serverList={serverList}
          onPressServer={setActiveServerURL}
          onPressAdd={(server) => setServerList([...serverList, server])}
        />
      )}

      {activeServerURL && (
        <WebView url={activeServerURL} />
      )}
    </View>
  )
}
export default Tracim
