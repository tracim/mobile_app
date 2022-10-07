import {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  ScrollView,
  View
} from 'react-native'
import { WebView } from 'react-native-webview'
import { styles } from './styles.js'

export const Webview = (props) => {
  // FIXME - G.B. - 2022-09-30 - The refresh is disabled until the problem is fixed in Tracim.
  // The mechanism works for the page scroll as a whole, but not for a scroll on a very internal div.
  const [refresherEnabled, setEnableRefresher] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [url, setUrl] = useState('')
  const [isRefLoaded, setIsRefLoaded] = useState(false)
  const webViewRef = useRef()

  useEffect(() => {
    if (props.screenId) setUrl(`https://${props.url}/ui/${props.screenId}`)
    else setUrl(`https://${props.url}`)

    setIsRefLoaded(true)
  }, [])

  useEffect(() => {
    const goBackAction = () => {
      // FIXME - G.B. - 2022-10-03 - Need to include canGoBack here
      if (webViewRef.current) {
        webViewRef.current.goBack()
      } else props.onClickGoBack()
      return true
    }
    BackHandler.addEventListener('hardwareBackPress', goBackAction)

    return () => BackHandler.removeEventListener('hardwareBackPress', goBackAction)
  }, [canGoBack, isRefLoaded])

  const handleNavigationStateChange = (e) => setCanGoBack(e.canGoBack)

  const handleScroll = (e) => {
    const isTopOfPage = Number(e.nativeEvent.contentOffset.y) === 0
    setEnableRefresher(isTopOfPage)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      refreshControl={
        <RefreshControl
          enabled={refresherEnabled}
          onRefresh={() => webViewRef.current.reload()}
          refreshing={false}
        />
      }
    >
      <WebView
        onNavigationStateChange={handleNavigationStateChange}
        onScroll={handleScroll}
        ref={webViewRef}
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.pageContainer}>
            <ActivityIndicator size='large' />
          </View>
        )}
      />
    </ScrollView>
  )
}
export default Webview
