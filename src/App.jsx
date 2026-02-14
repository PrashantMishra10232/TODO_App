import "./App.css";
import Focus from "./components/Todo.jsx";

const UNSPLASH_BG =
  "https://images.unsplash.com/photo-1761058556617-ddd0f3b9795e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2slMjBjYWxlbmRhcnxlbnwwfHwwfHx8MA%3D%3D";

function App() {
  return (
    <div className="app-bg">
      <img
        className="app-bg-image"
        src={UNSPLASH_BG}
        alt=""
        aria-hidden
      />
      <div className="app-bg-overlay" aria-hidden />
      <div className="app">
        <Focus />
      </div>
    </div>
  );
}

export default App;
