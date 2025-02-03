import { LazyStore } from "@tauri-apps/plugin-store";

const store = new LazyStore('store.json', {
    autoSave: true
})

const setVal = async (key, value) => {
    await store.set(key, value)
}

const getVal = async (key) => {
    return await store.get(key)
}

const delVal = async (key) => {
    return await store.delete(key)
}

export { setVal, getVal, delVal }
