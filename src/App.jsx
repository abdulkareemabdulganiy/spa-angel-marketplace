import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LogOut from './Pages/LogOut';
import Details from './Pages/Details';
import Edit from './Pages/Edit';
import CreateSell from './Pages/CreateSell';
import Error404 from './Pages/Error404';
import Messages from './Pages/Messages';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';

function App() {
   console.log("App component rendering");
   return (
      <div className="flex flex-col min-h-screen">
         <Header />
         <main className="flex-grow">
            <Routes>
               <Route path="/" element={<Categories />} />
               <Route path="/categories/:category" element={<Categories />} />
               <Route path="/categories/:category/:id/details" element={<Details />} />
               <Route path="/categories/:category/:id/edit" element={<Edit />} />
               <Route path="/auth/login" element={<Login />} />
               <Route path="/auth/register" element={<Register />} />
               <Route path="/auth/logout" element={<LogOut />} />
               <Route path='/add-product' element={<CreateSell />} />
               <Route path='*' element={<Error404 />} />
               <Route path='/profile/:id' element={<Profile />} />
               <Route path='/profile/:id/edit' element={<EditProfile />} />
               <Route path='/messages' element={<Messages />} />
               <Route path='/messages/:id' element={<Messages />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
}

export default App;