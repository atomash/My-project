import { matchRoutes } from 'react-router-config'
import { route } from '../../src/routes';

export const PreloadGlobalInit = (store) => {
  if(route[0].PreloadGlobal){
    return Promise.all(
      route[0]
      .PreloadGlobal()
      .map(PreloadFunction => store.dispatch(PreloadFunction))
    )
  }
  return Promise.resolve(null);
}

export const PreloadDataInit = (req, store) => {
  const branch = matchRoutes(route[0].routes, req.path);
    const promises = branch.map(({route, match }) => {
      if (route.PreloadData) {
          return Promise.all(
            route
              .PreloadData(match.params)
              .map(PreloadFunction => store.dispatch(PreloadFunction))
          );
        }
        return Promise.resolve(null);
    });
    return Promise.all(promises); 
};
