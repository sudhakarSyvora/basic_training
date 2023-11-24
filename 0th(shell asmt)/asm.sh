mkdir  sample

 
echo "Hi! This is just a sample text file created using a shell script." > ./sample/sample.txt

 
cat  ./sample/sample.txt

 
grep -o 't' ./sample/sample.txt | wc -l

 
chmod u+rwx  ./sample/sample.txt

 
echo "Hi! This is just another sample text added to the file." >> ./sample/sample.txt

 
chmod g=r ./sample/sample.txt

 
chmod o= ./sample/sample.txt

 
cp ./sample/sample.txt ./sample/sample2.txt

 
for i in {1..1000}; do echo "Random line $i" >> ./sample/sample.txt; done

 
head -n 50 ./sample/sample.txt

 
tail -n 50 ./sample/sample.txt

 
touch ./sample/prog1.txt ./sample/prog2.txt ./sample/program.txt ./sample/code.txt ./sample/info.txt

 
ls ./sample/*prog*

 
alias list='ls ./sample/*prog*'

 
list 