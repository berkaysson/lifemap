import { useEffect, useState } from "react";

import dataUnitConstructor from "./Data/dataUnitConstructor";
import AppContent from "./Components/AppContent";

function App({db}) {
  
  return (
    <div className="App">
      <AppContent />
    </div>
  );
}

export default App;
