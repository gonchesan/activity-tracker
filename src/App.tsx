import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from '@/contexts/AuthContext';
import { ActivityProvider } from '@/contexts/ActivityContext';
import { FormProvider } from '@/contexts/FormContext';
import { DatePickerProvider } from '@/contexts/DatePickerContext';

import Layout from '@/components/ui/Layout';
import PublicPages from '@/components/ui/PublicPages';

import ActivitiesPage from '@/pages/Activities';
import LoginPage from '@/pages/Login';
import ErrorPage from '@/pages/Error';
import RegisterPage from '@/pages/Register';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<PublicPages />}>
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
        </Route>

        <Route element={<Layout />}>
          <Route
            path="/home"
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
          <Route
            path="/activities"
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
          <Route
            path="/statistic"
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
