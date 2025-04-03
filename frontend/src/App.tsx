import { lazy, Suspense } from "react";

const Home = lazy(() => import("./components/Home"));

const App: React.FC = () => {

  return (
    <div className="bg-[#f7f7f9] text-black min-h-screen pb-6">
      <Suspense fallback={<div className="text-center mt-28">Loading your app...</div>}>
        <Home/>
      </Suspense>
    </div>
  );
};

export default App;
