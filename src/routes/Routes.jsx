import { Route, Routes } from "react-router-dom";
import { ScrollLine } from "../components/ScrollLine";
import { Header } from "../components/Header";
import { Home } from "../screens";
import { ArrowTop } from "../components/ArrowTop";

const RoutesComp = () => {
  return (
    <>
      <ScrollLine />
      <Header />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <ArrowTop />
    </>
  );
};

export default RoutesComp;
