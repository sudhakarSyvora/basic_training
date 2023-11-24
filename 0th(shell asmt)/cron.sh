#!/bin/bash

count=0

while true; do
    echo "Hi, this is text from cron $count" >> ./cronTest.txt
    count=$((count + 1))

    git add cronTest.txt
    git commit -m "Add content to file $count time"
    git push origin main

    sleep 600
done