import { useEffect, useState } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { WebView } from 'react-native-webview'
import { styles } from './styles.js'

export const Webview = (props) => {
  const [refresherEnabled, setEnableRefresher] = useState(false)

  const handleScroll = (event) => {
    const isTopOfPage = Number(event.nativeEvent.contentOffset.y) === 0
    // FIXME - GB - 2022-09-30 - The refresh is disabled until the problem is fixed in Tracim.
    // The mechanism works for the page scroll as a whole, but not for a scroll on a very internal div.
    // setEnableRefresher(isTopOfPage)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.pageContainer}
      refreshControl={
        <RefreshControl
          refreshing={false}
          enabled={refresherEnabled}
          onRefresh={() => this.webView.reload()}
        />
      }
    >
      <WebView
        source={{ uri: props.url }}
        ref={ref => this.webView = ref}
        onScroll={handleScroll}
      />
    </ScrollView>
  )
}
export default Webview
