import { useState } from 'react'

function App() {
    const [subject, setSubject] = useState('');
    const [isBusy, setIsBusy] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const submitForm: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setIsBusy(true);
        const response = await fetch('https://nvhud4tiusatnwec2cu6zjmxhq0wolld.lambda-url.eu-west-3.on.aws/', {
            method: 'POST',
            body: JSON.stringify({ subject })
        });
        setImageUrl(await response.text());
        setIsBusy(false);
    }

    return <main>
        <h1>Cartoon Image Generator</h1>
        <form onSubmit={submitForm} className="request-form">
            <label htmlFor="subject">Subject</label>
            <input type="text"
                id="subject"
                value={subject}
                onChange={e => setSubject(e.currentTarget.value)}
                disabled={isBusy}
            />
            <button type="submit" disabled={isBusy}>Create</button>
        </form>
        <img src={imageUrl} className="generated-image" />
    </main>
}

export default App
