# GIT ASMT [link](https://github.com/sudhakarSyvora/i-am-a-git-noob#readme)

### Q/A:

Q1: Create a private github repo named "i-am-a-git-noob"?

Ans: Created private repo [url](https://github.com/sudhakarSyvora/i-am-a-git-noob "click")

Q2: Create a new repository on local in an empty directory (NOTE: do not clone)?

Ans: `git init`

    Changes observed

* .Git direc. got initiliased containing config ,head, objects directories.
* Cmnd used to view files: **`watch -n 1 find` .**
* <img width="493" alt="Screenshot 2023-11-22 at 4 26 15 PM" src="https://github.com/sudhakarSyvora/i-am-a-git-noob/assets/151035402/06b87b66-f06b-4ebc-9f52-c98ba84786d7">

Q3: Point remote of your local git repo to the newly created repo on github?

Ans: Did by adding origin

 ` git remote add origin     https://github.com/sudhakarSyvora/i-am-a-git-noob.git`

Q4: Print current git configs on terminal?

Ans: Output :

```
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
```

Q5: Update git config with your name and email address (only for current repository)?

Ans: `git config user.name "Sudhakar"     git config user.email sbaghel@qodeleaf.com`

Q6: Create a file named "test1.txt"?

Ans: `echo > test1.txt`

Q7:Added line with text "first line in file" in "test1.txt"?

Ans: `echo 'first line in file' >> test1.txt`

Q8: Push this file to your github repo?

Ans: Git created directories to save files in blob format and named it by calculating thr hash `./.git/objects/f5 ./.git/objects/f5/81c7046f61bd034a3a7b231cf5fcbb6566b969`git add text1.txt

`git commit -m 'added test1.txt' `

`git push origin main `

Q9: Append line with text "second line in file" in "test1.txt".

Ans:  ` echo -e "Second line in file" >> test1.txt`

After adding line 2 and 3 ,so file having line 2 is in staging are and file with line 3 is not in staging area.

<img width="541" alt="Screenshot 2023-11-22 at 5 28 36 PM" src="https://github.com/sudhakarSyvora/i-am-a-git-noob/assets/151035402/733806b7-f7ec-4c86-9dea-f96b7b446400">

Q10: Add file to the staging area?

Ans:`git add test1.txt`

Q11: Check the status of the file in all staging area?

Ans: `git status`

Q12: Append line with text "Third line in file" in "test1.txt". (Note status of files across different areas)?

Ans: `echo -e "Third line in file" >> test1.txt `

Q13: Remove "test1.txt" from the staging area?

Ans: To remove file from staging `git restore --staged ./test1.txt `

Q14: Create commit with message "My First Commit"?

Ans: If we remove file from staging it says:`Changes not staged for commit `

So,added file again to staging and did commit.

`git commit -m 'My First Commit'`

Q15: Push commit to the remote repo?NOTE: checklist commits pushed to the remote.

Ans: `git push origin main`

Q16: Update message of last commit "My First Commit" to "My Second Commit" (without creating a new commit)?

Ans: `git commit --amend -m "My Second Commit"`

Q17: Push commit with the updated message to the remote repo?

Ans: Git refuses to update the remote branch with our branch, because our branch's head commit is not a direct descendent of the current head commit of the branch that we are pushing to.

So,used `git push -f origin main`

Q18: Check the difference between the last and second last commits?

Ans: `git diff HEAD^ HEAD`

Q19: Revert the last commit and check the updated commit logs history?

Ans:  ` git revert <cmtid>`

Q20: Append line with text "Fourth line in file" in "test1.txt" and commit it?

Ans: `echo -e "Fourth line in file" >> test1.txt`
        ``git add test1.txt         ``

    ``git commit -m 'added fourth line'``

Q21:Update the last commit such that the "test1.txt"  also contains "Fifth line in file" (without creating a new commit)?

Ans: `echo -e "Fifth line in file" >> test1.txt `

`git add test1.txt`

`	git commit --amend -m "Added 5th line"`

Q22: Push the updated commits to the remote repository?

Ans: `git push origin main`

Q23: Append some content in "test1.txt" file?

Ans: `echo -e "some content" >> test1.txt`

Q24: Pull all the content from remote repository to local repository?

Ans: `git pull <remote-url>`

Q25: Clone the remote repository to some other directory in your local system.?

Ans: `git clone <remote-url>`
