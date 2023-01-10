import { useTheme } from '@rneui/themed';
import { View, Text } from 'react-native';

const SPACE = 15;

const DataRow = ({ label, value, index }) => {
  const formatedLabel = label
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACE / 2,
        borderRadius: 10,
        marginVertical: SPACE / 2,
        backgroundColor:
          index % 2 === 0 ? theme.colors.white : theme.colors.naturalComplement,
      }}>
      <View
        style={{
          width: '40%',
          paddingHorizontal: SPACE,
        }}>
        <Text
          style={{
            padding: SPACE / 2,
            fontSize: SPACE,
            color: theme.colors.primary,
          }}>
          {formatedLabel}
        </Text>
      </View>
      <View
        style={{
          width: '60%',
          paddingHorizontal: SPACE,
        }}>
        <Text
          style={{
            padding: SPACE / 2,
            fontSize: SPACE,
            color: theme.colors.primary,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};
export default DataRow;
