import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { set } from "lodash";

const Panel = styled.div`
  background: #272727;
  padding: 5px;
  cursor: pointer;
  border: 1px solid #3e3d3d;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 13px;
`;
const EditableWrapper = styled.div`
  padding: 10px;
  box-shadow: inset 0 0 10px 1px rgba(23, 20, 20, 0.52);
  background: #3a3535;
`;
const Editable = styled.input`
  border: 3px solid #464646;
  margin-bottom: 5px;
  padding: 5px;
  width: 100%;
  background: transparent;
  border: 2px solid #6f6e6e;
  color: #fff;
`;
const Button = styled.button`
  border: 0;
  width: 100%;
  background: #3c7177;
  color: #fff;
  height: 35px;
  border-radius: 20px;
`;

interface AppProps {
  data: any;
  fileName: string;
  onChange: (value: any) => void;
}

export const Editor: React.FC<AppProps> = ({ data, fileName, onChange }) => {
  const handleChange = useCallback(
    (path: string, value: string | number | boolean) => {
      set(data, path, value);
      onChange(data);
    },
    [data]
  );

  return <List json={data} title={fileName} onChange={handleChange} />;
};

interface ListProps {
  onChange: (path: string, value: string | number | boolean) => void;
  json: any;
  title: string | number | boolean;
  prefix?: string;
  level?: number;
  path?: string;
}

const List: React.FC<ListProps> = ({
  json,
  title,
  level,
  prefix,
  onChange,
}) => {
  const [expanded, setExpanded] = useState<boolean>((level || 0) < 3);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const nextLevel = (level || 0) + 1;
  const handleChange = useCallback(
    (value: string | number | boolean) => onChange(prefix || "", value),
    [prefix]
  );

  return (
    <>
      <Panel onClick={toggleExpanded}>
        <div>
          <LevelMargin level={level || 0} />
          {title}
        </div>
      </Panel>
      {expanded && (
        <div>
          {Array.isArray(json) ? (
            json.map((item: any, i) => (
              <List
                json={item}
                title={i}
                key={i}
                level={nextLevel}
                prefix={prefix ? `${prefix}[${i}]` : `[${i}]`}
                onChange={onChange}
              />
            ))
          ) : typeof json === "object" ? (
            Object.keys(json).map((key: string, i) => (
              <List
                json={json[key]}
                title={key}
                key={i}
                level={nextLevel}
                prefix={prefix ? `${prefix}.${key}` : key}
                onChange={onChange}
              />
            ))
          ) : (
            <EditableNode
              defaultValue={json}
              onChange={handleChange}
              path={prefix}
            />
          )}
        </div>
      )}
    </>
  );
};

interface EditableNodeProps {
  defaultValue: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  path?: string;
}

const EditableNode: React.FC<EditableNodeProps> = ({
  defaultValue,
  onChange,
  path,
}) => {
  const [value, setValue] = useState<string | number | boolean>(defaultValue);
  const onEdit = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(
        typeof defaultValue === "number"
          ? Number(e.target.value)
          : typeof defaultValue === "boolean"
          ? Boolean(e.target.value)
          : e.target.value
      ),
    []
  );

  const handleChange = useCallback(() => onChange(value), [value]);

  return (
    <EditableWrapper>
      {typeof defaultValue === "number" ? (
        <Editable value={String(value)} type="number" onChange={onEdit} />
      ) : typeof defaultValue === "boolean" ? (
        <Editable value={Number(value)} type="number" onChange={onEdit} />
      ) : (
        <Editable value={String(value)} onChange={onEdit} />
      )}
      <Button onClick={handleChange}>Save {path || ""}</Button>
    </EditableWrapper>
  );
};

const Point = styled.span`
  color: #504d4d;
  margin-right: 5px;
`;

interface LevelMarginProps {
  level: number;
}

const LevelMargin: React.FC<LevelMarginProps> = ({ level }) => (
  <>
    {new Array(level).fill(null).map((item, i) => (
      <Point> • </Point>
    ))}
  </>
);
