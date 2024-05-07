import open from 'open';
open('http://localhost:3003');

//シークレットモードで開く
//open('http://localhost:3000', {app: {name: open.apps.chrome, arguments: ['--incognito']}});