import axios from "axios";

export const apiUrl = "https://jsonplaceholder.typicode.com/posts";

interface LoadOptions {
    onSuccess: (data: any) => void;
    onError?: (data: any) => void;
}

export const load = ({ onSuccess, onError }: LoadOptions) => axios.get(apiUrl)
    .then((data) => onSuccess(data.data))
    .catch(onError)