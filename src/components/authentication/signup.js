import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Parse from 'parse/react-native';
import Button from '../common/button';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  },
  render: function () {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({ passwordConfirmation: text })}
          style={styles.input}
        />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Signup'} onPress={this.onSignUpPress} />
        <Button text={'Existing user'} onPress={this.onSignInPress} />
      </View>
    );
  },
  onSignUpPress: function() {
    // Check if passwords are the same
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({ errorMessage: 'Your passwords do not match' });
    }
    // Sign the user up
    var user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    user.signUp(this.state.username, this.state.password, {
      success: (user) => { this.props.navigator.immediatelyResetRouteStack([{ name: 'tweets' }]); },
      error: (user, error) => { this.setState({ errorMessage: error.message }); }
    });
  },
  onSignInPress: function() {
    // Go back to Signin page
    this.props.navigator.pop();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});
