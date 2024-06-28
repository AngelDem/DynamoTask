import './App.scss';
import Today from './components/Days/Today/Today';
import NextDay from './components/Days/Nextdays/Nextday';

function App() {
  return (
    <div className="App">
        <header id="header">
        </header>
        <main>
            <div className="weather-box">
                <Today/>
                <NextDay/>
            </div>
        </main>
        <footer id="footer">
        </footer>
    </div>
  );
}

export default App;
