// import HmacSha256 from 'crypto-js/hmac-sha256';

export const Crypto = {
    encryption: (data: any, key1: any, key2: any) => { // 加
        var base64_1 = btoa(unescape(encodeURIComponent(JSON.stringify(data)))); // base64 1
        return base64_1
    },

    decryption: (data: any, key1: any, key2: any) => { // 解
        var base64_de_1 = atob(data)
        return base64_de_1;
    }
};