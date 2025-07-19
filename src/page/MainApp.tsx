import ProductPage from "./ProductPage";
import CreditCardModal from "../components/CreditCardModal";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { closeModal } from "../features/ui/uiSlice";
import type { AppDispatch } from "../redux/store";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function App() {
  const modalOpen = useSelector((state: RootState) => state.ui.modalOpen);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Header />
      <Hero />
      <ProductPage />
      <CreditCardModal
        open={modalOpen}
        onClose={() => dispatch(closeModal())}
      />
      <Footer />
    </>
  );
}

export default App;
