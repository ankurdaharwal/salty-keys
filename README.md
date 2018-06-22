# salty-keys.js
Library to create BIP39 Mnemonic, ED25519 Key Pairs and RIPEMD160 Address

## Example:
```js

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

console.log("Signature : "+signature);

```
## Output
```
***************************
****** ED25519 ************
****** Key/Signature  *****
****** Generation Test ****
***************************


Mnemonic    : coin carry push metal obvious rocket relax helmet clean daughter napkin humor

Seed        : A9551B02DA237EA5356F640B6466936762804C9F8438043AC2E07E227DEA2C0B

Private Key : A9551B02DA237EA5356F640B6466936762804C9F8438043AC2E07E227DEA2C0B6E4D2634BB202427533DF18D4B8300D39B951B5B069AFF2BE684F95BD2E53E4A

Public Key  : 6E4D2634BB202427533DF18D4B8300D39B951B5B069AFF2BE684F95BD2E53E4A

Address     : EC7093BC936E90EE1B433C30EA6B708597E8D06B


Signature   : 7AD05057B4F94B100A202955881484CDFEB615582DA412487B57D0FB79D5148DC955217BE07627C19233A923228B0C928A6611085BD659B6BD014BE2B734C60C

```




