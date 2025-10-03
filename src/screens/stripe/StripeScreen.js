import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import keys from '../../utils/keys';
import CheckoutScreen from './CheckoutScreen';

const StripeScreen = () => {
  return (
        <StripeProvider publishableKey={keys.STRIPE_PUBLISH_KEY}
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
            <CheckoutScreen />
        </StripeProvider>
  )
}

export default StripeScreen

const styles = StyleSheet.create({})
