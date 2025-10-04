import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, TextInput } from 'react-native';
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import keys from '../../utils/keys';
import Colors from '../../theme/Colors';

const CheckoutScreen = () => {
    const [clientSecret, setClientSecret] = useState('');
    const { confirmPayment, loading } = useConfirmPayment();

    useEffect(() => {
        fetchClientSecret();
    }, []);

    const fetchClientSecret = async () => {
        try {
            const response = await fetch('https://api.stripe.com/v1/payment_intents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer '+keys.STRIPE_SECRET_KEY,
                },
                body: 'amount=10000&currency=USD',
            });
            const data = await response.json();
            console.log("\x1b[31m========= Api Resp =======>", data)
            setClientSecret(data.client_secret);
        } catch (error) {
            console.error('===== Error fetching client secret =====> ', error);
        }
    };

    const handlePayment = async () => {
        try {
            if (!clientSecret) {
                throw new Error('Client secret not available');
            }
            const { error } = await confirmPayment(clientSecret, {
                paymentMethodType: "Card",
                paymentMethodData: {
                    billingDetails: {
                        name: 'John Doe',
                        email: 'john@example.com',
                    },
                },
            });
            if (error) {
                console.error('Payment failed:', error.message);
                Alert.alert("Error", error.message)
            } else {
                console.log('Payment successful');
                Alert.alert("Success")
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    if (!clientSecret) {
        return <ActivityIndicator />;
    }
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: Colors.light_green,
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
            />
            <Button title="Pay using Stripe" onPress={handlePayment} disabled={loading} />
        </View>
    );
};
export default CheckoutScreen;
