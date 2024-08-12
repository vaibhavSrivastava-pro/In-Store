import { Routes, Route } from 'react-router-dom';
import Navbar from "./pages/Navbar";
import LandingPage from "./pages/Landing";
import TalkToYourProduct from "./pages/TalkToYourProduct";
import CompareProducts from "./pages/CompareProducts";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/TalkToYourProduct" element={<TalkToYourProduct />} />
        <Route path="/CompareProducts" element={<CompareProducts />} />
        <Route path="/Billing" element={<Billing />} />
      </Routes>
    </main>
  );
}