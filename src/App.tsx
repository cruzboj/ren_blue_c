//component imports
import Nav from "./components/NavgationBar/NavgationBar.tsx";
// import { SearchHistory } from "./components/History/SearchHistory.tsx";
import Account from "./components/AccountInterface/AccountInterface.tsx";
//import NewSubject from "./components/NewSubject/NewSubject.tsx";
// import Chat from "./components/Chat/Chat.tsx";
import Chat from "./components/Chat/Chat.tsx";
import Dnd from "./components/Dnd/Dnd.tsx";

import "./App.css";

// import { useState, useEffect, useRef } from "react";
// import RoadmapCard from "./components/PdfMaker/RoadmapCard.tsx";
// import { type RoadmapCardData }  from "../src/context/RoadmapContext.tsx"
// import RoadmapCardsContext from "../src/context/RoadmapContext.tsx"

function App() {
  // const [roadMapCardSession , setRoadMapCardSession ] = useState<RoadmapCardData[]>([]);

  return (
      <>
        <Nav>
          <Account />
          {/* <NewSubject /> */}
          {/* <SearchHistory /> */}
          <div>hello world</div>
        </Nav>

        <main className="relative flex-1 p-6 ml-64 h-screen">
            <Chat/>
          <Dnd>
            <div>yolo</div>
            {/* <RoadmapCardsContext.Provider value={{roadMapCardSession,setRoadMapCardSession}} >
            
            </RoadmapCardsContext.Provider>
              {roadMapCardSession && roadMapCardSession.map((content: any, index: number) => (
                <RoadmapCard key={index} content={content} />
              ))} */}
          </Dnd>
        </main>
      </>
  );
}

export default App;