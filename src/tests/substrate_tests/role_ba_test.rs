#[test]
fn admin_can_assign_roles() {
    new_test_ext().execute_with(|| {
        let admin = 1;
        let user = 2;
        // Assign Admin role
        assert_ok!(RoleModule::assign_role(Origin::signed(admin), user, Role::Validator));
        assert_eq!(RoleModule::roles(user), Role::Validator);
    });
}

#[test]
fn non_admin_cannot_assign_roles() {
    new_test_ext().execute_with(|| {
        let non_admin = 2;
        let user = 3;
        // Ensure assigning roles fails for non-admins
        assert_noop!(RoleModule::assign_role(Origin::signed(non_admin), user, Role::Validator), Error::<Test>::NotAuthorized);
    });
}
