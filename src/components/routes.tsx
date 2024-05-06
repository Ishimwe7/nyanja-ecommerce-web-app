import { createBrowserRouter } from 'react-router-dom';

import RegistrationForm from './registration';

const router = createBrowserRouter([
    { path: '/register', element: <RegistrationForm /> },
])

export default router;