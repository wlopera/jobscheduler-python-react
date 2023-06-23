import React from "react";
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<App />);
