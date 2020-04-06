import React from "react";

export interface NewsListProps {
    news: {
        id: number;
        title: string;
        body: string;
    }[];
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => (
    <div>
        {news.map((item, i) => (
            <div key={i}>
                <div>{item.title}</div>
                <div>{item.body}</div>
            </div>
        ))}
    </div>
);