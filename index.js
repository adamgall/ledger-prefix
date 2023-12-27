// IMPORTANT
// Ledger device must be unlocked, and Ethereum application opened.
// Edit the PREFIX variable to whatever you're looking for.
const PREFIX = "0xf00";

(async () => {
  const hw = require("@ethersproject/hardware-wallets");

  const ledger = new hw.LedgerSigner();
  const eth = await ledger._eth;

  let vanityAddress = null;
  let index = 0;
  let output;

  while (vanityAddress === null) {
    const path = `m/44'/60'/0'/0/${index}`;
    const address = await eth.getAddress(path)
    output = { path, address: address.address };
    console.log(output);
    if (address.address.toLowerCase().startsWith(PREFIX.toLowerCase())) {
      vanityAddress = address;
    } else {
      index++;
    }
  }

  console.log("");
  console.log(`FOUND ADDRESS WITH PREFIX ${PREFIX}`);
  console.log(output);
})();
