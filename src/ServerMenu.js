import { View, Button } from 'react-native'

export const ServerMenu = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {props.serverList.map(server =>
        <View
          style={{ marginVertical: 10, marginHorizontal: 50 }}
          key={`button_${server.name}`}
        >
          <Button
            onPress={() => props.onPressServer(server.name)}
            title={server.name}
          />
        </View>
      )}
      <View style={{ height: 60, width: 50, justifyContent: 'center', alignSelf: 'center' }}>
        <Button
          onPress={() => props.onPressAdd({ name: 'Preprod', url: 'https://preprod-algoo.tracim.fr/' })}
          title='+'
        />
      </View>
    </View>
  )
}
export default ServerMenu
