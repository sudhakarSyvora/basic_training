import LoginRegisterComponent from './components/loginRegister/LoginRegister';
import Secret from './components/secret/Secret';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path='/' element={<LoginRegisterComponent/>}/>
      <Route path ='/secret' element={<Secret/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;



