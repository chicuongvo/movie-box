import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail/MovieDetail.tsx";
import Catalog from "./Catalog/Catalog.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="movies" element={<Catalog />}></Route>
          <Route path="movies/:id" element={<MovieDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
