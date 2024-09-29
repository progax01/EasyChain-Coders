// #![no_std]

// use soroban_sdk::{
//     contract, contractimpl, contracttype, token, xdr::ScErrorCode, xdr::ScErrorType, Address,
//     Bytes, BytesN, Env, Error,
// };

// #[derive(Clone)]
// #[contracttype]
// pub enum DataKey {
//     Init,
//     Owner,
//     Admin,
//     LockData,
// }

// #[derive(Clone)]
// #[contracttype]
// pub struct LockData {
//     pub dest_token: Address,
//     pub from_token: Address,
//     pub in_amount: i128,
//     pub swaped_amount: i128,
//     pub recipient_address: Address,
//     pub dest_chain: Bytes,
// }

// #[contract]
// pub struct LockAndReleaseContract;

// #[contractimpl]
// impl LockAndReleaseContract {
//     pub fn initialize(env: Env, owner: Address) {
//         if env.storage().instance().has(&DataKey::Init) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::ExistingValue,
//             ));
//         }
//         env.storage().instance().set(&DataKey::Owner, &owner);
//         env.storage().instance().set(&DataKey::Init, &());
//     }

//     pub fn set_admin(env: Env, admin: Address) {
//         let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
//         owner.require_auth();

//         env.storage().instance().set(&DataKey::Admin, &admin);
//     }

//     pub fn remove_admin(env: Env) {
//         let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
//         owner.require_auth();

//         if !env.storage().instance().has(&DataKey::Admin) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::InvalidAction,
//             ));
//         }

//         env.storage().instance().remove(&DataKey::Admin);
//     }

//     pub fn lock(
//         env: Env,
//         user_address: Address,
//         from_token: Address,
//         dest_token: Address,
//         in_amount: i128,
//         swaped_amount: i128,
//         dest_chain: Bytes,
//         recipient_address: Address,
//         info_data: BytesN<32>,
//         info: BytesN<32>, // Combined hash passed as input
//     ) {
//         user_address.require_auth();

//         if !env.storage().instance().has(&DataKey::Admin) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::MissingValue,
//             ));
//         }

//         let val = ("event values", in_amount, swaped_amount);
//         let _admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();

//         let in_amount_bytes = in_amount.to_be_bytes();
//         env.events().publish(val, in_amount_bytes); //sadfsd
//         let _swaped_amount_bytes = swaped_amount.to_be_bytes();
//         let mut result: [u8; 32] = [0u8; 32];
//         env.events().publish(val, result); //sadfasdf
//         info_data.copy_into_slice(&mut result);

//         let secretstr = "shadow love forest gentle lunar blueocean fragile bullble cherryblooms vibrant greencolor breeze orchard";
//         let secret = secretstr.as_bytes();

//         let mut combined_string = Bytes::new(&env);
//         combined_string.extend_from_slice(&in_amount_bytes);
//         combined_string.extend_from_slice(&result);
//         combined_string.extend_from_slice(&secret);
//         // combined_string.extend_from_slice(&swaped_amount_bytes);

//         let generated_hash = env.crypto().sha256(&combined_string);

//         let newtopic = ("This is combined string and hash",10);
//         env.events().publish(newtopic, combined_string); //asdfasdf

//         if generated_hash.to_bytes() != info {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::InvalidInput,
//             ));
//         }
//         env.events().publish(newtopic, generated_hash); //asdfasdf


//         let topics0 = (
//             "LockEvent",
//             from_token.clone(),
//             in_amount,
//             swaped_amount,
//             dest_token.clone(),
//             dest_chain.clone(),
//             recipient_address.clone(),
//             info_data.clone(),
//         );

//         env.events().publish(topics0, 1);

//         env.storage().instance().set(
//             &DataKey::LockData,
//             &LockData {
//                 dest_token,
//                 from_token,
//                 in_amount,
//                 swaped_amount,
//                 recipient_address,
//                 dest_chain,
//             },
//         );
//     }

//     pub fn release(env: Env, amount: i128, user: Address, destination_token: Address) {
//         let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
//         admin.require_auth();

//         let admin_balance = token::Client::new(&env, &destination_token).balance(&admin);
//         if admin_balance < amount {
//             panic!("admin does not have enough destination tokens");
//         }

//         token::Client::new(&env, &destination_token).transfer(&admin, &user, &amount);
//     }
// }




// #![no_std]

// use soroban_sdk::{
//     contract, contractimpl, contracttype, token, xdr::ScErrorCode, xdr::ScErrorType, Address,
//     Bytes, Env, Error,
// };

// #[derive(Clone)]
// #[contracttype]
// pub enum DataKey {
//     Init,
//     Owner,
//     Admin,
//     LockData,
// }

