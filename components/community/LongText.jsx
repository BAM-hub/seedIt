import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@rneui/themed';

const LongText = ({ children }) => {
  const { theme } = useTheme();
  const [numberOflines, setNumberOfLines] = useState(3);
  const [fullText, setFullText] = useState(null);

  return (
    <>
      <Text
        numberOfLines={numberOflines ?? fullText}
        onTextLayout={e =>
          e.nativeEvent.lines.length > 3 &&
          setFullText(e.nativeEvent.text?.lines.length)
        }>
        {children}
      </Text>
      <View
        style={{
          paddingVertical: 5,
        }}>
        {numberOflines ? (
          <Text
            style={{
              color: theme.colors.secondary,
            }}
            onPress={() => {
              setNumberOfLines(null);
            }}>
            show more...
          </Text>
        ) : (
          <Text
            style={{
              color: theme.colors.secondary,
            }}
            onPress={() => {
              setNumberOfLines(3);
            }}>
            show less...
          </Text>
        )}
      </View>
    </>
  );
};

export default LongText;
