import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout/index';
function App() {
  const handleAddRoutes = (routes, parentPath = '') => {
  const finalRoutes = routes.map((route) => {
    const Layout = route.layout || DefaultLayout;
    const Page = route.component;
    return route.deepPath ? (
      handleAddRoutes(route.deepPath, parentPath + route.path)
    ) : (
      <Route
        key={parentPath + route.path}
        path={parentPath + route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  });
  return finalRoutes.flat();
  // [ 1, 2,3,[1,2],[1,2,3]] => [1,2,3,1,2,1,2,3]
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          {handleAddRoutes(publicRoutes)}</Routes>
      </div>
    </Router>
  );
}

export default App;
