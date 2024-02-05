import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from '@/context/AuthContext';
import { ActivityProvider } from '@/context/ActivityContext';
import { FormProvider } from '@/context/FormContext';

import Layout from '@/components/ui/Layout';

import ActivitiesPage from '@/pages/Activities';
import LoginPage from '@/pages/Login';
import ErrorPage from '@/pages/Error';
import RegisterPage from '@/pages/Register';

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
                <Route
                    path="/login"
                    element={
                        <FormProvider>
                            <LoginPage />
                        </FormProvider>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <FormProvider>
                            <RegisterPage />
                        </FormProvider>
                    }
                />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
