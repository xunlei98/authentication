import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import Parse from 'parse/react-native';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Tweets from './components/tweets/tweets';

var ROUTES = {
  signin: Signin,
  signup: Signup,
  tweets: Tweets
};

module.exports = React.createClass({
  componentWillMount: function () {
    Parse.initialize('qP4LwL3iXiz8guicXIqProF6QTgMIS4M8Q3ULQcA', '1Brp2uf3j6f0wzk4mG6JIbM4FHf3tK1zSlUUNyH7');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator} />;
  },
  render: function () {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'signin' }}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
