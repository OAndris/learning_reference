Based on "Git Essential Training: The Basics" by Kevin Skoglund, on LinkedIn Learning (https://www.linkedin.com/learning/git-essential-training-the-basics/use-git-version-control-software-to-manage-project-code)

Some important concepts of Git:
- Distributed Version Control (local repository)
- Three Tree Acrhitecture (working directory, staging area, repository)


ls -la (check whether the project is tracked by Git - it contains a ".git" folder if so)
git help
git init
git status

git diff (shows the changes between the working directory and the staging area)
git diff --staged (shows the changes between the repository and the staging area)
git diff --color-words (highlight the actual changes with colors)
git diff <hash of a commit>..<hash of a newer commit, or HEAD> (shows the changes between two commits)

git add .
git add file.txt
git add first.txt second.txt

git rm file_to_delete.txt

git mv oldname.txt newname.txt
git mv oldname.txt my_folder/newname.txt

git checkout -- file.txt (undo changes in working directory)
git reset HEAD file.txt (unstage changes)

git commit -m "Short, meaningful message"
git commit -a file.txt (stages and commits all changes to tracked files - does not include untracked files)
git commit -am "message" (same as git commit -a -m "message")
git commit -a (opens a temporary file for typing a commit message, that can also be multiline)
git commit --amend -m "Short, meaningful message" (add new changes to the most recent commit and/or change the commit message)

git revert <hash of the commit> (revert the changes of a specific commit)

# Remove every untracked changes (everything that is not in the repository or in the staging tree)
git clean -n (check what would happen if git clean was actually performed)
git clean -f (force to run git clean; which is a destructive command and does not work with just "git clean")
git clean -i (interactive)

# Display more info about previous commits:
git log
git log -n 5
git log --since=2020-06-20
git log --until=2020-06-30
git log --grep="init"
git log --oneline

git show <hash of the commit> (displays the changes of a specific commit)
git show <hash of the commit> --color-words

git config
