import './App.css';
import TextToText from './TextToText';
import ImgtoText from './ImgToText';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Routes>
    <Route index element={<TextToText />} />
    <Route path="/img" element={<ImgtoText />} />
  </Routes>

  );
}

export default App;
