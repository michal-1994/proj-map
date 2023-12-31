import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.css';
import './themes/high-contrast.css';
import './themes/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
