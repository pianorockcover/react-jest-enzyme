import { shallow } from "enzyme"
import React from "react";
import { NewsList, NewsListProps } from "..";

describe("Test components", () => {
    it("Test NewsList component render", () => {
        const props: NewsListProps = {
            news: [
                {
                    id: 1,
                    title: "title",
                    body: "body"
                }
            ]
        }

        const copomnent = shallow(<NewsList { ...props } />);
        expect(copomnent).toMatchSnapshot();
    })
})