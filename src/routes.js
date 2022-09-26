
import home from './pages/home.js'
import about from './pages/about.js'

export default [
    {
        name: 'home',
        path: '/',
        before: async (ctx) => {
            ctx.$root.innerHTML = home
        },
    },
    {
        name: 'about',
        path: '/about',
        before: async (ctx) => {
            ctx.$root.innerHTML = about
        },
    },
]
