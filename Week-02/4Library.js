// Problem Statement: Library Book Management System
// -------------------------------------------------
// Objective : Create a Book class and use it to manage a collection of books in a library.

class Book{
    title;
    author;
    pages;
    isAvailable;
constructor(title,author,pages,isAvailable){
this.author=author;
this.title=title
this.pages=pages
this.isAvailable=isAvailable
}
    borrow(){
        this.isAvailable=false;
    }
returnBook(){
    this.isAvailable=true;
}
getInfo(){
    console.log(`${this.title} by ${this.author} (${this.pages} pages) current status: ${this.isAvailable}`)
}
isLongBook(){
    return (this.pages>300)
}
}

let book=[new Book ("Harry potter","Alex",1000,true),
     new Book ("a","b",100,true),
     new Book ("c","d",110,true) ,
     new Book ("e","f",150,true),
      new Book ("The Hobbit","Jane",310,true)]

console.log("//i. Display info of all books")
console.log(book)

console.log("//ii. Borrow 2 books and show their availability status")
book[1].borrow()
book[2].borrow()
console.log(book[1])
console.log(book[2])

console.log("//iii. Return 1 book and show updated status")
book[1].returnBook()
console.log(book[1])

console.log("//iv. Count how many books are long books (more than 300 pages)")
let noOfLongBooks=0
for(let i=0;i<book.length;i++ ){
    if(book[i].isLongBook())
        noOfLongBooks++
}
console.log(`no of long boks are ${noOfLongBooks}`)

console.log("v. List all available books")
for(let i=0;i<book.length;i++ ){
    if(book[i].isAvailable)
        console.log(book[i])
}