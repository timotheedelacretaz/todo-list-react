
import './App.css';
import Theme from './colors';
import Historique from './historique';


import List from './list';



export default function App() {
  return <div className='all'>
    <List />
    <Historique />
    <Theme />
  </div>
}

