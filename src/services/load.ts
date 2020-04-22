import axios from "axios";

export const apiUrl = "http://localhost:8001/news";

interface LoadOptions {
    onSuccess: (data: any) => void;
    onError?: (data: any) => void;
}

export const load = ({ onSuccess, onError }: LoadOptions) => axios.get(apiUrl)
    .then((data) => onSuccess(data.data))
    .catch(onError)