import { useEffect, useState } from "react";
import { fetchDataFromUrl } from "../Utils/Api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("Loading...");
        setError(null);
        setData(null);

        fetchDataFromUrl(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            }).catch((err) => {
                setLoading(false);
                setError(err);
            })
    }, [url]);
    return {data, loading, error};
};

export {useFetch}; 