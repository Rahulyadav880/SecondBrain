import './App.css'
import {Button} from './components/ui/Button';
import { PlusIcon } from './components/ui/icons/plusIcon';
function App() {
  return <>
    <Button startIcon={<PlusIcon />} variant= "primary" size="lg" text = "Add Content" ></Button>
    <Button variant="secondary" size = "md" text = "Share"></Button>
  </>
    
  
}

export default App;
