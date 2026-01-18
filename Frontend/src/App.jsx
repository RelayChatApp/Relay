import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ProfilePage from './Pages/ProfilePage'

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App 
