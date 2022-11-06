import './App.css';
import LeftSideControl from './LeftSideControl';
import RightSideVisualizer from './RightSideVisualizer';

function App() {
  return (
    <div style={{position:'absolute',top:'0px',left:'0px',height:'100%',width:'100%',display:'flex'}}>
      <LeftSideControl />
      <RightSideVisualizer />
    </div>
  );
}

export default App;
