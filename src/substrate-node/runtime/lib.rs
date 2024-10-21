impl pallet_dapp::Config for Runtime {
    type Event = Event;
}

impl pallet_role::Config for Runtime {
    type Event = Event;
}

impl pallet_staking::Config for Runtime {
    type Event = Event;
}

impl pallet_cross_chain_bridge::Config for Runtime {
    type Event = Event;
}

impl pallet_dapp_rate_limit::Config for Runtime {
    type Event = Event;
}

// Add the pallets to the runtime construction
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        System: frame_system::{Module, Call, Config, Storage, Event<T>},
        DAppModule: pallet_dapp::{Module, Call, Storage, Event<T>},
        RoleModule: pallet_role::{Module, Call, Storage, Event<T>},
        StakingModule: pallet_staking::{Module, Call, Storage, Event<T>},
        CrossChainBridgeModule: pallet_cross_chain_bridge::{Module, Call, Storage, Event<T>},
        DAppRateLimitModule: pallet_dapp_rate_limit::{Module, Call, Storage, Event<T>},
        // Additional pallets...
    }
);
