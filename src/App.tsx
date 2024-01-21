import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';

import ActivitiesPage from './pages/Activities';
import LoginPage from './pages/Login';
import ErrorPage from './pages/Error';
import Layout from './components/ui/Layout';
import { FormProvider } from './context/FormContext';

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <ActivityProvider>
                                <FormProvider>
                                    <ActivitiesPage />
                                </FormProvider>
                            </ActivityProvider>
                        }
                    />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
