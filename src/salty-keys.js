'use strict'

/******************************************

    Salty-Keys for ED25519 Keys Generation
    ======================================
    Module: Accounts Controller
    Authors: Ankur Daharwal
    Version: 0.1
    License: MIT
    Creation Date: 19/06/2018

*******************************************/

var crypto = require("crypto");
var nacl = require('tweetnacl');
var bip39 = require("bip39");
var RIPEMD160 = require("ripemd160");

const TYPE_ED25519 = '01';
const PUBKEY_PREFIX = '0120';//0x01   0x20 = 32 

const PUBKEY_LENGTH = 64; // 32 bytes
const SEED_LENGTH = 64; // 32 bytes
const PRIVKEY_LENGTH = 128; // 64 bytes
const ADDRESS_LENGTH = 40; //20 bytes

const PUBKEY_NAME = 'PublicKey';
const SEED_NAME = 'Seed';
const PRIVKEY_NAME = 'PrivateKey';
const ADDRESS_NAME = 'Address';


module.exports = class TenderKeys {

    generateKeyPair(seed) {
        this._isHexString(seed, SEED_NAME, SEED_LENGTH);
        let buffString = this._hexStringToBytes(seed);
        let buffer = new Buffer(buffString, "hex")
        let keyPair = nacl.sign.keyPair.fromSeed(buffer);
        return {
            publicKey: this._bytesToHexString(keyPair.publicKey).toUpperCase(),
            privateKey: this._bytesToHexString(keyPair.secretKey).toUpperCase()
        };
    }

    generateRandomMnemonic() {
        return bip39.generateMnemonic();
    }

    generateSeed(mnemonic) {
        let hash = crypto.createHash('sha256');
        hash.update(mnemonic);
        return hash.digest('hex').toUpperCase();
    }

    getAddressFromPubKey(publicKey) {
        this._isHexString(publicKey, PUBKEY_NAME, PUBKEY_LENGTH);
        let ripemd160 = new RIPEMD160();
        let encodedPubKey = this._hexStringToBytes(TYPE_ED25519 + PUBKEY_PREFIX + publicKey);
        var buffer = new Buffer(encodedPubKey);
        return ripemd160.update(buffer).digest('hex').toUpperCase();
    }

    getAddressFromPrivKey(privateKey) {
        this._isHexString(privateKey, PRIVKEY_NAME, PRIVKEY_LENGTH);
        let publicKey = privateKey.substring(64, 128);
        return this.getAddressFromPubKey(publicKey);

    }

    getPubKeyFromPrivKey(privateKey) {
        this._isHexString(privateKey, PRIVKEY_NAME, PRIVKEY_LENGTH);
        return privateKey.substring(64, 128);
    }

    validateMnemonic(mnemonic) {
        return bip39.validateMnemonic(mnemonic);
    }

    validateAddress(publicKey, address) {
        this._isHexString(publicKey, PUBKEY_NAME, PUBKEY_LENGTH);
        this._isHexString(address, ADDRESS_NAME, ADDRESS_LENGTH);

        if (this.generateAddress(publicKey.toUpperCase() == address.toUpperCase()))
            return true;

        return false;
    }

    sign(privKeyStr, txStr) {
        let buffer = new Buffer(txStr);
        let privKey = new Buffer(privKeyStr, "hex");
        let signature = nacl.sign.detached(buffer, privKey);
        return this._bytesToHexString(signature).toUpperCase();
    }

    verify(privKeyStr, encTxStr) {
        let buffer = new Buffer(encTxStr);
        let privKey = new Buffer(privKeyStr, "hex");
        let verify = nacl.sign.detached.verify(buffer, privKey);
        return this._bytesToHexString(verify).toUpperCase();
    }

    _isHexString(hexString, name, length) {
        if (typeof hexString != 'string') {
            throw new Error('\nError : The type of ' + name + ' must be string!');
        }
        if (hexString.length != length) {
            throw new Error('\nError : The length of ' + name + ' must be ' + length);
        }
        let arr = hexString.split();
        for (let i = 0; i < arr.length; i++)
            if (!arr[i].match(/[0-9A-Fa-f]/))
                throw new Error("Error : unexpected junk in  " + name);
    }

    _hexStringToBytes(hexStr) {
        let result = [];
        while (hexStr.length >= 2) {
            result.push(parseInt(hexStr.substring(0, 2), 16));
            hexStr = hexStr.substring(2, hexStr.length);
        }
        return result;
    }

    _bytesToHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }
}