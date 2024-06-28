import { AuthRoutes, NormalRoutes } from "./routes/CustomRoutes";
import { useSelectorUserState } from "./redux/slices/AuthSlice";

const App = () => {
  const { isLoggedIn } = useSelectorUserState();
  return <>{isLoggedIn ? <NormalRoutes /> : <AuthRoutes />}</>;
};

export default App;
