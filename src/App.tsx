//component imports
import Nav from "./components/NavgationBar/NavgationBar.tsx";
import { SearchHistory } from "./components/History/SearchHistory.tsx";
import Account from "./components/AccountInterface/AccountInterface.tsx";
import NewSubject from "./components/History/NewSubject.tsx"
// import Chat from "./components/Chat/Chat.tsx";
import Chat from "./components/Chat/Chat.tsx";
import Dnd from "./components/Dnd/Dnd.tsx";

import "./App.css";
import SettingsButton from "./components/AccountInterface/UserOptions.tsx";
import { useAuth0 } from "@auth0/auth0-react";

// import { useState, useEffect, useRef } from "react";
// import RoadmapCard from "./components/PdfMaker/RoadmapCard.tsx";
// import { type RoadmapCardData }  from "../src/context/RoadmapContext.tsx"
// import RoadmapCardsContext from "../src/context/RoadmapContext.tsx"

function App() {
  // const [roadMapCardSession , setRoadMapCardSession ] = useState<RoadmapCardData[]>([]);
  const { isAuthenticated: islogged } = useAuth0();

  return (
      <>
        <Nav>
          <Account />
          {islogged ? 
            <>
              <NewSubject /> 
              <SearchHistory />
            </>
            : null}
        </Nav>

        <main className="relative flex-1 p-6 ml-64 h-screen">
          {islogged ? <Chat /> : null}
          {islogged ? <SettingsButton /> : null}
          <Dnd>
            <div className="bg-zinc-200 w-100 h-170 text-black">yolo</div>
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