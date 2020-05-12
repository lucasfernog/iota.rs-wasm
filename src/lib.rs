use wasm_bindgen::prelude::*;

/* #[wasm_bindgen]
extern {
  #[wasm_bindgen(js_namespace = console)]
  pub fn log(s: &str);
  #[wasm_bindgen(js_namespace = console)]
  pub fn error(s: &str);
}

macro_rules! console_log {
  ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

macro_rules! console_error {
  ($($t:tt)*) => (error(&format_args!($($t)*).to_string()))
} */

#[wasm_bindgen]
pub struct Client {
    client: iota::Client,
}

fn response_to_js_value<T: serde::ser::Serialize>(response: T) -> Result<JsValue, JsValue> {
    JsValue::from_serde(&response)
        .map_err(|e| JsValue::from(e.to_string()))
}

#[wasm_bindgen]
impl Client {
    #[wasm_bindgen(constructor)]
    pub fn new(uri: &str) -> Result<Client, JsValue> {
        let client = Client {
            client: iota::Client::new(uri)
                .map_err(|e| e.to_string())?
        };
        Ok(client)
    }

    #[wasm_bindgen(js_name = "getNodeInfo")]
    pub async fn get_node_info(self) -> Result<JsValue, JsValue> {
        let node_info = self.client.get_node_info()
            .await
            .map_err(|e| JsValue::from(e.to_string()))?;
        let res = response_to_js_value(node_info)?;
        Ok(res)
    }
}
