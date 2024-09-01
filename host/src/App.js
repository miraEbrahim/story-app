import React, { Suspense } from "react";
import Story from "story/src/shared/Story";


function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading...">
      <Story />
      </Suspense>
    </div>
  );
}

export default App;
