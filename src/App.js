import Home from './pages/Home/home';
import GlobalStyles from './GlobalStyle/globalstyles';
import './App.css';
import { createContext, useContext, useState } from 'react';

export const itemsContext = createContext();
function App() {
    const [itemsArray, setItemsArray] = useState([]);
    return (
        <itemsContext.Provider value={{ itemsArray, setItemsArray }}>
            <GlobalStyles>
                <div className="App">
                    <Home />
                </div>
            </GlobalStyles>
        </itemsContext.Provider>
    );
}

export default App;
