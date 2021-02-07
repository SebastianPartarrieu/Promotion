import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import { Easing,
         Animated, 
         Dimensions, 
         View, 
         Text,
         TextInput,
         ScrollView, 
         StyleSheet, 
         ImageBackground, 
         Image,
         SegmentedControlIOSComponent
         } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block, theme, Button as GaButton, DeckSwiper } from "galio-framework";

// screens
import Accueil from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Account from "../screens/Account";
import { token } from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Map from "../screens/Map";
import Register from "../screens/Register";
//import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header, Button, List } from "../components";
import { Images, argonTheme, tabs, articles } from "../constants";
import { HeaderHeight } from "../constants/utils";
import Input from '../components/Input';



const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



function searchStack(props) {

  const navigation = props.navigation

  var first_input = ''

  if (props.route.params == undefined) {
    first_input = ''

  } else {
    first_input = props.route.params.first_input
  }

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        //component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              title="Recherche" 
              navigation={navigation} 
              scene={scene} 
              //search
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      >
        {props => <Elements {...{f_input : first_input,navigation : navigation}} />}
        
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function sendImageRequest(id,route){

  const url = new URL(route, 'http://localhost:5000/')
  url.searchParams.append('search',search)

  fetch(url, {
    method : 'GET',
    
  }).then((response) => response.json()).then(updateFunction).catch(
    (e) => {alert('Something went wrong' + e.message)}
  )
}




function sendSearchRequest(search,updateFunction,route){
  const url = new URL(route, 'http://localhost:5000/')
  url.searchParams.append('search',search)

  fetch(url, {
    method : 'GET',
    headers: {
      Accept: 'application/json',
    }
  }).then((response) => response.json()).then(updateFunction).catch(
    (e) => {alert('Something went wrong' + e.message)}
  )
}




function Elements (props){


  const first_input = props.f_input;
  const navigation = props.navigation;



  var [resultat, setResultat] = useState([])
  var [images, setImages] = useState([])

  function SearchResults(){
    var buffer = [];
    var n = resultat.length;
    //var com = 'xxx'
    for(var iter = 0; iter < n; iter++){

      const id = iter;
      buffer.push(<Button onPress = {() => navigation.navigate('Profile', {comm : resultat[id],imm : images[id]})} color="secondary" textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }} style={styles.button}>{resultat[iter][1]}</Button>);

    }
    
    return(buffer)
  } 

  function updateFunction(response){
    { //console.log(response),
      resultat = setResultat(response['resultat'])
      images = setImages(response['images'])
    }
  }

  useEffect( ()=>{sendSearchRequest(first_input,updateFunction, "commerce");}, []);

  const inputElement = useRef(null);


  
  //useEffect(() =>{if (inputElement.current){inputElement.current.focus();}},[]);

  return (
    <Block>
      <TextInput
        ref = {inputElement => {if (inputElement) {
          inputElement.focus();
        }}}

        right
        defaultValue={first_input}
        autoFocus
        maxLength = {30}
        onChangeText = {(text) => (sendSearchRequest(text,updateFunction,"commerce"))}        
        color="black"
        style = {{
              height: 50,
              width: width - 32,
              marginHorizontal: 16,
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'white',
              borderColor: argonTheme.COLORS.BORDER}}
        placeholder="Que recherchez vous?"
        placeholderTextColor={'#8898AA'}
        //onFocus={() => navigation.navigate('Pro')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}

        />

    <ScrollView>
    <Block flex>
      <Text bold size={16} style={styles.title}>
        Resultats
      </Text>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Block center>
          <SearchResults/>
        </Block>
      </Block>
    </Block>
    </ScrollView>
    </Block>
  );
}




function ProfileStack(props){
    //console.log("======================== ")
    //console.log()
    //console.log("======================== ")
    
    const COMMERCE = props.route.params['comm']
    const IMAGES = props.route.params['imm']
    
    



    return(
      <Stack.Navigator 
      initialRouteName="Profile" 
      mode="card" 
      headerMode="screen" 
      params= 'Joe' >
      
      <Stack.Screen
        name="Profile"
        //component={Profile}
        
        options={{
          header: ({ navigation, scene }) => (
            <Header
            back
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      >
        {props => <Profile {...{KOM: COMMERCE, IMAGES:IMAGES}} />}
      </Stack.Screen>

    </Stack.Navigator>
    );
    }





function MapStack(props) {
  //const articles = props.route.params['comm']
  return (
    <Stack.Navigator initialRouteName="Map" mode="card" headerMode="screen" params='Joe'>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Map"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      >
       
      </Stack.Screen>

    </Stack.Navigator>
  );
}



function HomeStack(props) {
  //console.log(token);
  //console.log('couccou');
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Accueil"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              title="Accueil"
              search
              //options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
      <Drawer.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Elements" component={searchStack} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Map" component={MapStack} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});


export {sendSearchRequest};
