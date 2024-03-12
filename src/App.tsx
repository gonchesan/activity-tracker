import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from '@/contexts/AuthContext';
import { ActivityProvider } from '@/contexts/ActivityContext';
import { FormProvider } from '@/contexts/FormContext';

import Layout from '@/components/ui/Layout';

import ActivitiesPage from '@/pages/Activities';
import LoginPage from '@/pages/Login';
import ErrorPage from '@/pages/Error';
import RegisterPage from '@/pages/Register';
import { DatePickerProvider } from './contexts/DatePickerContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <DatePickerProvider>
                <ActivityProvider>
                  <FormProvider>
                    <ActivitiesPage />
                  </FormProvider>
                </ActivityProvider>
              </DatePickerProvider>
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
