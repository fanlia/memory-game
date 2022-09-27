
if (module.hot) {
    module.hot.accept()
}

import cup, { onpathname } from 'small-cup'

import context from './context.js'
import components from './components.js'
import routes from './routes.js'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const app = cup({
    context,
    components,
    routes,
})

onpathname(app, {
    routeType: 'hash',
})
