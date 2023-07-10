import { lazy } from "react";
const TemplateOrders = lazy(() =>
  import("../components/templates/templateOrders/TemplateOrders")
);
const TemplateProcess = lazy(() =>
  import("../components/templates/templateProcess/TemplateProcess")
);
const TemplateChains = lazy(() =>
  import("../components/templates/templateChains/TemplateChains")
);
const History = lazy(() =>
  import("../components/templates/templateProcess/history/History")
);

var ThemeRoutes = [
  {
    navlabel: true,
    name: "Configuración",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/configuration",
    name: "Parametrización",
    state: "dashboardpages",
    icon: "layers",
    child: [
      {
        path: "/configuration/orders",
        name: "Ordenes y Tareas",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: TemplateOrders,
      },
      {
        path: "/configuration/chains",
        name: "Cadenas de Trabajos",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: TemplateChains,
      },
    ],
  },
  {
    navlabel: true,
    name: "APPS",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/process",
    name: "Procesar",
    icon: "play",
    component: TemplateProcess,
  },
  {
    path: "/history",
    name: "Historias",
    icon: "clock",
    component: History,
  },
  {
    path: "/",
    pathTo: "/dashboards/orders",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
