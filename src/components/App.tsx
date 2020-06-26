import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Editor } from "./Editor";
import styled, { createGlobalStyle } from "styled-components";
import queryString from "query-string";

const testJson = {
  a: {
    b: 123,
    c: {
      e: "test",
    },
  },
  g: [
    {
      f: 2,
    },
  ],
  6: true,
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #444444;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #444;
  color: #fff;
  margin-bottom: 300px;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;

export const App = () => {
  const [data, setData] = useState<any>();

  const fileName = useMemo(() => queryString.parse(location.search).f, []);

  const handleChange = useCallback(
    (value: any) => {
      // axios.get().then(() => {setData(undefined) alert("Saved")})
      setData(undefined);
    },
    [data]
  );

  useEffect(() => {
    if (!data) {
      // axios.
      setTimeout(() => setData(testJson), 1000);
    }
  }, [data]);

  return (
    <Wrapper>
      <GlobalStyle />
      {data && fileName ? (
        <Editor
          data={data}
          onChange={handleChange}
          fileName={fileName.toString()}
        />
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
};

const Loader: React.FC = () => <LoaderWrapper>Загрузка...</LoaderWrapper>;
