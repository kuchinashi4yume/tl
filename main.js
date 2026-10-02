const { execSync } = require('node:child_process');

(async () => {
    const msg = process.argv.slice(2).join(' ');
    if (!msg.trim()) {
        console.error('Usage: tl <text via need translation to english>');
        process.exit(1);
    }

    const url = 'http://127.0.0.1:11434/api/chat';

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gemma4:e4b',
                messages: [
                    {
                        role: 'system',
                        content: `# Goal
- 너는 한글 → 영어 번역기다.
- 제시된 한글(msg)을 영문(result)으로 변환해야 한다.`
                    },
                    {
                        role: 'user',
                        content: JSON.stringify({ msg })
                    }
                ],
                stream: false,
                format: {
                    type: 'object',
                    properties: {
                        result: { type: 'string' }
                    },
                    required: ['result']
                }
            })
        });
        if (!res.ok) throw new Error(`http error: status ${res.status}`);
        const data = await res.json();
        const result = JSON.parse(data.message.content).result;
        console.log(result);

        execSync('pbcopy', { input: result });
        console.log('클립보드에 복사됨!')
    } catch(e) {
        console.error(e);
    }
})();