async function run () {
  const { Client } = require('./node')
  const client = new Client('https://nodes.comnet.thetangle.org')
  return client.getNewAddress('RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVA')
    .security(3)
    .generate()
    .then(res => res.address)
}

async function benchmark () {
  for (let i = 0; i < 10; i++) {
    await run().then(console.log)
  }
}

benchmark()