# Developer Guide & Contributing

Thank you for your interest in contributing to the **Backend Boilerplate Generator**! We welcome contributions from the community to make this tool even better.

This guide will help you set up your development environment to modify, test, and build the extension locally.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1.  [Node.js](https://nodejs.org/) (v14 or higher)
2.  [Git](https://git-scm.com/)
3.  [Visual Studio Code](https://code.visualstudio.com/)

---

## 💻 Local Setup

Follow these steps to get the extension running on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/jaimilgorajiya/backend-boilerplate-generator.git
cd backend-boilerplate-generator
```

### 2. Install Dependencies
Install the required node modules (including VS Code types):
```bash
npm install
```

### 3. Open in VS Code
Open the project folder:
```bash
code .
```

---

## ▶️ Running the Extension (Debug Mode)

To test your changes, you need to run the **Extension Development Host**:

1.  Open the **Run and Debug** view in the Sidebar (`Ctrl+Shift+D`).
2.  Select **Run Extension** from the dropdown loop.
3.  Press **F5** (or the Green Play Button).
4.  A new VS Code window will open. In this window, you can run the command:
    `Backend Boilerplate Generator: Generate CRUD`

> **Note:** The code compiles automatically in the background. If you make changes, just reload the Development Host window (`Ctrl+R`).

---

## 📦 Packaging & Publishing

To create a `.vsix` file for manual installation or marketplace publication:

1.  Install `vsce` globally:
    ```bash
    npm install -g @vscode/vsce
    ```

2.  Package the extension:
    ```bash
    vsce package
    ```
    This will generate a `backend-boilerplate-generator-x.x.x.vsix` file.

---

## 🤝 How to Contribute

1.  **Fork** the repository.
2.  Create a new **Branch** for your feature or fix (`git checkout -b feature/amazing-feature`).
3.  **Commit** your changes (`git commit -m 'Add some amazing feature'`).
4.  **Push** to the branch (`git push origin feature/amazing-feature`).
5.  Open a **Pull Request**.

---

## 🐞 Bugs & Feature Requests

Found a bug? Have an idea? Please open an issue on the [Issue Tracker](https://github.com/jaimilgorajiya/backend-boilerplate-generator/issues).
