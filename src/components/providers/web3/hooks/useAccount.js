import { ethers } from "ethers"
import { useEffect, useState } from "react"
import useSWR from 'swr'

const adminAddresses = {
    '0xc685b9cfa58dfc33936631786979773f844a63b1d94adc7d904a03d0bd2a5b24' : true
}

export const handler = (web3, provider) => () => {

    const { data, mutate, ...rest } = useSWR(() => 
        web3 ? 'web3/account' : null ,
        async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts()
            const account = accounts[0]

            if (!account) {
                throw new Error('No account found')
            }

            return account
        }
    )

    useEffect(() => {
        const mutator = accounts => mutate(accounts[0] ?? null)

        provider?.on('accountsChanged', mutator)

        return () => {
            provider?.removeListener('accountsChanged', mutator)
        }
    }, [provider])

    return { 
        data,
        isAdmin: (data && adminAddresses[ethers.utils.keccak256(data)]) ?? false,
        mutate, 
        ...rest
    }
}
