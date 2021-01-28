import './app.scss';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Game from './components/game/game'

function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div >
  );
}

export default App;
