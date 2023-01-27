import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { DevicePage } from "./pages/DevicePage";
import Home from "./pages/Home";
import ListDevice from "./pages/ListDevice";
import ListDeviceForm from "./pages/ListDeviceForm";
import RentDevice from "./pages/RentDevice";
import RentPage from "./pages/RentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <RentDevice />{" "}
            </Layout>
          }
        />
        <Route
          path="/rent"
          element={
            <Layout>
              <RentDevice />{" "}
            </Layout>
          }
        />
        <Route path="/deviceForm" element={<ListDeviceForm />} />
        <Route
          path="/list"
          element={
            <Layout>
              <ListDevice />{" "}
            </Layout>
          }
        />
        <Route path="/list/:id" element={<DevicePage />} />
        <Route path="/rent/:id" element={<RentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
