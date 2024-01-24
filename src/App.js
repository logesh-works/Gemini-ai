import './App.css';
import TextToText from './TextToText';
import ImgtoText from './ImgToText';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<TextToText />} />
        <Route path="/img" element={<ImgtoText />} />
      </Routes>
    </Router>
  );
}

export default App;
