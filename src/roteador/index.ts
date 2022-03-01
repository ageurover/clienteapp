import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Clientes from '../views/Clientes.vue'
import Formulariopj from '../views/clientes/Formulariopj.vue'
import Formulariopf from '../views/clientes/Formulariopf.vue'
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
                path: 'novopj',
                name: 'Nova empresa',
                component: Formulariopj,
                children: [
                    {
                        path: ':id',
                        name: 'Editar empresa',
                        component: Formulariopj,
                        props: true
                    }
                ]
            },
            {
                path: 'novopf',
                name: 'Novo Cliente',
                component: Formulariopf,
                children: [
                    {
                        path: ':id',
                        name: 'Editar Cliente',
                        component: Formulariopf,
                        props: true
                    }
                ]
            },
        ]
    }
]
const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;