
# Cross-Chain Bridge Backend

## Project Vision and Features

The vision of this backend is to facilitate seamless cross-chain token swaps, making it easier for users to transfer tokens from one chain to another. It operates on the principle of *lock and release*, where a user locks their tokens on one chain through the frontend, and the backend catches the lock event. The indexer saves all the necessary transaction information, and an executor releases the tokens on the destination chain based on the locked events.

### Bridge Features:
- **Cross-Chain Token Swap:** Tokens can be swapped from one blockchain to another using the lock and release mechanism.
- **Lock Event Monitoring:** The backend monitors and records lock events triggered by users.
- **Release Executor:** Once locked, tokens can be released on the destination chain based on the recorded lock events.

## Deployment Details

- Clone the repository:  
  `https://github.com/ankur-dahiya/hackathon-neo-bridge.git`
  
- Run the following command to install dependencies:
  ```bash
  npm i
  ```

- Set up the environment variables by referring to the `.env.example` file.

## Demo Video Link
- *To be deployed soon*

## Deployment Links
- *To be provided soon*

## Team’s Contact Information
- Nishant Sharma: nishantsharmay2@gmail.com
- Anurag Sahu: anurag35412@gmail.com
- Ankur Dahiya: dahiyaankur998@gmail.com
- Aanchal Tripathi: aanchaltripathi1620@gmail.com
