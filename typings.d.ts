import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import { Contract } from "web3-eth-contract"
import "vue"
import "process"

declare module 'vue/types/vue' {
    interface Vue {
        $web3: Web3
        $contract: Contract
        $eth: MetaMaskInpageProvider
    }
}

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }

    declare namespace NodeJS {
        export interface ProcessEnv {
            VUE_APP_CONTRACT_ADDRESS: string;
            VUE_APP_CHAIN_URL: string;
            VUE_APP_CHAIN_PROTOCOL: "http" | "https";
        }
    }
}

