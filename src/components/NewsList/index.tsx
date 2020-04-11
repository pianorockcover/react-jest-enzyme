import React from "react";

export interface NewsListProps {
    news: {
        id: number;
        title: string;
        body: string;
    }[];
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => (
    <div data-news-list>
        {news.map((item, i) => (
            <div
                className="card"
                key={i}
                data-news-card
            >
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <div>{item.body}</div>
                </div>
            </div>
        ))}
    </div>
);