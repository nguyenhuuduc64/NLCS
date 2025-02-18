import Home from './pages/Home/home';
import GlobalStyles from './GlobalStyle/globalstyles';
import './App.css';
import { createContext, useContext, useState } from 'react';

export const itemsContext = createContext();
function App() {
    const [itemsArrayFile, setItemsArrayFile] = useState([]);
    const [itemsArrayHand, setItemsArrayHand] = useState([]);
    const [greedy, setGreedy] = useState(false);
    const [branhAndBound, setBranhAndBound] = useState(false);
    const [dynamicProgramming, setDynamicProgramming] = useState(false);
    const [trongluong, setTrongluong] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputState, setInputState] = useState(false);
    const [parentIndex, setParentIndex] = useState(0);
    const [bnbCurrentIndex, setBnbCurrentIndex] = useState(0);
    const [totalValueGreedy, setTotalValueGreedy] = useState(0);
    const [totalValueBnb, setTotalValueBnb] = useState(0);

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
                branhAndBound,
                setBranhAndBound,
                dynamicProgramming,
                setDynamicProgramming,
                currentIndex,
                setCurrentIndex,
                inputState,
                setInputState,
                parentIndex,
                setParentIndex,
                bnbCurrentIndex,
                setBnbCurrentIndex,
                totalValueGreedy,
                setTotalValueGreedy,
                totalValueBnb,
                setTotalValueBnb,
            }}
        >
            <GlobalStyles>
                <div className="App">
                    {' '}
                    <Home />
                </div>
            </GlobalStyles>
        </itemsContext.Provider>
    );
}

export default App;
