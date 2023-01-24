import Card from "./components/Card";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="all-items">
        <div id="section-news" className="titles">News</div>
        <Card />
      </div>
      
    </>
  );
}

export default App;
