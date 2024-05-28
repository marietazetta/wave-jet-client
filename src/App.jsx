import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "../src/routes/AppRoutes"
import Navigation from './components/Navigation/Navigation';

function App() {


  return (
    <>
      <Navigation />
      <AppRoutes />
    </>
  )
}

export default App
