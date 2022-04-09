import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import VideoPlayer from "./VideoPlayer";
import LoginUser from "./LoginUser";

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundImage:
            'url("https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg")',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/phim/:id" element={<VideoPlayer />}></Route>
          <Route path="/dangnhap" element={<LoginUser />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
