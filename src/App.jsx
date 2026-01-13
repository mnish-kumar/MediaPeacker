import { Suspense, lazy } from "react";
import Loading from "./pages/Loading.jsx";
const CardDetails = lazy(() => import("./pages/CardDetails.jsx"));
const SearchBar = lazy(() => import("./pages/SearchBar.jsx"));

const App = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <main className="relative z-10 container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <SearchBar />
          <CardDetails />
        </Suspense>
      </main>
    </div>
  );
};

export default App;