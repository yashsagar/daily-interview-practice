import { useState } from "react";
import directoryTree from "./data/folderData";
import Folder from "./components/Folder";
import { updateDirectory } from "./utils/updateDireactory";

function App() {
  const [directoryData, setDirectoryData] = useState(directoryTree);

  const handleDirectory = ({ id, info }) => {
    const updatedDirectory = updateDirectory({
      directory: directoryData,
      id,
      info,
    });
    setDirectoryData(updatedDirectory);
  };

  return (
    <div className="select-none">
      <Folder directoryData={directoryData} handleDirectory={handleDirectory} />
    </div>
  );
}

export default App;
