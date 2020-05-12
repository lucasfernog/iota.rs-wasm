import wasm, { Client as WasmClient } from './wasm-web/iota_wasm'

class AddressGenerator {
    constructor(generator, seed) {
        this.generator = generator
        this.__seed = seed
    }

    generate() {
        return this.generator(this.__seed, this.__index, this.__security)
    }

    index(index) {
        this.__index = BigInt(index)
        return this
    }

    security(security) {
        this.__security = security
        return this
    }
}

class Client {
    constructor(uri) {
        this.uri = uri
    }

    __getClient() {
        return wasm().then(() => {
            return new WasmClient(this.uri)
        })
    }

    getNodeInfo() {
        return this.__getClient().then(client => {
            return client.getNodeInfo()
        })
    }

    getNewAddress(seed) {
        return new AddressGenerator((seed, index, security) => {
            return this.__getClient().then(client => {
                return client.getNewAddress(seed, index, security)
            })
        }, seed)
    }
}

export { Client }
