

const config = (post) => {

    let data = {

        "publicKey": "test_public_key_8fca9f8a93064f128c73600c7d3698e8",
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": "https://mero-bazar.herokuapp.com/",
        "eventHandler": {
            onSuccess(payload) {
            
                let data = {
                    "token": payload.token,
                    "amount": payload.amount
                };
                let config = {
                    headers: { 'Authorization': 'Key test_secret_key_22b294dcfe1b46d88ed73dc3f6c2828c' }
                };
                post();
            },
            onError(error) {
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    }
    return data;

}
export default config;