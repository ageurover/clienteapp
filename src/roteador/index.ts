import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Clientes from '../views/Clientes.vue'
import Formulario from '../views/clientes/Formulario.vue'
import Lista from '../views/clientes/Lista.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Clientes',
        component: Clientes
    },
    {
        path: '/clientes',
        component: Clientes,
        children: [
            {
                path: '',
                name: 'Clientes',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo Cliente',
                component: Formulario,
                children: [
                    {
                        path: ':id',
                        name: 'Editar cliente',
                        component: Formulario,
                        props: true
                    }
                ]
            }
        ]
    }
]
const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;