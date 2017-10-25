read -n1 -r -p "Press any key to start..." key

git log --color --graph --pretty=format:'%Cred%an: %C(bold blue) %s %Cgreen(%ad) %Creset' --abbrev-commit --date=local
