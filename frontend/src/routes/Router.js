import TemplateOrders from "../components/templates/templateOrders/TemplateOrders";
import TemplateProcess from "../components/templates/templateProcess/TemplateProcess";
import TemplateChains from "../components/templates/templateChains/TemplateChains";

//apps
// const Chat = lazy(() => import("../views/chat/Chat"));
//dashboards


var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/dashboards",
    name: "Dashboards",
    state: "dashboardpages",
    icon: "home",
    child: [
      {
        path: "/dashboards/modern",
        name: "Modern",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: null,
      },
      {
        path: "/dashboards/awesome",
        name: "Awesome",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: null,
      },
      {
        path: "/dashboards/classy",
        name: "Classy",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: null,
      },
      {
        path: "/dashboards/analytical",
        name: "Analytical",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: null,
      },
      {
        path: "/dashboards/minimal",
        name: "Minimal",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: null,
      },
    ],
  },
  {
    navlabel: true,
    name: "APPS",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/orders",
    name: "Ordenes",
    icon: "cpu",
    component: TemplateOrders,
  },
  {
    path: "/chains",
    name: "Canedas de trabajo",
    icon: "file-text",
    component: TemplateChains,
  },
  {
    path: "/process",
    name: "Procesar",
    icon: "map",
    component: TemplateProcess,
  },
  {
    path: "/",
    pathTo: "/dashboards/modern",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
