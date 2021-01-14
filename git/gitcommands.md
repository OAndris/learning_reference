# git

## Some important concepts of Git

-   **Distributed Version Control** (Local Repository and Remote Repository)
-   **Three Tree Acrhitecture** (Working Directory, Staging Area, Repository)

---

---

## Workflows

### Workflow: Initialize a repository

Clone an existing repository:

```
git clone https://github.com/OAndris/react-packages-demo.git
```

Create a new repository on the command line:

```
echo "# my-new-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/OAndris/my-new-repo.git
git push -u origin main
```

Or push an existing repository from the command line:

```
git remote add origin https://github.com/OAndris/my-new-repo.git
git branch -M main
git push -u origin main
```

### Workflow: Full example

`git checkout -B my_branch` (create a new branch and switch to it. Alternatively, `git branch my_branch` creates and `git checkout my_branch` switches to it)

`git status` (check current branch; commits, staged, unstaged and untracked changes)

`git add -A` (add all files to the staging area)

`git commit -m "Add my-branch"` (commit the changes with a descriptive message)

`git push -u origin my_branch` (push the commited changes to the remote server's similarly named branch)

`git checkout master` (switch to the local master branch)

`git pull origin master` (pull any potential updates from the remote server's master branch)

`git merge my_branch` (merge our local branch to the local master branch)

`git push origin master` (push the changes to the remote's server master branch)

`git branch -d my_branch` (delete branch locally - only works if the branch has already been pushed and merged with the remote branch)

`git push origin --delete my_branch` (delete branch remotely)

### Workflow: Push a new local branch to a new remote branch

`git checkout -b my_branch` (create and checkout new local branch)

`git add -A` (stage changes)

`git commit -m "Commit message"` (commit changes)

`git push -u origin my_branch` (create new remote branch, track it and push to it)

---

---

## Git commands

### Setup

`git init`

`git clone`

---

`git config`

`git config user.name "My Name"` (potential flags also available, such as `git config --global user.name`)

`git config user.email "my_email@domain.com"`

### Check basic info

`ls -la` (check whether the project is tracked by Git - it contains a ".git" folder if so)

`git config`

`git help`

`git status`

`git branch`

---

`git log`

`git log -n 5`

`git log --since=2020-06-20`

`git log --until=2020-06-30`

`git log --grep="init"`

`git log --oneline`

---

`git show <hash of the commit>` (displays the changes of a specific commit)

`git show <hash of the commit> --color-words`

---

`git diff` (shows the changes between the working directory and the staging area)

`git diff --staged` (shows the changes between the repository and the staging area)

`git diff --color-words` (highlight the actual changes with colors)

`git diff <hash of a commit>..<hash of a newer commit, or HEAD>` (shows the changes between two commits)

### Working Directory

`git add .`

`git add file.txt`

`git add first.txt second.txt`

`git add -A`

---

`git rm file_to_delete.txt`

`git mv oldname.txt newname.txt`

`git mv oldname.txt my_folder/newname.txt`

`git checkout -- file.txt` (undo changes in working directory)

---

Remove every untracked changes (everything that is not in the repository or in the staging tree):

`git clean -n` (check what would happen if git clean was actually performed)

`git clean -f` (force to run git clean; which is a destructive command and does not work with just "git clean")

`git clean -i` (interactive)

### Staging Area

`git reset HEAD file.txt` (unstage changes)

`git revert <hash of the commit>` (revert the changes of a specific commit)

---

`git commit -m "Short, meaningful message"`

`git commit -a file.txt` (stages and commits all changes to tracked files - does not include untracked files)

`git commit -am "message"` (same as git commit -a -m "message")

`git commit -a` (opens a temporary file for typing a commit message, that can also be multiline)

`git commit --amend -m "Short, meaningful message"` (add new changes to the most recent commit and/or change the commit message)

### Git Stash:

Basics:

-   Git stash is useful when you need to quickly switch context and work on something else, but you aren't ready to commit
-   It stores your changes locally, making it possible to reapply them later (or even enables you to apply the same set of changes to multiple branches)
-   By default, only staged/unstaged changes are stashed (optionally, untracked/ignored files can also be included)

**Get info about stashes:**

`git stash list` (get list of stashes)

`git stash show` (show summary of stashed changes)

`git stash show -p` (show the full diff of a stash by adding the -p or --patch option)

**Stash changes:**

`git stash` (stash staged/unstaged changes)

`git stash save "Short, meaningful message"` (include a short description for easier identification later on)

`git stash -u` (include untracked files by adding the -u or --include-untracked option)

`git stash -a` (include untracked/ignored files by adding the -a or --all option)

**Reapply changes stored in stashes:**

`git stash pop` (reapply the most recently stashed changes, then remove the changes from the stash)

`git stash apply` (reapply the most recently stashed changes, and keep the changes in the stash)

`git stash apply stash@{n}` (specify which stash to reapply)

`git stash apply n` (shorter version for specifying which stash to reapply)

**Cleaning up stashes:**

`git stash drop stash@{n}` (delete a particular stash)

`git stash clear` (delete all stashes)

### Other:

`git fetch -p` (after fetching this "prune" flag, branches which no longer exist on the remote will also be deleted locally)

`git branch -m oldbranch newbranch` (rename branch)

`git branch -d mybranch` (delete branch)

## Sources:

-   [Git Tutorial for Beginners: Command-Line Fundamentals](https://www.youtube.com/watch?v=HVsySz-h9r4) by Corey Schafer (Youtube)
-   [Git Essential Training: The Basics](https://www.linkedin.com/learning/git-essential-training-the-basics/use-git-version-control-software-to-manage-project-code) by Kevin Skoglund (LinkedIn Learning)
-   [Learn Git in 20 minutes](https://www.youtube.com/watch?v=Y9XZQO1n_7c) by Code Insights (Youtube)
-   [How to Delete a Git Branch Both Locally and Remotely](https://www.freecodecamp.org/news/how-to-delete-a-git-branch-both-locally-and-remotely/) by freeCodeCamp (article)
-   [Push a new local branch to a remote Git repository and track it too](https://forum.freecodecamp.org/t/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too/13222) by freeCodeCamp (article)
-   [Git stash](https://www.atlassian.com/git/tutorials/saving-changes/git-stash) by Atlassian
