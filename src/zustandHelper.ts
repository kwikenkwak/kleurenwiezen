import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const storeResetList: (() => void)[] = []

export const resetAllStores = () => {
  storeResetList.forEach(reset => reset())
}

interface PersistConfig {
  version: number
  uuid: string
}

/**
 * This helper function allows for the creation of a small global store that can be made persistant.
 * Creating stores through this function will automatically add them to the global reset list (used during logout).
 *
 * @param content The object with initial values that should be contained in the store.
 *                It is possible to add methods that directly interact with the store values.
 *                Ex. (set, get) => ({ name: 'Bo', status: 'Ik heb dakpannen nodig',  receiveDakpannen: () => set({status: 'Geen dakpannen meer sturen'}) })
 * @param persistConfig Should be defined if the store should be persistant.
 *                      Requires a unique store id and a version number which should be updated with each modification of the store content.
 *                      Migration behaviour: when a store version mismatch is detected, the initial values defined in content will be used.
 *                      Ex. { uuid: 'ACCOUNT_CREDENTIALS', version: 3 }
 *
 * @returns A store object that can be used as a hook (more info https://github.com/pmndrs/zustand)
 */
export const createStore = <T extends object>(content: StateCreator<T>, persistConfig?: PersistConfig) => {
  type StoreType = T & { reset: () => void; _hasHydrated: boolean; setHasHydrated: (hydr: boolean) => void }

  const storeContent: StateCreator<StoreType> = (set, get, store) => {
    const initialState = content(set, get, store)
    const reset = () => set(() => ({ ...initialState, reset }), true)
    return {
      ...initialState,
      reset,
      _hasHydrated: false,
      setHasHydrated: state => {
        set({ ...store.getState(), _hasHydrated: state })
      },
    }
  }

  const store = persistConfig
    ? create<StoreType>()(
        persist(storeContent, {
          name: persistConfig.uuid,
          version: persistConfig.version,
          storage: createJSONStorage(() => AsyncStorage),
          onRehydrateStorage: () => state => {
            state?.setHasHydrated(true)
          },
        })
      )
    : create<StoreType>()(storeContent)

  storeResetList.push(() => {
    store.getState().reset()
  })

  return store
}
