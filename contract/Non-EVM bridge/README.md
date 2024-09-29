# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:
```text
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory. There is already a `hello_world` contract in there to get you started.
- If you initialized this project with any other example contracts via `--with-example`, those contracts will be in the `contracts` directory as well.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well. If you initialized this project with a frontend template via `--frontend-template` you will have those files already included.

# Deploy & Execute command 

1. Build command-
stellar contract build

2. Deploy command-
stellar contract deploy \
 --wasm target/wasm32-unknown-unknown/release/bridge.wasm \
 --source admin \
 --network testnet

3. Interact - Initialize
stellar contract invoke \
  --id CA6UHQAJTSR24TCV6OBXAPFNDNT56HSJRIRBENDLXGW3TEWZQ37O52WR \
  --source admin \
  --network testnet \
  -- initialize \
  --owner GAAIBDQI3VO65AYWIRAPI2SJJ2GS25VCZH6SYUG7YZPUQ364AVPEFGWT

4. set admin
stellar contract invoke \
  --id CA6UHQAJTSR24TCV6OBXAPFNDNT56HSJRIRBENDLXGW3TEWZQ37O52WR \
  --source admin \
  --network testnet \
  -- set_admin \
  --admin GAAIBDQI3VO65AYWIRAPI2SJJ2GS25VCZH6SYUG7YZPUQ364AVPEFGWT

5. Lock
stellar contract invoke \
  --id CA6UHQAJTSR24TCV6OBXAPFNDNT56HSJRIRBENDLXGW3TEWZQ37O52WR \
  --source admin \
  --network testnet \
  -- lock \
  --user_address GAAIBDQI3VO65AYWIRAPI2SJJ2GS25VCZH6SYUG7YZPUQ364AVPEFGWT \
  --from_token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC\
  --dest_token CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA \
  --in_amount 2 \
  --dest_chain 706f6c7900000000000000000000000000000000000000000000000000000000 \
  --recipient_address GAAIBDQI3VO65AYWIRAPI2SJJ2GS25VCZH6SYUG7YZPUQ364AVPEFGWT 

6. Release execution
stellar contract invoke \
  --id CA6UHQAJTSR24TCV6OBXAPFNDNT56HSJRIRBENDLXGW3TEWZQ37O52WR \
  --source admin \
  --network testnet \
  -- release \
  --amount 2 \
  --user GAAIBDQI3VO65AYWIRAPI2SJJ2GS25VCZH6SYUG7YZPUQ364AVPEFGWT \
  --destination_token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC 
