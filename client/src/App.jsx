import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/Dashbaord/Dashboard";
import Layout from './scenes/Layout/Layout';
import Products from './scenes/Products/Products';
import Customers from './scenes/Customers/Customers';
import Transaction from "./scenes/Transaction/Transaction";
import Geography from './scenes/Geography/Geography';
import Overview from './scenes/Overview/Overview';
import Daily from "./scenes/Daily/Daily";
import Monthly from './scenes/Monthly/Monthly';
import Breakdown from './scenes/Breakdown/Breakdown';
import Admins from "./scenes/Admins/Admins";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/products' element={<Products/>}/>
              <Route path="/customers" element={<Customers/>}/>
              <Route path="/transaction" element={<Transaction/>}/>
              <Route path="/geography" element={<Geography/>}/>
              <Route path="/overview" element={<Overview/>}/>
              <Route path="/daily" element={<Daily/>}/>
              <Route path="/monthly" element={<Monthly/>}/>
              <Route path='/breakdown' element={<Breakdown/>}/>
              <Route path="/admin" element={<Admins/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
