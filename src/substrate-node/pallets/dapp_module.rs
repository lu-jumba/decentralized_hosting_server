use frame_support::{decl_module, decl_storage, decl_event, decl_error, dispatch};
use frame_system::ensure_signed;

#[derive(Encode, Decode, Clone, PartialEq, Eq, Debug)]
pub enum DAppStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Encode, Decode, Clone, PartialEq, Eq, Debug)]
pub struct DApp {
    pub name: Vec<u8>,
    pub description: Vec<u8>,
    pub version: Vec<u8>,
    pub cid: Vec<u8>,
    pub status: DAppStatus,
}

#[weight = 10_000]
pub fn upload_dapp(
    origin, 
    name: Vec<u8>, 
    description: Vec<u8>, 
    version: Vec<u8>, 
    cid: Vec<u8>
) -> dispatch::DispatchResult {
    let who = ensure_signed(origin)?;

    // Input validation
    ensure!(name.len() > 0 && name.len() <= 100, "Invalid dApp name length");
    ensure!(description.len() > 0 && description.len() <= 500, "Invalid dApp description length");
    ensure!(version.len() <= 20, "Version length exceeds limit");

    // Insert dApp into storage
    let new_dapp = DApp {
        name,
        description,
        version,
        cid,
        status: DAppStatus::Pending,
    };
    <DApps<T>>::append(&who, new_dapp);

    // Emit event for dApp upload
    Self::deposit_event(RawEvent::DAppUploaded(who));

    Ok(())
}


decl_storage! {
    trait Store for Module<T: Config> as DAppModule {
        pub DApps get(fn dapps): map hasher(blake2_128_concat) T::AccountId => Vec<DApp>;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        DAppUploaded(AccountId, Vec<u8>),
        DAppApproved(AccountId, u32),
        DAppRejected(AccountId, u32),
    }
}

decl_error! {
    pub enum Error for Module<T: Config> {
        NotAuthorized,
        DAppNotFound,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        pub fn upload_dapp(origin, name: Vec<u8>, description: Vec<u8>, version: Vec<u8>, cid: Vec<u8>) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(name.len() <= 100, "Name too long");
            ensure!(description.len() <= 500, "Description too long");
            ensure!(version.len() <= 20, "Version too long");
            let new_dapp = DApp {
                name: name.clone(),
                description: description.clone(),
                version: version.clone(),
                cid: cid.clone(),
                status: DAppStatus::Pending,
            };
            <DApps<T>>::append(&who, new_dapp.clone());
            Self::deposit_event(RawEvent::DAppUploaded(who, name));
            Ok(())
        }

        #[weight = 10_000]
        pub fn approve_dapp(origin, uploader: T::AccountId, index: u32) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(Self::roles(&who) == Role::Admin, Error::<T>::NotAuthorized);
            let mut dapps = <DApps<T>>::get(&uploader);
            ensure!(index < dapps.len() as u32, Error::<T>::DAppNotFound);
            dapps[index as usize].status = DAppStatus::Approved;
            <DApps<T>>::insert(&uploader, dapps);
            Self::deposit_event(RawEvent::DAppApproved(uploader, index));
            Ok(())
        }

        #[weight = 10_000]
        pub fn reject_dapp(origin, uploader: T::AccountId, index: u32) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            ensure!(Self::roles(&who) == Role::Admin, Error::<T>::NotAuthorized);
            let mut dapps = <DApps<T>>::get(&uploader);
            ensure!(index < dapps.len() as u32, Error::<T>::DAppNotFound);
            dapps[index as usize].status = DAppStatus::Rejected;
            <DApps<T>>::insert(&uploader, dapps);
            Self::deposit_event(RawEvent::DAppRejected(uploader, index));
            Ok(())
        }
    }
}
