decl_storage! {
    trait Store for Module<T: Config> as StakingModule {
        Stakes get(fn stakes): map hasher(blake2_128_concat) T::AccountId => T::Balance;
        Validators get(fn validators): map hasher(blake2_128_concat) T::AccountId => bool;
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        #[weight = 10_000]
        pub fn stake_tokens(origin, amount: T::Balance) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            <Stakes<T>>::insert(&who, amount);
            <Validators<T>>::insert(&who, true);
            Ok(())
        }

        #[weight = 10_000]
        pub fn unstake_tokens(origin) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            <Stakes<T>>::remove(&who);
            <Validators<T>>::remove(&who);
            Ok(())
        }
    }
}
