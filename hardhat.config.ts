require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config({ path: './.env.local' });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: { version: '0.8.26', settings: { optimizer: { enabled: true, runs: 200 } } },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [process.env.AVALANCHE_KEY]
    },
    moonbeam: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      accounts: [`b672a502a2a0942705d989a1db0c9d9904f45c32f35c0f6b7c5180420fd073df`],
      chainId: 1287,
      gasPrice: 10_000_000_000
    },
    mysubnet: {
      url: 'https://reimagined-space-tribble-6x969xpr5vf97v-9650.app.github.dev/ext/bc/mysubnet/rpc',
      accounts: ['56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027'],
      chainId: 999123,
      gasPrice: 225000000000
    }
  }
};
