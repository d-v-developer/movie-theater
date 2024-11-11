import { useEffect, useState } from "react";
import { LocalStorageProps } from "./localStorage.props";

export function useLocalStorage(key: string): [LocalStorageProps[], (data: LocalStorageProps[]) => void, boolean] {
    const [data, setData] = useState<LocalStorageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log('useLocalStorage useEffect called');
        const res = localStorage.getItem(key);
        if (res) {
            const parsedData = JSON.parse(res) as LocalStorageProps[];
            if (parsedData) {
                console.log('Parsed data:', parsedData);
                setData(parsedData);
            }
        }
        setLoading(false);
    }, [key]);

    const saveData = (newData: LocalStorageProps[]) => {
        if (newData.length) {
            localStorage.setItem(key, JSON.stringify(newData));
            setData(newData);
        }
    }

    return [data, saveData, loading]
}