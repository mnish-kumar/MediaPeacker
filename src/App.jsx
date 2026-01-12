import { Suspense, lazy } from "react";
import Loading from "./pages/Loading.jsx";
const CardDetails = lazy(() => import("./pages/CardDetails.jsx"));
const SearchBar = lazy(() => import("./pages/SearchBar.jsx"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchBar />
      <CardDetails />
    </Suspense>
  );
};

export default App;