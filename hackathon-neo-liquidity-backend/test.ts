import poolHelpers from "./src/helpers/poolContract";

const get = async () => {
  const pool = poolHelpers.getPoolInstance(
    "arb",
    "0x44b0FBd4C74C871bEC1E1fe91B75c9703727F11B"
  );
  const poolReserves = await poolHelpers.getPoolReserves(pool);
};
get();
