import { useTheme, ListItem } from '@rneui/themed';
import { View, Text } from 'react-native';
import { useState } from 'react';
import DataRow from '../result/DataRow';

const PlantData = ({ plant }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}>
      <ListItem.Accordion
        content={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>Plant Data</Text>
          </View>
        }
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 10,
          alignItems: 'center',
        }}
        isExpanded={isExpanded}
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}>
        {Object.keys(plant)
          .filter(key => !['image'].includes(key))
          .filter(key => plant[key] !== null)
          .map((key, index) => (
            <DataRow
              key={`${key}_${index}`}
              label={key}
              value={plant[key]}
              index={index}
            />
          ))}
      </ListItem.Accordion>
    </View>
  );
};
export default PlantData;
