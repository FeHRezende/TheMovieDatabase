import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { routesArr } from './routes';

function App() {
  const routeComponents = routesArr.map(
    ({ path, component }) => (
      <Route exact path={path} component={component} key={path} />
    )
  );
  return (
    <BrowserRouter>
      <Switch>
        { routeComponents }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
