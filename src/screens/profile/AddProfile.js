import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Input, Card, Button} from 'react-native-elements';
import EditStyle from '../../theme/profile/EditProfile';

const AddProfile = () => {

    return (
      <SafeAreaView style={EditStyle.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={EditStyle.header}>
            <Header
              centerComponent={
                <TouchableOpacity>
                  <View style={EditStyle.btnDown} />
                </TouchableOpacity>
              }
            />

            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
                Profile
              </Text>
            </View>
            <Card>
              <View style={EditStyle.WrapperForm}>
                <Input
                  label="Full Name"
                  /* onChangeText={this.onNameChange}
                  defaultValue={this.state.name} */
                  /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
                />
                <Input
                  label="Birthdate"
                  /* onChangeText={this.onBirthdateChange}
                  defaultValue={this.state.birthdate} */
                  /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
                />
                <View>
                  <Input
                    label="Gender"
                   /*  onChangeText={this.onGenderChange}
                    defaultValue={this.state.gender} */
                    /* leftIcon={{type: 'font-awesome', name: 'chevron-left'}} */
                  />
                </View>
                <Button
                 /*  loading={isLoading}
                  onPress={this.handleSubmit} */
                  title="Save"
                />
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}
export default AddProfile;