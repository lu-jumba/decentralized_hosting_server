use crate::{Module as DAppModule, Error};
use frame_support::{assert_ok, assert_noop};

#[test]
fn valid_dapp_upload_works() {
    new_test_ext().execute_with(|| {
        let user = 1;
        let name = b"Test DApp".to_vec();
        let description = b"A decentralized app".to_vec();
        let version = b"1.0".to_vec();
        let cid = b"Qm...".to_vec();

        // Valid dApp upload should work
        assert_ok!(DAppModule::upload_dapp(Origin::signed(user), name.clone(), description.clone(), version.clone(), cid.clone()));
        let dapps = DAppModule::dapps(user);
        assert_eq!(dapps.len(), 1);
        assert_eq!(dapps[0].name, name);
    });
}

#[test]
fn invalid_dapp_upload_rejects_long_name() {
    new_test_ext().execute_with(|| {
        let user = 1;
        let long_name = vec![0; 101];  // Exceeds length limit
        let description = b"A decentralized app".to_vec();
        let version = b"1.0".to_vec();
        let cid = b"Qm...".to_vec();

        // Ensure that dApp upload with invalid long name is rejected
        assert_noop!(
            DAppModule::upload_dapp(Origin::signed(user), long_name, description.clone(), version.clone(), cid.clone()),
            Error::<Test>::NameTooLong
        );
    });
}
