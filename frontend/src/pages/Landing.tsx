import TalkToYourProduct from "./TalkToYourProduct";
import CompareProducts from "./CompareProducts";
import Billing from "./Billing";
import Navbar from "./Navbar";
import { ThreeDCardDemo } from "../components/ui/3DCard";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <Navbar />
      <div className="relative flex flex-col lg:flex-row justify-center items-center lg:justify-between px-2 py-4 space-y-4 lg:space-y-0 lg:space-x-0 mt-0">
        <ThreeDCardDemo title="Talk to your Product" brief="Talk with your product and know it better and also can ask any doubt regarding product" button="Start Conversation" />
        <ThreeDCardDemo title="Compare Product" brief="Having doubt between products? Compare the two products that helps you to buy the better one" button="Start Comparing" />
        <ThreeDCardDemo title="Billing" brief="Want the bill without waiting in the line! Get your bill ready by just taking ONE picture" button="Click the bill" />
      </div>
    </div>
  );
}