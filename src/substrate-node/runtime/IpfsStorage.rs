use reqwest::Client;
use serde_json::Value;
use frame_support::{dispatch, ensure};
use frame_system::ensure_signed;

pub struct IpfsStorage;

impl IpfsStorage {
    // Function to add file to IPFS
    pub async fn upload_to_ipfs(data: Vec<u8>) -> Result<String, reqwest::Error> {
        let client = Client::new();
        let response = client
            .post("http://localhost:5001/api/v0/add")
            .body(data)
            .send()
            .await?;

        let json_response: Value = response.json().await?;
        let cid = json_response["Hash"].as_str().unwrap().to_string();
        Ok(cid)
    }

    // Function to retrieve file from IPFS
    pub async fn get_from_ipfs(cid: String) -> Result<Vec<u8>, reqwest::Error> {
        let client = Client::new();
        let url = format!("http://localhost:5001/api/v0/cat?arg={}", cid);
        let response = client.get(&url).send().await?;
        let data = response.bytes().await?.to_vec();
        Ok(data)
    }
}
