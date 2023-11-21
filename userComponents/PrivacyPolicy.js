import React from 'react';
import { Pressable, Linking, Text, StyleSheet } from 'react-native';
import globalStyles from '../style';


//function for using an external link
const ExternalLink = ({ url, style, text }) => {
  const openURL = () => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
  };

  return (
      <Pressable onPress={openURL}>
        <Text style={[globalStyles.text, globalStyles.linkText]}>Privacy Policy</Text>
      </Pressable>
  );
};
export default ExternalLink;
