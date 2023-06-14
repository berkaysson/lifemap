import { useState } from "react";
import styled from "styled-components";

import Button from "../Wrappers/Styled-Elements/Button";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";



const DexieImportExportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${({theme}) => theme.sizes.medium};
  gap: ${({ theme }) => theme.sizes.large};
  
  &>div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${({ theme }) => theme.sizes.small};
  }
`;

const ImportExport = ({ onExport, onImport }) => {
  const [file, setFile] = useState(null);

  const handleImport = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      onImport(file);
    } catch (error) {
      console.error("Failed to read file:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <CardWrapper>
      <DexieImportExportWrapper>
        <div>
          <h4>Export Database</h4>
          <Button text={"Export"} type={"button"} onClick={onExport} />
        </div>
        <div>
          <h4>Import Database</h4>
          <input type="file" accept=".json" onChange={handleFileChange} />
          <Button text={"Import"} type={"button"} onClick={handleImport} />
        </div>
      </DexieImportExportWrapper>
    </CardWrapper>
  );
};

export default ImportExport;
