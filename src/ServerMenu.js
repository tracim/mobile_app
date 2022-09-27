import { View, Button } from 'react-native'
import { styles } from './styles.js'

export const ServerMenu = (props) => {
  return (
    <View style={styles.pageContainer}>
      {props.serverList.map(server =>
        <View
          style={styles.serverMenuButton}
          key={`button_${server.name}`}
        >
          <Button
            onPress={() => props.onPressServer(server.name)}
            title={server.name}
          />
        </View>
      )}
      <View style={styles.addNewServerButton}>
        <Button
          onPress={() => props.onPressAdd({ name: 'Preprod', url: 'https://preprod-algoo.tracim.fr/' })}
          title='+'
        />
      </View>
    </View>
  )
}
export default ServerMenu
