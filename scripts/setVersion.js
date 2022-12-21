'use strict';

// HOW TO :
// This script automatically change version and version code in native folders from package.json

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const {version} = require('react-native-version');

let pkgJSON = fs.readFileSync('package.json');
let pkg = JSON.parse(pkgJSON);
let oldVersionName = pkg.version;
let oldVersionCode = pkg.versionCode;

rl.question(
  `Nouveau numéro de version (version) : (version actuelle ${oldVersionName})`,
  versionName => {
    rl.question(
      `Nouveau numéro de version (versionCode) ? (actual is ${oldVersionCode})`,
      versionCode => {
        rl.question(
          `Voulez-vous changer le package.json et les dossiers natifs avec ces informations ?\nversionName : ${versionName}\nversionCode : ${versionCode}\n\n(y/n) : `,
          yes => {
            if (yes === 'y' || yes === 'Y') {
              pkg.version = versionName;
              pkg.versionCode = versionCode;
              fs.writeFile('package.json', JSON.stringify(pkg), err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(
                    'package.json modifié avec succès\niOS/Android versionning...',
                  );
                  version(
                    {
                      setBuild: versionCode,
                    },
                    '.',
                  ).catch(e => {
                    console.error(e);
                  });
                }
              });
            }
            rl.close();
          },
        );
      },
    );
  },
);
