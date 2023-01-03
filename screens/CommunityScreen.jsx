import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpeedDial, useTheme } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { Image } from '@rneui/themed';
import { TextInput } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import SLI from 'react-native-vector-icons/SimpleLineIcons';
import useGetPosts from '../hooks/useGetPosts';
import usePostsStore from '../store/postsStore';

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

const Post = () => (
  <PostWrapper>
    <PostHeader />
    <PostTitle />
    <PostBody />
    <RowWrapper>
      <LongText>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In vitae
        dolorem odio eos earum facere eum blanditiis inventore amet
        exercitationem? Fuga sed quibusdam repellat ratione quisquam
        consequuntur, ex dignissimos ullam.
      </LongText>
    </RowWrapper>
    <PostInput />
  </PostWrapper>
);

const PostInput = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: theme.colors.secondary,
        marginBottom: 10,
      }}>
      <TextInput
        style={{
          width: '90%',
        }}
        placeholder="comment..."
      />
      <TouchableOpacity activeOpacity={0.5}>
        <MCI name="send" size={20} color={theme.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

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

const RowWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
      }}>
      {children}
    </View>
  );
};

const PostWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 50,
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }}>
      {children}
    </View>
  );
};

const PostHeader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // borderWidth: 1,
      }}>
      <View
        style={{
          width: '40%',
          paddingHorizontal: 15,
          flexDirection: 'row',
          // borderWidth: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>20</Text>
          <Text>10</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <MCI name="arrow-up-bold" size={20} color={theme.colors.secondary} />

          <MCI
            style={{
              transform: [{ rotate: '180deg' }],
            }}
            name="arrow-up-bold"
            size={20}
            color={theme.colors.secondary}
          />
        </View>
      </View>
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          // borderWidth: 1,
        }}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/564x/0d/04/da/0d04da2a259734f34f359324161ab0cd.jpg',
          }}
          style={{
            width: '100%',
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: theme.colors.secondary,
            }}>
            Ahmed
          </Text>
        </View>
      </View>
    </View>
  );
};

const PostTitle = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        width: '90%',
        borderBottomWidth: 1.5,
        alignSelf: 'center',
        borderColor: theme.colors.secondary,
      }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.colors.primary,
          alignSelf: 'center',
          marginVertical: 9,
          width: '80%',
        }}>
        first post
      </Text>
      <Text
        style={{
          width: '20%',
          fontSize: 12,
          color: theme.colors.secondary,
          textAlign: 'right',
        }}>
        11PM
      </Text>
    </View>
  );
};

const PostBody = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '100%',
        // height: 200,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/564x/0d/04/da/0d04da2a259734f34f359324161ab0cd.jpg',
        }}
        style={{
          width: '90%',
          height: 200,
          marginHorizontal: '5%',
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default CommunityScreen;
