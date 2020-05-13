<template>
  <q-page class="flex flex-center">
    {{ parsedResponse }}
  </q-page>
</template>

<script>
import { Client } from 'iota-rs-wasm/web'

export default {
  name: 'PageIndex',
  data () {
    return {
      response: ''
    }
  },

  computed: {
    parsedResponse () {
      return JSON.stringify(this.response)
    }
  },

  created () {
    const client = new Client('https://nodes.comnet.thetangle.org')
    client.getNodeInfo().then(res => {
      this.response = res
      setTimeout(() => {
        client.getNewAddress('RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVA')
          .index(1)
          .security(3)
          .generate()
          .then(res => {
            this.response = res
          })
      }, 2000)
    })
  }
}
</script>
