import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { PadsComponent } from './Components/Pads';




function App() {
    
  return (
      <div className="App">
          <header><div className="machine"><h1>Loop Machine</h1></div></header>
          <body>
              
              <div className="content"><PadsComponent /></div>
            
              </body>
    </div>
  );
}

export default App;
