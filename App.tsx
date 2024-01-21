import { AuthProvider } from "./app/context/AuthContext";
import { Layout } from "./app/components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
