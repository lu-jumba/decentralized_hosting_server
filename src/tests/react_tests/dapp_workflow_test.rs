use crate::pallets::{DAppModule, RoleModule};
use frame_support::assert_ok;

#[test]
fn dapp_upload_review_approval_workflow() {
    new_test_ext().execute_with(|| {
        let user = 1;
        let admin = 2;
        let name = b"Test DApp".to_vec();
        let description = b"Decentralized app".to_vec();
        let version = b"1.0".to_vec();
        let cid = b"Qm...".to_vec();

        // User uploads the dApp
        assert_ok!(DAppModule::upload_dapp(Origin::signed(user), name.clone(), description.clone(), version.clone(), cid.clone()));

        // Admin reviews and approves the dApp
        RoleModule::assign_role(Origin::signed(admin), admin, Role::Admin);
        assert_ok!(DAppModule::approve_dapp(Origin::signed(admin), user, 0));

        // Check that the dApp is now approved
        let dapps = DAppModule::dapps(user);
        assert_eq!(dapps[0].status, DAppStatus::Approved);
    });
}
