import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Clientes from "../views/Clientes.vue";
import Cadastro from "../views/clientes/Cadastro.vue";
import Lista from "../views/clientes/Lista.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Clientes",
    component: Clientes,
  },
  {
    path: "/clientes",
    component: Clientes,
    children: [
      {
        path: "",
        name: "Clientes",
        component: Lista,
      },
      {
        path: "cadastro",
        name: "Novo Cliente",
        component: Cadastro,
        children: [
          {
            path: ":id",
            name: "Editar cliente",
            component: Cadastro,
            props: true,
          },
        ],
      },
    ],
  },
];
const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
