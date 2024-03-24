This guide outlines how to get started and contribute code to this project.

### **Prerequisites:**

- You obviously need a GitHub account ([https://github.com/join](https://github.com/join))
- and Git installed on your local machine ([https://git-scm.com/downloads](https://git-scm.com/downloads))

### **Fork the Repository:**

First of all, you will need to have a copy of the Github repository on your own account so you could add changes to it to then request adding your contributions to the main project repository.

1. Visit the project [repository](https://github.com/spytech-arkx/mern-crm) on GitHub.
2. Click on the "Fork" button in the top right corner. This creates your own copy of the repository.

   ![](https://im.gurl.eu.org/file/51d054586606580d2a5d0.png)
4. Choose whether to only copy the main branch or other branches ( dev, prod..)
   
   ![](https://im.gurl.eu.org/file/5779679339b8c50f47808.png)

### **Clone Your Fork:**

You've made a copy of the project (on GitHub). Now, let's download it to your computer so you can work on it there.

1. Open a terminal window.
2. Use the `git clone` command to clone your forked repository to your local machine. Replace `<your-username>` with your GitHub username and `<repository-name>` with the actual name of the repository, or simply copy paste the link by clicking on the green code button.
   
   ![](https://im.gurl.eu.org/file/b7d0e6bf42ae155d0aa37.png)

```bash
  git clone https://github.com/<your-username>/<repository-name>.git
```

### **Install Dependencies:**

Since our project will require specific software or libraries to run (express, multer ...). We will have to install these dependencies on our local machine by executing `npm install`. This is of course applicable only if you find yourself having to fork the project at a future date where dependencies are added and need to be installed.

> [!Warning]
> Always make sure to gitignore the node_modules folder. by adding `**/node_modules` to your `.gitignore` at the root folder.

## **Making Changes (Branching)**

1. **Navigate to the Project Directory:** : Use the `cd` command to navigate to the local project directory you just cloned.

```bash
 cd <repository-name>
```

2. **Create a Feature Branch:** Version control systems like Git rely on branches to manage different lines of development. Use the `git checkout` command to create a new branch for your specific changes. Replace `<branch-name>` with a descriptive name for your feature.

```bash
  git checkout -b <branch-name>
  OR
  git branch <branch-name>
  git checkout <branch-name>
```

> [!WARNING]
>
> **Descriptive**: Choose names that clearly convey the purpose of the branch. Avoid vague names like "feature-branch" or "new-branch."
>
> - Good: "feature/user-authentication" (adds user authentication functionality)
> - Bad: "feature-branch"
>
> **Short and Sweet**: Aim for concise branch names that are easy to remember and type.
>
> - Good: "refactor/user-service" (improves user service code)
> - Bad: "refactor/improve-user-service-performance" (too long)
>
> **Use Hyphens**: Separate words with hyphens (kebab-case) for readability.
>
> - Good: "bugfix/fix-login-issue"
> - Bad: "bugfixfixLoginIssue"
>
> **Alphanumeric Lowercase** Use only lowercase letters (a-z), numbers (0-9), and hyphens. Avoid punctuation, spaces, underscores, or special characters.

## **Developing and Testing:**

1. **Make Your Changes:** Now you can edit the project files as needed. Use your favorite code editor to make your changes and implement your feature.
2. **Test Your Changes:** Thoroughly test your changes to ensure they work as expected and don't introduce any regressions.

## **Sharing Your Work (Pull Requests):**

1. **Commit Your Changes:** Once you're happy with your changes, use the `git add` command to stage the changes you made to the files. Then, use `git commit` to create a snapshot of your changes with a descriptive commit message.

```bash
git add <filename1> <filename2> ... (or git add .)
git commit -m "Your descriptive commit message"
```
![Add](https://im.gurl.eu.org/file/73e1d59a89b0fca62ecbc.png)

Notice the new file added to "changes to be committed".

![Commit](https://im.gurl.eu.org/file/ebe10fa685cebeedf63cf.png)

Each commit has a unique identifier, changes, author, commit message and a timestamp.

> [!Important]
>
> **Commit Message:**
>
> - **Clear and Concise:** Briefly describe what the commit changes.
> - **Start with a Verb:** Use a strong verb in the imperative mood (e.g., "fix," "add," "update") at the beginning.
> - **Focus on Impact:** Explain the impact of the change rather than the specific implementation details.
>   - Good: "fix: login form validation error"
>   - Bad: "change: added validation logic to login form"
> - **Optional Body:** Use the message body for additional details, references to issues, or complex changes.

2. **Push Your Changes:**
Now that you have commited your work, time for you to publish (upload to the cloud) using your platform of choice. For now, we will stick to Github. Use the `git push` command to push your local branch with your changes to your forked repository on GitHub.

```zsh
git push origin <branch-name>
```
![](https://im.gurl.eu.org/file/2874c0d69ea0a2dd8c9e5.gif)

3. **Create a Pull Request:**

- Navigate to your forked repository on GitHub.
- Click on the "Pull requests" tab.
- Click on the "New pull request" button.
- You'll see a comparison between your branch and the main branch of the project.
- Provide a clear and concise title and description for your pull request explaining the changes you made.
- Click on the "Create pull request" button.

## **Additional Guidelines**

**Code Style**: The last thing you want to do when sharing your code with another contributor is get into an discussion about [tabs vs spaces](https://www.google.com/search?q=tabs+vs+spaces)! Fortunately, [Prettier](https://prettier.io/) will clean up your code by reformatting it to conform to preset, configurable rules. Run Prettier, and all your tabs will be converted to spaces—and your indentation, quotes, etc will also all be changed to conform to the configuration. In the ideal setup, Prettier will run when you save your file, quickly making these edits for you.

You can install the [Prettier extension in VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) by following these steps:

1. Launch VS Code
2. Use Quick Open (press Ctrl/Cmd+P)
3. Paste in `ext install esbenp.prettier-vscode`
4. Press Enter

**Thank you for your contribution!**
