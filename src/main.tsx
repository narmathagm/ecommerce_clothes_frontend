import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
console.log('main.tsx: rootElement', !!rootElement);
if (!rootElement) {
  document.body.innerHTML = 'Root element not found!';
  throw new Error('Root element not found');
}

try {
  console.log('main.tsx: rendering App');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error('React rendering error:', error);
  rootElement.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
}
