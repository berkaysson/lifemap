import { useState } from "react";

import Button from "../Interfaces/Button";

import styled from "styled-components";

const DexieImportExportWrapper = styled.div`
  border: 3px solid green;
`;

const DexieImportExport = ({ onExport, onImport }) => {
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
    <DexieImportExportWrapper>
      <Button text={"Export"} type={"button"} onClick={onExport} />

      <h4>Import Database</h4>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <Button text={"Import"} type={"button"} onClick={handleImport} />
    </DexieImportExportWrapper>
  );
};

export default DexieImportExport;
