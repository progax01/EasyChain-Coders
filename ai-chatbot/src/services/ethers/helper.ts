import { ethers } from "ethers"
import Chain from "../../config/chains";
import { ContractTypes } from "../../types/enums";

export default class Helpers{
    static getInstance = async (chainId:string,contractType:ContractTypes)=>{
        try{
            const provider = new ethers.JsonRpcProvider(
                Chain[chainId].rpc
              );
              const contract = new ethers.Contract(Chain[chainId].contract[contractType].address, Chain[chainId].contract[contractType].abi, provider);
              return contract;
        }
        catch(error){
            throw new Error(`Error while getting instance`)
        }
    }
}