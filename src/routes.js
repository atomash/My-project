import Loadable from 'react-loadable';
import { NotFound } from './pages/NotFound'
//import { fetchUser } from './store/user/actions'
import { fetchHome } from './pages/Home';

const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'home' */ 
    './pages/Home'),
    modules: ['./pages/Home'],
    webpack: () => [require.resolveWeak('./pages/Home')],
    loading: () => null,
  });

  const About = Loadable({
    loader: () => import(/* webpackChunkName: 'about' */
    './pages/About'),
    modules: ['./pages/About'],
    webpack: () => [require.resolveWeak('./pages/About')],
    loading: () => null
  });

  const TestRedirects = Loadable({
    loader: () => import(/* webpackChunkName: 'testredirect' */
    './pages/TestRedirect'),
    loading: () => null,
    modules: ['./pages/TestRedirect']
  });

export const router = {
    //    PreloadGlobal: ()=> [
    //     fetchUser()
    //    ],
        routes: [
            {
                path: '/',
                exact: true,
                component: Home,
                PreloadData: fetchHome
            },
            {
                path: '/about',
                exact: true,
                component: About,
                // PreloadData: () => [
                //     fetchUser()
                // ]
            },
            {
                path: '/red',
                component: TestRedirects,
            },
            // {
            //     path: '/user/:id',
            //     component: asyncUser,
            //     PreloadData: (match) => [
            //         fetchUserByParams(match.id)
            //     ]
            // },
            {
                component: NotFound,
            }
        ],
    }