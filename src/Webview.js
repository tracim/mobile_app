import { useEffect, useState } from 'react'
import {
  BackHandler,
  RefreshControl,
  ScrollView
} from 'react-native'
import { WebView } from 'react-native-webview'
import { styles } from './styles.js'

export const Webview = (props) => {
  const [refresherEnabled, setEnableRefresher] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const goBackAction = () => {
      if (canGoBack) {
        this.webView.goBack()
      } else props.onClickGoBack()
      return true
    }
    BackHandler.addEventListener('hardwareBackPress', goBackAction)

    return () => BackHandler.removeEventListener('hardwareBackPress', goBackAction)
  }, [canGoBack])

  const handleNavigationStateChange = (e) => setCanGoBack(e.canGoBack)

  const handleScroll = (e) => {
    const isTopOfPage = Number(e.nativeEvent.contentOffset.y) === 0
    // FIXME - GB - 2022-09-30 - The refresh is disabled until the problem is fixed in Tracim.
    // The mechanism works for the page scroll as a whole, but not for a scroll on a very internal div.
    // setEnableRefresher(isTopOfPage)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      refreshControl={
        <RefreshControl
          enabled={refresherEnabled}
          onRefresh={() => this.webView.reload()}
          refreshing={false}
        />
      }
    >
      <WebView
        onNavigationStateChange={handleNavigationStateChange}
        onScroll={handleScroll}
        ref={ref => this.webView = ref}
        source={{ uri: `https://${props.url}` }}
      />
    </ScrollView>
  )
}
export default Webview
