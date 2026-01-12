import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MediaProvider } from './context/MediaContext.jsx'

createRoot(document.getElementById('root')).render(
	<MediaProvider>
		<App />
	</MediaProvider>
)
