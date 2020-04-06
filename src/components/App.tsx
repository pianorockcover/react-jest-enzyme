import React, { useState, useEffect } from "react";
import { NewsList } from "./NewsList";
import { load } from "../services/load";

export const App: React.FC = () => {
    const [news, setNews] = useState<any>();

    useEffect(() => {
        if (!news) {
            load({
                onSuccess: (data) => setNews(data)
            })
        }
    }, [news])

    return (
        <div className="container pt-10">
            <button className="btn btn-primary">Load news</button>
            {news && <NewsList news={news} />}
        </div>
    )
}