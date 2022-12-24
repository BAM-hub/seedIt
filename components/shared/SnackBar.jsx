import { View, Text, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SnackBar = () => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity>
      <Snackbar
        style={{
          backgroundColor: theme.colors.primary,
        }}
        visible={true}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="check" size={20} color={theme.colors.white} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.white,
              }}>
              Image Uploaded
            </Text>
          </View>
        </View>
      </Snackbar>
    </TouchableOpacity>
  );
};

export default SnackBar;
