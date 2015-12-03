#!/bin/bash

read -p "输入文字:"  val
echo $val
git add --all
git commit -m $val
git push origin master
