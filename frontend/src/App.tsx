import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Navbar = lazy(() => import("./pages/Navbar"));
const LandingPage = lazy(() => import("./pages/Landing"));
const TalkToYourProduct = lazy(() => import("./pages/TalkToYourProduct"));
const CompareProducts = lazy(() => import("./pages/CompareProducts"));
const Billing = lazy(() => import("./pages/Billing"));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Admin = lazy(() => import('./pages/Admin'));
const PayNow = lazy(() => import('./pages/PayNow'));

export default function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/TalkToYourProduct" element={<TalkToYourProduct />} />
          <Route path="/CompareProducts" element={<CompareProducts />} />
          <Route path="/Billing" element={<Billing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/paynow" element={<PayNow />} />
        </Routes>
      </Suspense>
    </main>
  );
}