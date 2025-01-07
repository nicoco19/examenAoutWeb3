import { ProviderWrapper as BookProvider } from "contexts/BookContext.jsx";
import App from "components/App/App";

const AppLoader = () => {
  return (
      <BookProvider>
        <App />
      </BookProvider>
  );
};

export default AppLoader;