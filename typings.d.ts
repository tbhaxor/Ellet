import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import { Contract } from "web3-eth-contract"

import Vue from 'vue'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
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
}
