import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { CartProvider } from "./context/CartContext";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    </Provider>
  );
}

export default App;
