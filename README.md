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
Mnemonic    : oyster cannon nose okay credit radio essence garbage creek palm path review
Seed        : 44C638182A6629DA3329C65AD9943A913234C6FE8B16D43A16229A5BDDF00333
Private Key : 44C638182A6629DA3329C65AD9943A913234C6FE8B16D43A16229A5BDDF003338EDAD4C07A4452A3C3317CF126420F11AFC362F2E61C80B7B563FF0478683123
Public Key  : 8EDAD4C07A4452A3C3317CF126420F11AFC362F2E61C80B7B563FF0478683123
Address     : 26EE340B63D5598C458FD58BD37D8AA849FC82D4
Signature   : 7AD05057B4F94B100A202955881484CDFEB615582DA412487B57D0FB79D5148DC955217BE07627C19233A923228B0C928A6611085BD659B6BD014BE2B734C60C

```




