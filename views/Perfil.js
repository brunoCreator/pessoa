import React, { useState, useEffect, Component } from 'react';

import { Input } from "@rneui/base";
import sub from '../services/sub';
import { TouchableOpacity, StyleSheet, FlatList, SafeAreaView, View, Image, Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import {
    Divider,
    Button, ButtonGroup, withTheme, Text,
    ListItem,
    Avatar,
    Icon,
    Badge,
    ListItemProps,
    Switch,
    lightColors
} from '@rneui/themed';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from 'react-native';

export default function Perfil({ navigation }) {
    const route = useRoute();
    const pessoa = route.params.pessoa;


    const [people, setPeople] = useState([]);
    const isVisible = useIsFocused();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        var ls = [];

        Object.keys(pessoa).forEach(key => {
            if (pessoa.hasOwnProperty(key))
                if (key != 'foto' && key != 'nome' && key != 'tipo' && key != 'id' && pessoa[key] != null)
                    ls.push({ 'key': key, 'val': pessoa[key] });
        });
        setInfo(ls);

        setPeople([]);
        sub.findByUser(pessoa.id + '')
            .then(
                pessoas => add(pessoas)
            );

    }, [isVisible]);

    const add = (pessoas) => {
        var list = [];
        for (const i of pessoas) {
            list.push(i);
        }

        setPeople(list);
    }





    return (
        <SafeAreaView>

            <ScrollView>


                <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{ uri: pessoa.foto }} />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{pessoa.nome}</Text>
                            <Text style={styles.info}>Pessoa {pessoa.tipo}</Text>



                        </View>
                        {info.map((item, index) => <ListItem key={index} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.key}</ListItem.Title>

                            </ListItem.Content>

                            <ListItem.Content>
                                <ListItem.Title>{item.val}</ListItem.Title>

                            </ListItem.Content>

                        </ListItem>)}

                        {
                            pessoa.tipo == 'Jurídica' &&
                            <View>
                                <View style={styles.horizontal}>
                                    <Text style={styles.horizontalText}>Representantes</Text>

                                </View>

                                {people.map((item, index) => <ListItem key={index}
                                    bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.nome}</ListItem.Title>
                                        <ListItem.Subtitle>{item.cpf}</ListItem.Subtitle>
                                    </ListItem.Content>

                                </ListItem>)}
                            </View>
                        }


                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    horizontal: {
        marginBottom: 10,
    },
    horizontalText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {

        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});