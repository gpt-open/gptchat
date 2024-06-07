# OpenIM GPT 💬💻

<p>
  <a href="https://docs.openim.io/">OpenIM Docs</a>
  •
  <a href="https://github.com/openimsdk/open-im-server">openim server</a>
  •
  <a href="https://github.com/gpt-open/chatbot-gpt">chatbot-gpt</a>
  •
  <a href="https://github.com/openimsdk/open-im-sdk-web-wasm">openim-sdk-wasm</a>
  •
  <a href="https://github.com/openimsdk/openim-sdk-electron">openim-sdk-electron</a>
  •
  <a href="https://github.com/openimsdk/openim-sdk-core">openim-sdk-core</a>
</p>

<br>

<img style="display: block; margin: auto; width: 70%; border-radius: 12px" src="docs/images/preview.jpg">
<br>

OpenIM GPT is an open-source instant messaging (IM) application designed to facilitate real-time communication and collaboration. It offers a robust and scalable platform that supports various messaging functionalities. In addition to standard IM features, OpenIM GPT integrates some powerful chatbots, enhancing the user experience with automated and intelligent responses.

## Tech Stack 🛠️

- This is a [`Electron`](https://www.electronjs.org/) project bootstrapped with [`Vite`](https://vitejs.dev/).
- App is built with [openim-sdk-wasm](https://github.com/openimsdk/open-im-sdk-web-wasm) and [openim-sdk-electron](https://github.com/openimsdk/openim-sdk-electron) library.

## Live Demo 🌐

Give it a try at [https://chatbot.open-sora.ai](https://chatbot.open-sora.ai).

## Dev Setup 🛠️

> It is recommended to use node version 16.x-20.x.

Follow these steps to set up a local development environment:

1. Run `npm install` to install all dependencies.
2. Copy the `.env.example` file and rename it to `.env`.
3. Modify the request address to your own OpenIM Server IP in the following files:

   > Note: You need to [deploy](https://docs.openim.io/guides/gettingStarted/dockerCompose) OpenIM Server and [chatbot-gpt](https://github.com/gpt-open/chatbot-gpt) first, the default port of OpenIM Server is 10001, 10002, 10008, chatbot-gpt is 9000.

   - `.env`

     ```js
     VITE_BASE_HOST=your-server-ip

     VITE_WS_URL=ws://$VITE_BASE_HOST:10001
     VITE_API_URL=http://$VITE_BASE_HOST:10002
     VITE_CHAT_URL=http://$VITE_BASE_HOST:10008
     VITE_AGENT_URL=http://$VITE_BASE_HOST:9000
     ```

4. Run `npm run dev` to start the development server. Visit [http://localhost:5173](http://localhost:5173) to see the result. An Electron application will be launched by default.
5. Start development! 🎉

## Build 🚀

> This project allows building web applications and Electron applications separately, but there will be some differences during the build process.

### Web Application

1. Run the following command to build the web application:
   ```bash
   npm run build
   ```
2. The build result will be located in the `dist` folder.

### Electron Application

1. Replace the contents of the `package_electron.json` file with `package.json`, keeping only the dependencies required for Electron to function. This significantly reduces the package size. Also, modify the packaging script.
2. Run one of the following commands to build the Electron application:
   - macOS:
     ```bash
     npm run build:mac
     ```
   - Windows:
     ```bash
     npm run build:win
     ```
   - Linux:
     ```bash
     npm run build:linux
     ```
3. The build result will be located in the `package` folder.
