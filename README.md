<p align="center">
  <img src="./yume_128x128@2x.png" width="128" alt="yume" />
</p>

<h1 align="center">tl</h1>

<p align="center">
  <strong>Instant local KO-EN translator with clipboard auto-copy!</strong>
</p>

# tl

## Table of Contents
- [1. What is this?](#what-is-this)
- [2. Usage](#usage)
- [3. How to customize](#how-to-customize)

<br>

## What is this?
- tl: **T**rans**l**ator
- While this only supports Korean-to-English translation, **customization is possible.**

<br>

## Usage

### Step 1: Edit your ~/.zshrc file.
```.zshrc
alias tl="$HOME/path/to/_tl"
```

### Step 2: Enjoy!
```terminal
> tl 안녕하세요! 저는 쿠치나시 유메에요.
Hello! I am Kuchinashi Yume.
클립보드에 복사됨!
```

It is automatically copied to the clipboard, so there is no need to manually drag the terminal text.

<br>

## How to customize

### Requirements
- Node.js 22+
- Ollama

### Modify the Ollama API request logic
```javascript
const url = 'http://127.0.0.1:11434/api/chat';

const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        model: 'gemma4:e4b',
    ...
```

### Edit System Prompt
```javascript
                        role: 'system',
                        content: `# Goal
- 너는 한글 → 영어 번역기다.
- 제시된 한글(msg)을 영문(result)으로 변환해야 한다.`
```

### Modify the clipboard copy logic (The current code is for macOS only).
```js
execSync('pbcopy', { input: result });
```

### Edit Miscellaneous System Console Messages
```javascript
console.error('Usage: tl <text via need translation to english>');

console.log('클립보드에 복사됨!')
```

### Edit Build Settings
- package.json
```json
"scripts": {
    ...
    "b1": "node --experimental-sea-config sea-config.json",
    "b2": "cp $(command -v node) tl",
    "b3": "codesign --remove-signature tl",
    "b4": "npx postject tl NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --macho-segment-name NODE_SEA",
    "b5": "codesign --sign - tl",
    ...
},
```
- sea-config.json
```json
{
    "main": "main.js",
    "output": "sea-prep.blob",
    "disableExperimentalSEAWarning": true,
    "execArgv": ["--no-warnings","--max-old-space-size=4096"]
}
```