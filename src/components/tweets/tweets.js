import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Parse from 'parse/react-native';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      user: null
    };
  },
  componentWillMount: function () {
    Parse.User.currentAsync()
      .then((user) => { this.setState({ user: user }); })
  },
  render: function () {
    if (!this.state.user) {
      return <Text>Loading...
      </Text>;
    }

    var username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <Text>Welcome back, {username}!</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
