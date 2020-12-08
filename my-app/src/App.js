import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid.js'
import Content from './components/Content.js'
import Intro from './components/Intro.js'

function App() {
  return (
    <div className="App">
      <Intro />
      <Content />
      <Grid />
    </div>
  );
}

export default App;
