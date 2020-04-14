import React, { useState, useCallback } from "react";
import { NewsList } from "./NewsList";
import { load } from "../services/load";

export const App: React.FC = () => {
    const [news, setNews] = useState<any>();

    const onClickBtn = useCallback(() => {
        if (!news) {
            load({
                onSuccess: (data) => setNews(data)
            })
        }
    }, [news])

    return (
        <div className="container pt-4">
            <button
                className="btn btn-success"
                data-load-news-button
                onClick={onClickBtn}
            >
                Load news
            </button>
            {news && <NewsList news={news} />}
        </div>
    )
}