'use strict'

var Saltykeys = require('./index');
var saltyKeys = new Saltykeys;

var mnemonic = saltyKeys.generateRandomMnemonic();
var seed     =  saltyKeys.generateSeed(mnemonic);
var keyPair  = saltyKeys.generateKeyPair(seed);
var address  = saltyKeys.getAddressFromPubKey(keyPair.publicKey);

console.log("Mnemonic    : " + mnemonic);
console.log("Seed        : " + seed);
console.log("Private Key : " + keyPair.privateKey);
console.log("Public Key  : " + keyPair.publicKey);
console.log("Address     : " + address);


let data = '{"chain_id":"BurrowChain_2A0FC2-4F8BA9","tx":[1,{"inputs":[{"address":"6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC","amount":1000,"sequence":8}],"outputs":[{"address":"D7572DA8389D0C3AA64FC8709CA853AFE24F4260","amount":1000}]}]}';
let privKey = 'C01E3035C40C2FF009791C36755848F77EA9FAD484E4A38A17355C72A2C5EDB81474C7654BD711B910F48561FCEC85BC5FAE01B1D209CDF6B60D10F141EC7D5B';
let signature = saltyKeys.sign(privKey,data);

console.log("signature :"+signature);
