import * as CryptoJS from 'crypto-js';

let AuthTokenIv = '0102030405060708'; //AES向量

/*AES加密*/
export function Encrypt(data,AuthTokenKey) {
    let dataStr = JSON.stringify(data);
    let encrypted = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Utf8.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var encryptedBase64Str = encrypted.toString();
    var encryptedStr = encrypted.ciphertext.toString(); 
    return encryptedStr;
}

/*AES解密*/
export function Decrypt(data,AuthTokenKey) {
    var encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, CryptoJS.enc.Utf8.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Utf8.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
}