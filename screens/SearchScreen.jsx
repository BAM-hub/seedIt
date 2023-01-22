import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Image, Input } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@rneui/themed';
import usePlantsStore from '../store/plantsStore';
import { Dimensions } from 'react-native';
// import useSearch from '../hooks/useSearch';
import useAddPlant from '../hooks/useAddPlant';

const SearchScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  // const { useSearch } = route.params;
  // const { searchResults } = useSearch();
  const { searchResult } = usePlantsStore();
  const addPlantMutation = useAddPlant();
  const handleAddPlant = plant => {
    addPlantMutation.mutate(plant);
    navigation.goBack();
  };
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="md-arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Input
          containerStyle={{
            width: '100%',
            backgroundColor: 'white',
            height: 50,
            borderRadius: 10,
          }}
          inputContainerStyle={{
            width: '100%',
            backgroundColor: theme.colors.white,
            borderBottomWidth: 0,
            height: '100%',
          }}
          onChangeText={text => setSearch(text)}
          leftIcon={() => (
            <TouchableOpacity
              onPress={
                () => {}
                // navigation.navigate('Search', {
                //   search,
                // })
              }>
              <Icon name="md-search" size={30} color="black" />
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView
        style={{
          height: Dimensions.get('window').height - 200,
        }}>
        {searchResult.map((item, index) => (
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              margin: 'auto',
              backgroundColor: theme.colors.white,
              padding: 20,
              marginBottom: 20,
              borderRadius: 10,
            }}
            key={item.id}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={{ uri: item?.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 20,
                }}
              />
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                    numberOfLines={1}>
                    {item?.commonName}
                  </Text>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text numberOfLines={1}>color {item?.flowerColor}</Text>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width / 3 - 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text numberOfLines={1}>{item?.matureSize}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  alignItems: 'center',
                }}>
                <Button
                  buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    width: 100,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleAddPlant(item)}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    AddPlant
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 100 }} />
    </View>
  );
};

export default SearchScreen;
