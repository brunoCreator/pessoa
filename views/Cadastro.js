import React, { useState, useEffect } from 'react';
import { styles } from "../assets/css/main";
import { Input } from "@rneui/base";
import { ScrollView, FlatList, SafeAreaView, View, Image, Keyboard, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import person from '../services/person';
import sub from '../services/sub';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Base64ArrayBuffer from 'base64-arraybuffer';
import { Card, Button, CheckBox, Icon, ListItem } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import { StackActions } from '@react-navigation/native';



export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(true);
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [civil, setCivil] = useState('solteiro');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('AC');
  const [municipio, setMunicipio] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const [nomeE, setNomeE] = useState('');

  const [emailE, setEmailE] = useState('');

  const [cpfE, setCpfE] = useState('');


  const [telefoneE, setTelefoneE] = useState('');


  const [cepE, setCepE] = useState('');

  const [bairroE, setBairroE] = useState('');

  const [numeroE, setNumeroE] = useState('');

  const [complementoE, setComplementoE] = useState('');

  const [logradouroE, setLogradouroE] = useState('');

  const [municipioE, setMunicipioE] = useState('');




  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);

  const [subs, setSubs] = useState([]);
  const [subNome, setSubNome] = useState('');
  const [subCpf, setSubCpf] = useState('');
  const [subNomeE, setSubNomeE] = useState('');
  const [subCpfE, setSubCpfE] = useState('');
  const [subTipo, setSubTipo] = useState(true);



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.cancelled) {
      const response = await fetch(result.uri);

      const blob = await response.blob();


      const fileReaderInstance = new FileReader();

      fileReaderInstance.readAsDataURL(blob);
      let base64data;
      fileReaderInstance.onload = async () => {
        base64data = fileReaderInstance.result;
        setBlob(base64data);
        setImage(base64data);
      }

      //  const photoURI = Base64ArrayBuffer.encode(blob);


      //setImage(result.uri);
    }
  };

  const [extra, setExtra] = useState(0);
  const addSub = () => {
    if (subCpfE == '' && subNomeE == '')
      subs.push({ 'nome': subNome, 'tipo': subTipo, 'cpf': subCpf });

    setExtra(extra + 1)
  }

  const delSub = (index) => {
    if (index > -1) {
      subs.splice(index, 1);
    }
    setExtra(extra + 1)
  }

  const empty = (val) => {
    if (val == '')
      return 'Preencha corretamente'
    else
      return ''

  }

  async function registro() {
    if (nomeE == '' && emailE == '' && cpfE == '' && telefoneE == '' && cepE == '' && bairroE == '' && numeroE == '' && complementoE == '' && logradouroE == '' && municipioE == '') {
      person.create({ nome: nome, tipo: tipo ? 'física' : 'Jurídica', foto: blob, cpf: cpf, email: email, telefone: telefone, civil: civil, cep: cep, estado: estado, municipio: municipio, bairro: bairro, logradouro: logradouro, numero: numero, complemento: complemento })
        .then(id => createSubs(id))
        .catch(err => console.log(err))
    }



  }

  async function createSubs(id) {
    console.log(id);
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
    if (!tipo) {
      for (const i of subs) {
        sub.create({ nome: i.nome, tipo: i.tipo ? 'física' : 'Jurídica', cpf: i.cpf, parent: id })
          .then(id => console.log(id))
          .catch(err => console.log(err))
      }
    }

  }

  const vEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailE("Email incorreto");
      setEmail(text);
      return false;
    }
    else {
      setEmail(text);
      setEmailE('');
    }
  }
  const vTelefone = (text) => {
    let reg = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    if (reg.test(text) === false) {
      setTelefoneE("Telefone incorreto");
      setTelefone(text)
      return false;
    }
    else {
      setTelefone(text)
      setTelefoneE('');
    }
  }

  const vCep = (text) => {
    let reg = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;
    if (reg.test(text) === false) {
      setCepE("Cep incorreto");
      setCep(text)
      return false;
    }
    else {
      setCep(text)
      setCepE('');
    }
  }

  const vNome = (text) => {
    if (text == '') setNomeE('Preencha corretamente');
    else setNomeE('');
    setNome(text);
  }



  const vNumero = (text) => {
    if (text == '') setNumeroE('Preencha corretamente');
    else setNumeroE('');
    setNumero(text);
  }
  const vLogradouro = (text) => {
    if (text == '') setLogradouroE('Preencha corretamente');
    else setLogradouroE('');
    setLogradouro(text);
  }

  const vMunicipio = (text) => {
    if (text == '') setMunicipioE('Preencha corretamente');
    else setMunicipioE('');
    setMunicipio(text);
  }

  const vComplemento = (text) => {
    if (text == '') setComplementoE('Preencha corretamente');
    else setComplementoE('');
    setComplemento(text);
  }

  const vBairro = (text) => {
    if (text == '') setBairroE('Preencha corretamente');
    else setBairroE('');
    setBairro(text);
  }

  const vSubNome = (text) => {
    if (text == '') setSubNomeE('Preencha corretamente');
    else setSubNomeE('');
    setSubNome(text);
  }

  const vSubCpf = (text) => {
    if (text == '') setSubCpfE('Preencha corretamente');
    else setSubCpfE('');
    setSubCpf(text);
  }

  const vCpf = (text) => {

    let reg = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
    if (reg.test(text) === false) {
      setCpfE('Preencha corretamente');
      setCpf(text);
      return false;
    }
    else {
      setCpf(text);
      setCpfE('');
    }

  }

  return (
    <SafeAreaView>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View >
          <KeyboardAwareScrollView keyboardShouldPersistTaps='always' >



            <View style={{ padding: 10 }}>




              <Input
                errorMessage={nomeE}
                label="Nome/Razão Social"
                placeholder="Preencha"
                onChangeText={(text) => vNome(text)}
                value={nome}
              />

              <Input
                errorMessage={emailE}
                label="Email"
                placeholder="Preencha"
                onChangeText={(text) => vEmail(text)}
                value={email}
              />

              <Input
                errorMessage={cpfE}
                label="CPF/CNPJ"
                placeholder="Preencha"
                onChangeText={(text) => vCpf(text)}
                value={cpf}
              />

              <Text style={styles.tx}>Estado civil</Text>

              <Picker
                selectedValue={civil}
                onValueChange={(itemValue, itemIndex) =>
                  setCivil(itemValue)
                }>
                <Picker.Item label='Solteiro' value='solteiro' />
                <Picker.Item label='Casado' value='casado' />
                <Picker.Item label='Separado' value='separado' />
                <Picker.Item label='Divorciado' value='divorciado' />
                <Picker.Item label='Viúvo' value='viúvo' />

              </Picker>

              <Input
                errorMessage={telefoneE}
                label="Telefone"
                placeholder="Preencha"
                onChangeText={(text) => vTelefone(text)}
                value={telefone}
              />

              <Text style={styles.tx}>Estado</Text>
              <Picker

                selectedValue={estado}
                onValueChange={(itemValue, itemIndex) =>
                  setEstado(itemValue)
                }>
                <Picker.Item label='Acre' value='AC' />
                <Picker.Item label='Alagoas' value='AL' />
                <Picker.Item label='Amapá' value='AP' />
                <Picker.Item label='Amazonas' value='AM' />
                <Picker.Item label='Bahia' value='BA' />
                <Picker.Item label='Ceará' value='CE' />
                <Picker.Item label='Distrito Federal' value='DF' />
                <Picker.Item label='Espírito Santo' value='ES' />
                <Picker.Item label='Goiás' value='GO' />
                <Picker.Item label='Maranhão' value='MA' />
                <Picker.Item label='Mato Grosso' value='MT' />
                <Picker.Item label='Mato Grosso do Sul' value='MS' />
                <Picker.Item label='Minas Gerais' value='MG' />
                <Picker.Item label='Pará' value='PA' />
                <Picker.Item label='Paraíba' value='PB' />
                <Picker.Item label='Paraná' value='PR' />
                <Picker.Item label='Pernambuco' value='PE' />
                <Picker.Item label='Piauí' value='PI' />
                <Picker.Item label='Rio de Janeiro' value='RJ' />
                <Picker.Item label='Rio Grande do Norte' value='RN' />
                <Picker.Item label='Rio Grande do Sul' value='RS' />
                <Picker.Item label='Rondônia' value='RO' />
                <Picker.Item label='Roraima' value='RR' />
                <Picker.Item label='Santa Catarina' value='SC' />
                <Picker.Item label='São Paulo' value='SP' />
                <Picker.Item label='Sergipe' value='SE' />
                <Picker.Item label='Tocantins' value='TO' />
              </Picker>


              <Input
                errorMessage={cepE}
                label="CEP"
                placeholder="Preencha"
                onChangeText={(text) => vCep(text)}
                value={cep}
              />

              <Input
                errorMessage={municipioE}
                label="Município"
                placeholder="Preencha"
                onChangeText={(text) => vMunicipio(text)}
                value={municipio}
              />

              <Input
                errorMessage={logradouroE}
                label="Logradouro"
                placeholder="Preencha"
                onChangeText={(text) => vLogradouro(text)}
                value={logradouro}
              />

              <Input
                errorMessage={bairroE}
                label="Bairro"
                placeholder="Preencha"
                onChangeText={(text) => vBairro(text)}
                value={bairro}
              />

              <Input
                errorMessage={numeroE}
                label="Número"
                placeholder="Preencha"
                onChangeText={(text) => vNumero(text)}
                value={numero}
              />

              <Input
                errorMessage={complementoE}
                label="Complemento"
                placeholder="Preencha"
                onChangeText={(text) => vComplemento(text)}
                value={complemento}
              />

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <CheckBox
                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                    center
                    title="Pessoa física"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={tipo}
                    onPress={() => setTipo(!tipo)}
                  /></View>
                <View style={{ flex: 1 }}>
                  <CheckBox
                    containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                    center
                    title="Pessoa Jurídica"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={!tipo}
                    onPress={() => setTipo(!tipo)}
                  />
                </View>
              </View>

              <Button title="Enviar Imagem" onPress={pickImage} />
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

              <Button

                onPress={registro}
                title="Cadastrar"
                buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
              />





              {!tipo &&

                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Input
                        inputContainerStyle={{ backgroundColor: "#fff" }}
                        errorMessage={subNomeE}
                        label="Nome"
                        placeholder="Enter Name"
                        onChangeText={(value) => vSubNome(value)}
                        value={subNome}
                      />

                    </View>
                    <View style={{ flex: 1 }}>
                      <Input
                        inputContainerStyle={{ backgroundColor: "#fff" }}
                        errorMessage={subCpfE}
                        label="CPF"
                        onChangeText={(value) => vSubCpf(value)}
                        value={subCpf}
                        placeholder="Enter Name"
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <CheckBox
                        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                        center
                        title="Pessoa física"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={subTipo}
                        onPress={() => setSubTipo(!subTipo)}
                      /></View>
                    <View style={{ flex: 1 }}>
                      <CheckBox
                        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                        center
                        title="Pessoa Jurídica"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={!subTipo}
                        onPress={() => setSubTipo(!subTipo)}
                      />
                    </View>
                  </View>

                  <Button title="Adicionar" onPress={() => addSub()} />





                </View>



              }



            </View>



            {subs.map((item, index) =>
              <ListItem key={index} bottomDivider>
                <ListItem.Content key={index}>

                  <ListItem.Title>{item.nome}</ListItem.Title>
                  <ListItem.Subtitle>{item.tipo ? 'Pessoa física' : 'Pessoa Jurídica'}</ListItem.Subtitle>

                </ListItem.Content>

                <ListItem.Content key={index + 1} right>
                  <Button
                    title=""
                    onPress={() => delSub(index)}
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ backgroundColor: 'red' }}
                  />
                </ListItem.Content>
              </ListItem>

            )
            }


          </KeyboardAwareScrollView>




        </View>
      </TouchableWithoutFeedback>



    </SafeAreaView>

  );
}


