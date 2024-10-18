import { Route, Routes } from 'react-router-dom';
import AuthProvider from '@/provider/Auth';
import MainLayout from '@/components/common/layouts/MainLayout';
import AuthPage from '@/pages/Auth';
import DetailPage from '@/pages/Detail';
import InfluencerPage from '@/pages/Influencer';
import MainPage from '@/pages/Main';
import MapPage from '@/pages/Map';
import MyPage from '@/pages/My';
import PrivatedRoute from '@/routes/component/PrivatedRoute';

import GlobalStyle from './global';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<MainPage />} />
            <Route path="/influencer" element={<InfluencerPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route
              path="/my"
              element={
                <PrivatedRoute>
                  <MyPage />
                </PrivatedRoute>
              }
            />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
