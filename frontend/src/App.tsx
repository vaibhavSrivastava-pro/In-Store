import Billing from "./components/Billing";
import CompareProducts from "./components/CompareProducts";
import Navbar from "./components/Navbar";
import TalkToYourProduct from "./components/TalkToYourProduct";

export default function App() {
  return (
    <main className="bg-black min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative flex flex-col lg:flex-row justify-center items-center lg:justify-between px-2 py-4 space-y-4 lg:space-y-0 lg:space-x-0 mt-0">
        <TalkToYourProduct />
        <CompareProducts />
        <Billing />
      </div>
    </main>
  );
}
