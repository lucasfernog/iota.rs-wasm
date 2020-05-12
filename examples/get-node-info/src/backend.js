import wasm from '../../../Cargo.toml'

class Client {
    constructor(uri) {
        this.clientPromise = wasm().then(({ Client }) => {
            this.client = new Client(uri)
            this.clientPromise = null
            return this.client
        })
    }

    __getClient() {
        return this.clientPromise || Promise.resolve(this.client)
    }

    getNodeInfo() {
        return this.__getClient().then(client => {
          return client.getNodeInfo()
        })
    }
}

export {
    Client
}
