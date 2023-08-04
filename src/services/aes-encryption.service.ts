import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AesEncryptionService {

  keySize = 256;
  ivSize = 128;
  saltSize = 256;
  iterations = 1000;
  password = "MAKV2SPBNI99212";

  constructor() { }

  encrypt(msg) {
    var salt, key;

    salt = CryptoJS.lib.WordArray.random(this.saltSize / 8);
    key = CryptoJS.PBKDF2(this.password, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    var iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

    });

    var encryptedHex = this.base64ToHex(encrypted.toString());
    var base64result = this.hexToBase64(salt + iv + encryptedHex);

    return base64result;
  }

  encryptaes(msg) {
    var salt, key;
    salt = CryptoJS.lib.WordArray.random(this.saltSize / 8);
    key = CryptoJS.PBKDF2(this.password, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    var iv = CryptoJS.lib.WordArray.random(this.ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

    });

    var encryptedHex = this.base64ToHex(encrypted.toString());
    var base64result = this.hexToBase64(salt + iv + encryptedHex);

    return encodeURIComponent(base64result);
  }
  toUTF8Array(str) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  decrypt(transitmessage) {

    var hexResult = this.base64ToHex(transitmessage)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = this.hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(this.password, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

    })

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  decryptaes(transitmessage) {
    transitmessage = decodeURIComponent(transitmessage);
    var hexResult = this.base64ToHex(transitmessage)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = this.hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(this.password, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

    })

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
  }

  base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join("");
  }

}
