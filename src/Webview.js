import { WebView } from 'react-native-webview'

export const Webview = (props) => {
  return <WebView source={{ uri: props.url }} />
}
export default Webview
