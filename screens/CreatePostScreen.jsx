import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, useTheme, Image } from '@rneui/themed';
import ImageModal from '../components/shared/ImageModal';
import { ScrollView } from 'react-native';

const CreatePostScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MCI name="arrow-left" size={30} color={theme.colors.black} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Post title={title} content={content} />
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: 20,
            backgroundColor: theme.colors.white,
            padding: 10,
            borderRadius: 10,
            shadowColor: theme.colors.primary,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
          }}>
          <TextInput
            placeholder="title"
            onChange={e => setTitle(e.nativeEvent.text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.secondary,
              marginBottom: 5,
              width: '90%',
              alignSelf: 'center',
            }}
          />
          <TextInput
            placeholder="What is in your mind ?"
            onChange={e => setContent(e.nativeEvent.text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.secondary,
              marginBottom: 10,
              width: '90%',
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Button
              containerStyle={{
                width: '40%',
                alignSelf: 'center',
                marginVertical: 5,
                borderRadius: 15,
              }}
              onPress={() => setShowModal(true)}>
              Image
            </Button>
            <Button
              containerStyle={{
                width: '40%',
                alignSelf: 'center',
                marginVertical: 5,
                borderRadius: 15,
              }}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>

      <ImageModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

const Post = ({ title, content }) => (
  <PostWrapper>
    <PostHeader />
    <PostTitle title={title} />
    <PostBody />
    <RowWrapper>
      <LongText>{content}</LongText>
    </RowWrapper>
  </PostWrapper>
);

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
          <Text>0</Text>
          <Text>0</Text>
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

const PostTitle = ({ title }) => {
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
        {title ? title : 'Title'}
      </Text>
      <Text
        style={{
          width: '20%',
          fontSize: 12,
          color: theme.colors.secondary,
          textAlign: 'right',
        }}>
        {new Date().getHours().toString()}{' '}
        {new Date().getHours() >= 12 ? 'PM' : 'AM'}
      </Text>
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
        {/* {numberOflines ? (
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
        )} */}
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
        // marginBottom: 50,
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
          uri: 'https://images-ext-2.discordapp.net/external/HCZMxTzr2qIotkBzVa_Ilz8wjqF4pRSJdKLCmv8J9X0/%3Fw%3D1200/https/www.familyhandyman.com/wp-content/uploads/2020/04/Powdery-Mildew-GettyImages-1090508010.jpg?width=606&height=606',
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

export default CreatePostScreen;
