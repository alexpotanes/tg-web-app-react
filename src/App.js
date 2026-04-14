import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {useVK} from "./hooks/useVK";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
  const { tg } = useTelegram();
  const { isVK, allowMessages } = useVK();

  useEffect(() => {
    if (isVK) {
      window.vkBridge?.send('VKWebAppInit');
      allowMessages();
    } else {
      tg.ready();
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
