import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// leva o scroll da pagina ate o topo ao trocar de rota
const Scroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default Scroll;