// #[derive(Clone)]
// #[contracttype]
// pub struct LockData {
//     pub dest_token: Address,
//     pub from_token: Address,
//     pub in_amount: i128,
//     pub swaped_amount: i128,
//     pub recipient_address: Address,
//     pub dest_chain: Bytes,
// }

// #[contract]
// pub struct LockAndReleaseContract;

// #[contractimpl]
// impl LockAndReleaseContract {
//     pub fn initialize(env: Env, owner: Address) {
//         if env.storage().instance().has(&DataKey::Init) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::ExistingValue,
//             ));
//         }
//         env.storage().instance().set(&DataKey::Owner, &owner);
//         env.storage().instance().set(&DataKey::Init, &());
//     }

//     pub fn set_admin(env: Env, admin: Address) {
//         let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
//         owner.require_auth();

//         env.storage().instance().set(&DataKey::Admin, &admin);
//     }

//     pub fn remove_admin(env: Env) {
//         let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
//         owner.require_auth();

//         if !env.storage().instance().has(&DataKey::Admin) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::InvalidAction,
//             ));
//         }

//         env.storage().instance().remove(&DataKey::Admin);
//     }

//     pub fn lock(
//         env: Env,
//         user_address: Address,
//         from_token: Address,
//         dest_token: Address,
//         in_amount: i128,
//         swaped_amount: i128,
//         dest_chain: Bytes,
//         recipient_address: Address,
//     ) {
//         user_address.require_auth();

//         if !env.storage().instance().has(&DataKey::Admin) {
//             env.panic_with_error(Error::from_type_and_code(
//                 ScErrorType::Contract,
//                 ScErrorCode::MissingValue,
//             ));
//         }

//         // let _admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();

//         // let in_amount_bytes = in_amount.to_be_bytes();
//         // let _swaped_amount_bytes = swaped_amount.to_be_bytes();
//         // let mut result: [u8; 32] = [0u8; 32];

//         // info_data.copy_into_slice(&mut result);

//         // let secretstr = "shadow love forest gentle lunar blueocean fragile bullble cherryblooms vibrant greencolor breeze orchard";
//         // let secret = secretstr.as_bytes();

//         // let mut combined_string = Bytes::new(&env);
//         // combined_string.extend_from_slice(&in_amount_bytes);
//         // combined_string.extend_from_slice(&result);
//         // combined_string.extend_from_slice(&secret);
//         // // combined_string.extend_from_slice(&swaped_amount_bytes);

//         // let generated_hash = env.crypto().sha256(&combined_string);

//         // if generated_hash.to_bytes() != info {
//         //     env.panic_with_error(Error::from_type_and_code(
//         //         ScErrorType::Contract,
//         //         ScErrorCode::InvalidInput,
//         //     ));
//         // }

//         token::Client::new(&env, &from_token).transfer(&user_address, &env.current_contract_address(), &in_amount);

//         let topics0 = (
//             "LockEvent",
//             from_token.clone(),
//             in_amount,
//             swaped_amount,
//             dest_token.clone(),
//             dest_chain.clone(),
//             recipient_address.clone(),
//         );

//         env.events().publish(topics0, 1);

//         env.storage().instance().set(
//             &DataKey::LockData,
//             &LockData {
//                 dest_token,
//                 from_token,
//                 in_amount,
//                 swaped_amount,
//                 recipient_address,
//                 dest_chain,
//             },
//         );
//     }

//     pub fn claim(env: Env, claimant: Address) {
//         // Ensure the claimant has authorized this call.
//         claimant.require_auth();
    
//         // Retrieve the locked data from storage.
//         let lock_data: LockData = env.storage().instance().get(&DataKey::LockData).unwrap();
    
//         // Check if the claimant is the intended recipient.
//         // if lock_data.recipient_address != claimant {
//         //     env.panic_with_error(Error::from_type_and_code(
//         //         ScErrorType::Contract,
//         //         ScErrorCode::InvalidAction,
//         //     ));
//         // }
    
//         // Transfer the swaped_amount of dest_token from the contract to the claimant.
//         token::Client::new(&env, &lock_data.from_token).transfer(
//             &env.current_contract_address(),
//             &claimant,
//             &lock_data.swaped_amount,
//         );
    
//         // Optionally, you can remove the lock data from storage after a successful claim.
//         // env.storage().instance().remove(&DataKey::LockData);
        
//         // Emit an event to indicate a successful claim.
//         let topics0 = (
//             "ClaimEvent",
//             lock_data.dest_token,
//             lock_data.swaped_amount,
//             claimant.clone(),
//         );
    
//         env.events().publish(topics0, 1);
//     }
    
// }

//     pub fn release(env: Env, amount: i128, user: Address, destination_token: Address) {
//         let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
//         admin.require_auth();

