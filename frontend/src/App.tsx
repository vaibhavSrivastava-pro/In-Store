import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import LandingPage from "./pages/Landing";
import TalkToYourProduct from "./components/TalkToYourProduct";
import CompareProducts from "./components/CompareProducts";
import Billing from "./components/Billing";

export default function App() {
  return (
    <main className="bg-black min-h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/TalkToYourProduct" element={<TalkToYourProduct />} />
        <Route path="/Compare" element={<CompareProducts />} />
        <Route path="/Billing" element={<Billing />} />
      </Routes>
    </main>
  );
}