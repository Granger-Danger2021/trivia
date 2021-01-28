import './App.css';
import Header from '../src/components/header/header'
import Footer from '../src/components/footer/footer'
import Game from '../src/components/game/game'

function App() {
  return (
    <div className="App">
      <Header />
      <h1>we are alive!!</h1>
      <Game />
      <Footer />
    </div>
  );
}

export default App;
