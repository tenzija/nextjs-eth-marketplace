import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { setupHooks } from "./hooks/setupHooks";
const { createContext, useContext, useEffect, useState, useMemo } = require("react");

const Web3Context = createContext(null)

export function useWeb3() {
  return useContext(Web3Context)
}

export function useHooks(cb) {
  const { hooks } = useWeb3()
  return cb(hooks)
}

export default function Web3Provider({children}) {
  const [ web3Api, setWeb3Api ] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks()
  })

  const _web3Api = useMemo(() => {
    const { provider, web3, isLoading } = web3Api

    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider ? 
        async () => {
          try {
            await provider.request({ method: 'eth_requestAccounts' })
          } catch (error) {
            console.log(error)
            location.reload()
          }
        } :
        () => console.log('Cannot connect to meatamask, please install it.')
    }

  }, [web3Api])

  useEffect(() => {
    const loadProvider = async() => {
      const provider = await detectEthereumProvider()
      if (provider) {
        const web3 = new ethers.providers.Web3Provider(provider)
        // From now on, this should always be true:
        // provider === window.ethereum
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
          hooks: setupHooks(web3, provider)
        }); // initialize your app
      } else {
        setWeb3Api(api => ({...api, isLoading: false}))
        console.log('Please install MetaMask!');
      }

    }
    
    loadProvider()
  }, [])

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}