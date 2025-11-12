
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfigErrorProps {
    message: string;
}

const ConfigError: React.FC<ConfigErrorProps> = ({ message }) => {
    const configSnippet = `
<script>
  // This is a placeholder for the Firebase config.
  // In a real environment, this would be populated by a build process or server.
  // For this example, we'll use a placeholder. Please replace with your actual config.
  const __firebase_config = JSON.stringify({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  });
</script>
    `;

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Configuration Required</h1>
                </div>
                <p className="text-slate-600 mb-6">
                    This application cannot connect to the database because it is missing valid Firebase credentials. To get started, you'll need to set up a free Firebase project and paste your credentials into the app.
                </p>

                <h2 className="text-lg font-semibold text-slate-700 mb-2">Action Required:</h2>
                <p className="text-slate-600 mb-4">
                    Open the <code>index.html</code> file and replace the placeholder values inside the <code>&lt;script&gt;</code> tag with your own Firebase project credentials, which you can find in your Firebase project settings.
                </p>

                <div className="bg-slate-800 text-white rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre><code>{configSnippet.trim()}</code></pre>
                </div>
                
                <p className="text-xs text-slate-400 mt-6">
                    <strong>Error Details:</strong> {message}
                </p>
            </div>
        </div>
    );
};

export default ConfigError;
