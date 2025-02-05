import Home from './pages/Home/home';
import GlobalStyles from './GlobalStyle/globalstyles';
import './App.css';
import { createContext, useContext, useState } from 'react';

export const itemsContext = createContext();
function App() {
    const [itemsArrayFile, setItemsArrayFile] = useState([]);
    const [itemsArrayHand, setItemsArrayHand] = useState([]);
    const [greedy, setGreedy] = useState(false);
    const [trongluong, setTrongluong] = useState(0);
    return (
        <itemsContext.Provider
            value={{
                itemsArrayFile,
                setItemsArrayFile,
                itemsArrayHand,
                setItemsArrayHand,
                greedy,
                setGreedy,
                setTrongluong,
                trongluong,
            }}
        >
            <GlobalStyles>
                <div className="App">
                    <Home />
                </div>
            </GlobalStyles>
        </itemsContext.Provider>
    );
}

export default App;