//         let admin_balance = token::Client::new(&env, &destination_token).balance(&admin);
//         if admin_balance < amount {
//             panic!("admin does not have enough destination tokens");
//         }

//         token::Client::new(&env, &destination_token).transfer(&admin, &user, &amount);
//     }


// ************ above is the prev main code *****************************

#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, xdr::ScErrorCode, xdr::ScErrorType, Address,
    Bytes, Env, Error, String,
};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Init,
    Owner,
    AdminSet,
    Admin,
    LockData,
}

#[derive(Clone)]
#[contracttype]
pub struct LockData {
    pub user_address: Address,
    pub dest_token: String,
    pub from_token: Address,
    pub in_amount: i128,
    pub swaped_amount: i128,
    pub recipient_address: String,
    pub dest_chain: Bytes,
}

#[derive(Clone)]
#[contracttype]
pub struct AdminData {
    pub admin_address: Address,
}

#[contract]
pub struct LockAndReleaseContract;

#[contractimpl]
impl LockAndReleaseContract {
    pub fn initialize(env: Env, owner: Address) {
        // Ensure the contract has not been initialized before
        if env.storage().instance().has(&DataKey::Init) {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::ExistingValue,
            ));
        }
        // Set the contract owner
        env.storage().instance().set(&DataKey::Owner, &owner);
        // Mark the contract as initialized
        env.storage().instance().set(&DataKey::Init, &());
    }

    pub fn set_admin(env: Env, admin: Address) {
        // Ensure that the function is called only once after initialization
        if env.storage().instance().has(&DataKey::AdminSet) {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::InvalidAction,
            ));
        }

        // Only the owner can set the admin address
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        owner.require_auth();

        // Store the admin address in the AdminData struct
        env.storage().instance().set(
            &DataKey::Admin,
            &AdminData {
                admin_address: admin.clone(),
            },
        );

        // Mark that the admin has been set, so it can't be changed again
        env.storage().instance().set(&DataKey::AdminSet, &());

        // Optionally emit an event indicating admin setup
        let topics = ("AdminSetEvent", admin);
        env.events().publish(topics, 1);
    }

    pub fn lock(
        env: Env,
        user_address: Address,
        from_token: Address,
        dest_token: String,
        in_amount: i128,
        dest_chain: Bytes,
        recipient_address: String,
    ) {
        // Ensure user has authorized the action
        user_address.require_auth();

        // Ensure the admin address is set
        if !env.storage().instance().has(&DataKey::Admin) {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::MissingValue,
            ));
        }

        // Ensure in_amount is greater than or equal to 1
        if in_amount < 1 {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::InvalidAction,
            ));
        }

        // Calculate swaped_amount using the provided formula: swaped_amount = in_amount * 0.7
        let swaped_amount = in_amount - (in_amount * 3 / 100);

        // Ensure swaped_amount is at least 1
        if swaped_amount < 1 {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::InvalidAction,
            ));
        }

        // Transfer in_amount from user to contract address
        token::Client::new(&env, &from_token).transfer(&user_address, &env.current_contract_address(), &in_amount);

        // Fetch admin address securely from AdminData
        let admin_data: AdminData = env.storage().instance().get(&DataKey::Admin).unwrap();
        let admin_address = admin_data.admin_address;

        // Transfer swaped_amount from contract to admin address
        token::Client::new(&env, &from_token).transfer(&env.current_contract_address(), &admin_address, &swaped_amount);

        // Emit lock event
        let topics0 = (
            "LockEvent",
            user_address.clone(),
            dest_token.clone(),
            in_amount,
            swaped_amount,
            recipient_address.clone(),
            dest_chain.clone(),
            from_token.clone(),
        );

        env.events().publish(topics0, 1);

        // Store lock data
        env.storage().instance().set(
            &DataKey::LockData,
            &LockData {
                user_address,
                dest_token,
                from_token,
                in_amount,
                swaped_amount,
                recipient_address,
                dest_chain,
            },
        );
    }

    pub fn release(env: Env, amount: i128, user: Address, destination_token: Address) {
        // Retrieve the admin address from storage.
        let admin_data: AdminData = env.storage().instance().get(&DataKey::Admin).unwrap();
        let admin = admin_data.admin_address;

        // Ensure that only the admin can call this function.
        admin.require_auth();

        // Verify the balance of the admin.
        let admin_balance = token::Client::new(&env, &destination_token).balance(&admin);
        if admin_balance < amount {
            env.panic_with_error(Error::from_type_and_code(
                ScErrorType::Contract,
                ScErrorCode::InvalidAction,
            ));
        }

        // Transfer tokens from the admin to the user.
        token::Client::new(&env, &destination_token).transfer(&admin, &user, &amount);
    }
}