decl_storage! {
    trait Store for Module<T: Config> as DAppRateLimitModule {
        pub LastUploadTime get(fn last_upload_time): map hasher(blake2_128_concat) T::AccountId => T::BlockNumber;
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        #[weight = 10_000]
        pub fn upload_dapp(origin, name: Vec<u8>, description: Vec<u8>, version: Vec<u8>, cid: Vec<u8>) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            let block_number = <frame_system::Module<T>>::block_number();
            let last_upload = <LastUploadTime<T>>::get(&who);

            // Ensure users can only upload once every 100 blocks
            ensure!(block_number > last_upload + 100.into(), "Rate limit exceeded");

            <LastUploadTime<T>>::insert(&who, block_number);

            // Proceed with dApp upload
            let new_dapp = DApp {
                name,
                description,
                version,
                cid,
                status: DAppStatus::Pending,
            };
            <DApps<T>>::append(&who, new_dapp);

            Ok(())
        }
    }
}
