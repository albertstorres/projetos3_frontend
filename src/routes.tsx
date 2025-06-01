import { Navigate, Outlet, Routes, Route, redirect } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

type Props = {
    redirectTo: string;
}

function ProtectedRoutes({redirectTo}:Props) {
    const { handleGetToken } = useAuth();
    return handleGetToken() ? <Outlet/>:<Navigate to={redirectTo} />;
}

function MainRoutes() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route element={<ProtectedRoutes redirectTo='/' />} >
                <Route path='/main' element={<Main/>} />
            </Route>
        </Routes>
    );
}

export default MainRoutes;