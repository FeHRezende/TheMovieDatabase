import Home from './containers/Home';
import Filme from './containers/Filme';

export const routesArr = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/filme/:id', component: Filme },
];
