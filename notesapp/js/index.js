class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
    this.notesArray = [];
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    newNote.className = 'card';
    let txt = document.createElement('p');
    let a = document.createElement('a');
    a.className = 'card-remove';
    
    newNote.appendChild(txt);
    newNote.appendChild(a);
    console.log(newNote);
    a.innerHTML="Remove";
    //txt.innerHTML= document.getElementById('txtAddNote').value;
    txt.innerHTML = this.title;
      
    a.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // this function should append the note to the screen somehow
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let itemString = localStorage.getItem('savedItems');
      
    if(itemString==null)
    {
    this.notesArray.push(this.title);
    let arrayString = JSON.stringify(this.notesArray);
    console.log(arrayString);
    localStorage.setItem('savedItems', arrayString);
    console.log(this.notesArray);
    }
    else
    {
    this.notesArray = JSON.parse(itemString);
    this.notesArray.push(this.title);
    let arrayString = JSON.stringify(this.notesArray);
    console.log(arrayString);
    localStorage.setItem('savedItems', arrayString);
    console.log(this.notesArray);
    }
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    let element = this;
    element.className='card bounceOutUp animated';
    setTimeout(function(){element.parentNode.removeChild(element);}, 3000);
    //element.parentNode.removeChild(element);
    
    
      //delay / time out fixen!
    
    let itemString = localStorage.getItem('savedItems');
    let itemArray = JSON.parse(itemString);
    
    let itemIndex = itemArray.indexOf();
    console.log(itemIndex); 
    
  } 
}

let n1 = new Note('ef');
let n2 = new Note('lkj');
//n1.add();
//n2.add();

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    /*let btn = document.getElementById("btnAddNote");
    btn.addEventListener('click', function(){
        n1.add();
    });*/
    this.btnAdd = document.getElementById("btnAddNote");
      
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
      
    
    // pressing the enter key should also work
    this.txtAdd = document.getElementById("txtAddNote");
    /*this.txtAdd.addEventListener("keypress", this.createNote.bind(this));*/
      
    this.txtAdd.addEventListener('keypress', e => {
        let key = e.keyCode;
        if(key===13){
            this.btnAdd.click();
            e.preventDefault();
        }
    });
    
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    let itemString = localStorage.getItem('savedItems');
    let itemArray = JSON.parse(itemString);
    //console.log(itemArray);
    
    let i;
    for(i=0; i< itemArray.length; i++){
        let note = new Note(itemArray[i]);
        note.add();
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    this.title = document.getElementById('txtAddNote').value;
    let note = new Note(this.title);
    // HINT🤩
    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form
    let text = document.getElementById("txtAddNote");
    text.value = "";
    text.focus();
  }
  
}

let app = new App();