#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::{testutils::Address as TestAddress, Env};

    #[test]
    fn test_set_admin_unauthorized() {
        let env = Env::default();
        let owner_address = TestAddress::random(&env);
        let non_owner_address = TestAddress::random(&env);
        let admin_address = TestAddress::random(&env);

        // Initialize the contract with the owner address
        LockAndReleaseContract::initialize(env.clone(), owner_address.clone());

        // Try setting admin with a non-owner address
        let result = std::panic::catch_unwind(|| {
            env.with_source_account(&non_owner_address, || {
                LockAndReleaseContract::set_admin(env.clone(), admin_address.clone())
            });
        });
        assert!(result.is_err(), "Non-owner should not be able to set admin");

        // Check the error
        if let Err(err) = result {
            let error: Error = env.error_as_val(&err).into();
            assert_eq!(error, Error::from_type_and_code(ScErrorType::Contract, ScErrorCode::Unauthorized));
        }
    }

    #[test]
    fn test_set_admin_authorized() {
        let env = Env::default();
        let owner_address = TestAddress::random(&env);
        let admin_address = TestAddress::random(&env);

        // Initialize the contract with the owner address
        LockAndReleaseContract::initialize(env.clone(), owner_address.clone());

        // Set admin with the owner address
        let result = std::panic::catch_unwind(|| {
            env.with_source_account(&owner_address, || {
                LockAndReleaseContract::set_admin(env.clone(), admin_address.clone())
            });
        });
        assert!(result.is_ok(), "Owner should be able to set admin");

        // Verify the admin address is set correctly
        let stored_admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        assert_eq!(stored_admin, admin_address);
    }
}
