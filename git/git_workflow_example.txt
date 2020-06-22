Source: https://www.youtube.com/watch?v=HVsySz-h9r4 (Corey Schafer: Git Tutorial for Beginners: Command-Line Fundamentals)


git branch my_branch          (create a new branch)
git checkout my_branch        (switch to the new branch)
git status                    (check current branch; staged, unstaged and untracked changes)
git add -A                    (add all files to the staging area)
git commit -m "Add my-branch" (commit the changes with a descriptive message)
git push -u origin my_branch  (push the commited changes to the remote server's similarly named branch)
git checkout master           (switch to the local master branch)
git pull origin master        (pull any potential updates from the remote server's master branch)
git merge my_branch           (merge our local branch to the local master branch)
git push origin master        (push the changes to the remote's server master branch)
