import React, { useState } from 'react';
import { StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { Block, theme } from 'galio-framework';

import argonTheme from '../constants/Theme';
import server from '../constants/Server';




function GetImageList (cid,updateFunction,route) {

    const url = new URL(route, server.server)
    url.searchParams.append('search',search)
  
    fetch(url, {
      method : 'GET'
    }).then((response) => response.json()).then(updateFunction).catch(
      (e) => {alert('Something went wrong' + e.message)}
    )
  }


export default GetImageList;