# Getting Started

➤ [Home](../README.md)

So you want to start doing automation? Well, you came to the right place! Follow the steps below to get started on your journey.

---

### 1. Don't Panic

- Breathe in. Breathe out. Let it all flow.
- If this is the second time you're going through these steps, you can skip ahead to specific sections or you can check out the [What the FAQ](#what-the-faq) section if your queries are answered there.
- Ready? Steady? Alright, let's go.

### 2. Setup your local environment

- You can use any IDE that you're comfortable with, but the extension recommendations included in the repository is compatible with [Visual Studio Code](https://code.visualstudio.com/download)
- Typescript is the language of choice for PICKL, so if you don't have NodeJS on your local machine, installing NVM might be a good option. You can refer to this installation guide to help you get set up: [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- If you already have the latest NodeJS installed or you prefer to use just the latest stable version, that's fine. You can skip ahead to the next step.
- Once you have NVM set up, install the latest Node LTS using these commands on your terminal:

```bash
   nvm install --lts
   nvm use --lts
```

- _Tip for Windows users: After installing NVM, restart your local machine for the changes to take effect_
- As of writing, the latest LTS version is `22.11.0`. Please ensure your Node.js version matches this for compatibility. We're QA... of course we always use the latest stable LTS instead of the latest version because we value stability, compatibility, and minimized exposure to breaking changes
- Configure Git on your local:
  - Download Git using this helpful guide: [Install Git](https://github.com/git-guides/install-git)
  - It doesn't really matter if you prefer using the command line or GUI, you won't be judged. Just _git_ it done :confused:
  - If you prefer to use GUI, you may want to check out Sourcetree. It's a very user-friendly app!
  - We'll get back to Git configuration later after we download the repository

### 3. Setup your GitHub account

- Make sure that you have access to the [PICKL repository](https://github.com/jedau/PICKL)
- If you don't have access, reach out to the repository maintainer to help you get permission
- There's really not much to set up except to add your [SSH Key](https://github.com/settings/keys)

### 4. Clone the repository

- Go to the repository on GitHub, and click on the Code button
- Copy the git command from the dropdown and execute it on your local. As of writing, the command is `git clone git@github.com:jedau/PICKL.git`
- If you're in the terminal, make sure that you're in the directory where you want the repository to be located
- Once you've cloned the repository, go into that directory (`cd PICKL`) and configure your Git credentials using the following commands:

```bash
   git config --local user.name "<INSERT YOUR NAME HERE>"
   git config --local user.email "<INSERT YOUR EMAIL HERE>"
   git config --local pull.rebase false
   git config --local push.autosetupremote true
```

- _Note: For me, I've set up a separate gitconfig file for these credentials, but that's because I have separate Git identities on my local. If you're not switching between credentials, the above commands would work fine. Otherwise, you might be overengineering simple credentials_ :sweat_smile:
- Run the following commands to finish the initial setup:

```bash
   npm install
   (If Playwright is not installed) npx playwright install
   (If cross-env is not installed) npm install --global cross-env
```

### 5. Finishing touches

- Open the project on Visual Studio Code, and then go to the Extensions tab indicated by this icon:

![extension](https://t9004120740.p.clickup-attachments.com/t9004120740/bc366af0-28ac-49b7-ac2b-e412e15d18df/image.png)

- You should be prompted to install several recommended extensions. I recommend you install them. They're not required, but they will make your automating life easier. If you didn't see them, here are the list of recommended extensions:
  - [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) by [Alexander Krechik](https://marketplace.visualstudio.com/publishers/alexkrechik)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [EditorConfig for VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- Make your IDE your own. Customize it however you want, you're going to be using it a lot!

### 6. Try it out!

- Congratulations on making it this far! That wasn't so hard, wasn't it!? Wasn't it? :confused:
- In a terminal pointing to the `PICKL` repository, run `npm test` and watch the magic happen. This should run all of the available tests. If it doesn't, try to retrace your steps and see if you're missing anything
- If you encounter any errors, check the [Troubleshooting Guide](TROUBLESHOOTING.md) for solutions
- For comprehensive test execution options (tags, browsers, specific files, etc.), see the [Running Tests Guide](RUNNING-TESTS.md)

### 7. What's Next?

Now that you have PICKL set up, here are your next steps:

**For Learners**: Follow the structured [Learning Path](LEARNING-PATH.md) - a 4-week curriculum to master BDD automation.

**For Contributors**: Read the [Contributing Guide](CONTRIBUTING.md) to understand coding standards and workflow.

**For Test Writers**: Review [Writing Tests](WRITING-TESTS.md) for Gherkin syntax and [API Reference](API-REFERENCE.md) for available Page Objects.

**Need Help?**: Check [Common Mistakes](COMMON-MISTAKES.md) to avoid pitfalls and [Troubleshooting](TROUBLESHOOTING.md) if you encounter issues.

---

## What the FAQ

So you weren't able to successfully set up your local on your first try. That's okay! We all have different local machines, and we're setting up in different circumstances. No need to be upset, we'll work through it together. Check out some frequently asked questions below, or add yours if you've encountered issues that you were able to resolve:

#### I have an existing NodeJS on my local, what should I do?

> The [aforementioned NVM](#2-setup-your-local-environment) deals with all official versions of NodeJS, so you wouldn't need to keep your own version. Uninstall the one in your local version and follow the step above. For Windows users, you may need to restart your machine after installing so that the PATH would be updated.

#### I have other projects using other versions of NodeJS, will installing NVM break them?

> Of course not! With NVM, you can maintain multiple versions of NodeJS at the same time. You can install the latest stable for this, and the specific node version for the other projects. You can switch node versions by using `node use <VERSION>` on your terminal whenever you want to use a different version of NodeJS

You didn't find the answer you were looking for? Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or open an issue on the repository and we'll work it out!

---

## Related Documentation

- [Running Tests](RUNNING-TESTS.md) - Complete guide to executing tests with various options
- [Writing Tests](WRITING-TESTS.md) - Learn Gherkin syntax and create feature files
- [Learning Path](LEARNING-PATH.md) - Follow a structured 4-week training curriculum
- [Contributing Guide](CONTRIBUTING.md) - Guidelines for contributing to PICKL
- [Troubleshooting](TROUBLESHOOTING.md) - Solutions for common setup and execution issues
- [Common Mistakes](COMMON-MISTAKES.md) - Avoid these 28 common pitfalls

[⬆️ Back to Top](#getting-started)
