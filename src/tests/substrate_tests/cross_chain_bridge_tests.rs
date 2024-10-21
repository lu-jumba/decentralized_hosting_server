use crate::{Module as CrossChainBridgeModule, Error};
use frame_support::{assert_ok, assert_noop};

#[test]
fn valid_cross_chain_message_send_works() {
    new_test_ext().execute_with(|| {
        let user = 1;
        let chain_id = 1;  // Ethereum
        let message = b"Hello Ethereum".to_vec();

        // Valid message should be sent
        assert_ok!(CrossChainBridgeModule::send_cross_chain_message(Origin::signed(user), chain_id, message.clone()));
        let stored_message = CrossChainBridgeModule::cross_chain_messages(0);  // First message
        assert_eq!(stored_message, message);
    });
}

#[test]
fn invalid_cross_chain_message_fails() {
    new_test_ext().execute_with(|| {
        let user = 1;
        let chain_id = 0;  // Invalid chain ID
        let message = b"Hello Ethereum".to_vec();

        // Invalid chain ID should result in error
        assert_noop!(
            CrossChainBridgeModule::send_cross_chain_message(Origin::signed(user), chain_id, message.clone()),
            Error::<Test>::InvalidChainId
        );
    });
}
