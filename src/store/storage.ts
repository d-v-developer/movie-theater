export function loadState<T>(key: string): T | undefined {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            return undefined
        }   
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export function saveState<T>(key: string, state: T) {
    localStorage.setItem(key, JSON.stringify(state))
}