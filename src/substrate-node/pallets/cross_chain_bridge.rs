use frame_support::{decl_module, decl_storage, decl_event, dispatch};
use frame_system::ensure_signed;

decl_storage! {
    trait Store for Module<T: Config> as CrossChainBridgeModule {
        pub CrossChainMessages get(fn cross_chain_messages): map hasher(blake2_128_concat) u64 => Vec<u8>;
        pub NextMessageId get(fn next_message_id): u64;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        CrossChainMessageSent(u64, AccountId, u64),  // (target_chain_id, sender, message_id)
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        // Send a message from Substrate to another chain
        #[weight = 10_000]
        pub fn send_cross_chain_message(origin, target_chain_id: u64, message: Vec<u8>) -> dispatch::DispatchResult {
            let sender = ensure_signed(origin)?;

            // Store the cross-chain message
            let message_id = Self::next_message_id();
            <CrossChainMessages<T>>::insert(message_id, message.clone());
            <NextMessageId>::put(message_id + 1);

            // Emit event for message sending
            Self::deposit_event(RawEvent::CrossChainMessageSent(target_chain_id, sender, message_id));

            Ok(())
        }
    }
}
