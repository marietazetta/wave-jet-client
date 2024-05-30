import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "../src/routes/AppRoutes"
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

function App() {


  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
