#[derive(Encode, Decode, Clone, PartialEq, Eq, Debug)]
pub enum Role {
    Admin,
    Validator,
    User,
}

decl_storage! {
    trait Store for Module<T: Config> as RoleModule {
        pub Roles get(fn roles): map hasher(blake2_128_concat) T::AccountId => Role;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        RoleAssigned(AccountId, Role),
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        pub fn assign_role(origin, account: T::AccountId, role: Role) -> dispatch::DispatchResult {
            let sender = ensure_signed(origin)?;
            ensure!(Self::roles(&sender) == Role::Admin, Error::<T>::NotAuthorized);
            <Roles<T>>::insert(&account, role.clone());
            Self::deposit_event(RawEvent::RoleAssigned(account, role));
            Ok(())
        }
    }
}
