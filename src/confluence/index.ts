import ConfluenceApi from "confluence-api";
import moment from "moment";

const config = {
    username: "pianorockcover@gmail.com",
    password: "b1vYLcoldh4X07Ofcsxl498D",
    baseUrl: "https://pianorockcover.atlassian.net/wiki"
};

const confluenceSpace = "TC";
const confluenceSpaceId = 33086;

export const confluence = new ConfluenceApi(config);

interface TestCase {
    image: string;
    desc: string;
}

export const publishTestCase = (testCases: TestCase[]) => {
    const title = `Test ${moment().format()}`;
    const content = testCases.map((tc) => `<table><tr><td>${wrapDesc(tc.desc)}</td><td>${wrapImage(tc.image)}</td></tr></table>`).join("");

    confluence.postContent(confluenceSpace, title, content, confluenceSpaceId,
        (e: any, data: any) =>
            !e && testCases.forEach((tc) => confluence.createAttachment(confluenceSpace, data.id, tc.image, () => { }))
    )
}

const wrapImage = (path: string) => {
    const pathAsAray = path.split("/");
    const imageName = pathAsAray[pathAsAray.length - 1];
    const imageSize = 400;

    return `<ac:image ac:width=\"${imageSize}\"><ri:attachment ri:filename=\"${imageName}\" /></ac:image>`;
}

const wrapDesc = (desc: string) => `<h2>${desc}</h2>`;