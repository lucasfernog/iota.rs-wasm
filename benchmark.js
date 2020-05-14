async function run () {
  const { Client } = require('./node')
  const client = new Client('https://nodes.comnet.thetangle.org')
  return client.getUncheckedAddress('RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVA')
    .then(res => res.address)
}

async function benchmark () {
  for (let i = 0; i < 500; i++) {
    await run().then(console.log)
  }
}

benchmark()
