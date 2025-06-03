const { useState } = React;

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.error) {
        setResult(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setResult('Failed to fetch DJ set');
    }
    setLoading(false);
  };

  return (
    <div id="app">
      <h1>DJ Set Creator</h1>
      <p>Enter a prompt describing the vibe or style of your desired DJ set.</p>
      <textarea
        value={prompt}
        placeholder="e.g. mellow electronic with jazzy vibes"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="button" onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate DJ Set'}
      </button>
      <pre id="result">{result}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
