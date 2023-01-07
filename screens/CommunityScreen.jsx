import { useState } from 'react';
import { Text } from 'react-native';
import { SpeedDial, useTheme } from '@rneui/themed';
import { ScrollView } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import useGetPosts from '../hooks/useGetPosts';
import usePostsStore from '../store/postsStore';
import Post from '../components/community/Post';

const CommunityScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { posts } = usePostsStore();

  useGetPosts();
  console.log({ posts });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: theme.colors.secondary,
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          CommunityScreen
        </Text>
        <Post />
        <Post />
      </ScrollView>

      <SpeedDial
        icon={() => (
          <SLI name="options-vertical" color={theme.colors.white} size={20} />
        )}
        isOpen={isOpen}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(!isOpen)}>
        <SpeedDial.Action
          icon={() => <MCI name="plus" color={theme.colors.white} size={20} />}
          onPress={() => {
            setIsOpen(false);
            navigation.navigate('CreatePost');
          }}
        />
      </SpeedDial>
    </>
  );
};

export default CommunityScreen;
