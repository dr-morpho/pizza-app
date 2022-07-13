import { Routes, Route } from 'react-router-dom';
import { MainLayout, Loading } from './components';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import '../src/scss/app.scss';

const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <Loading />,
});

const NotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: () => <Loading />,
});

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
