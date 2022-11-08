
import React, { useState,useEffect } from 'react';
import {FlatList,TouchableOpacity,SafeAreaView,View,Center,Box,Heading,VStack,FormControl,Input,Label, Image, Keyboard,TextInput,TouchableWithoutFeedback } from "react-native";
import {styles} from "../assets/css/main";
import { Button, ButtonGroup, withTheme,Text,
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Switch,
  lightColors } from '@rneui/themed';
import { FAB } from "@rneui/base";
import person from '../services/person';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";

export default function Home({navigation}){
  const [people, setPeople] = useState([]);
  const isVisible = useIsFocused();

  useEffect( () => {  
    setPeople([]);
    person.all()
    .then( 
      pessoas => sub(pessoas)
    );
    
   },[isVisible]);

   const add = (p) => {
    var list = people;
    list.push(p);
    setPeople(list);
  }
  const sub = (pessoas) => {
    var list = [];
    for (const i of pessoas) {
      list.push(i);
    }
    
    setPeople(list);
  }

    return(
      <View
      style={styles.container}
    >
       <FlatList
          data={people}
          renderItem={({item}) => <ListItem  onPress={() =>
            navigation.navigate('Perfil', { navigation,pessoa: item })
          } bottomDivider>
            <Avatar title={item.nome} source={{ uri: item.foto }} />
            <ListItem.Content>
              <ListItem.Title>{item.nome}</ListItem.Title>
              <ListItem.Subtitle>{item.cpf}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>}
        />



<FAB

        onPress={() =>
          navigation.navigate('Cadastro')
        }
        placement="right"

        size="large"
        overlayColor="#454545"
        icon={{ name: 'add', color: 'white' }}
        color="red"
      />

</View>

    );
}