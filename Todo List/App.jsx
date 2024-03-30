import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos]/*this is a const array[,] ,use state always return array with 2 values*/ = useState([]); //A Hook is a special build-in function
  //"useState" is a hook  that lets you add React state to function components ,so:"todos" is an initiated state,its duty is to rerednder whener its value is changed,so every changeable data ust be palced inside state
  //in a function component, we have no this, so we can’t assign or read this.state like in class components. Instead we use hooks(they can be used only in function comp.),-->
  //--> we call the useState Hook directly inside our component
  //useState is a new way to use the exact same capabilities that this.state provides in a class
  //  The only argument that  useState() Hook takes is the initial state,here it is an ampty array
  // what calling useState do? It declares a “state variable”. Our variable is called empty array but we could call it anything else, like banana
  //It always returns an array with pair of values: the current state and a function that updates it. This is why we write const [todos,setTodos]=useState().This is similar to this.state.todos and this.setState in a class 
  //v.imp: hooks cannot depend on  condition(placed in cond. operator,since they follow the order they are implemented with,so if state is implemented9syntasxly) before another one ,it will be executed first and cannot be referenced to it
  const inputRef = useRef(); //useRef is a Hook that lets you reference a value that’s not needed for rendering.
                             //useref differs from use state is that it doesn't cause re-render so it is used to ference values
  //the importance of this useRef is that is will link(refrence) inputRef to the value provided by the html element,so bby this we acces the value
    const handleAddTodo = () => {
    const text = inputRef.current.value; // (.current) brings the current element that useref refered this variable for it(which is <input>),(.value it brings its value since html elemnt stores one)
    const newItem = { completed: false, text };//new declared an object that has 2 parameters,one that store text(text,and another to manage deletion of item when clicked on delete button(completed))
                  //={} means we are declaring an object
    setTodos([...todos, newItem]); //Here we are setting value to state which can be done only by declared settle method(settodos)
          // (...) is called "Spread operator" used to copy the elements of a particular array into a new array without affecting the original array.Note:we cannot write the [newitem] without spread operator otherwise the new item added to todo list will ovveride the previous added item (so it will be deleted)
    inputRef.current.value = ""; // after user adds his text to item ,we must delete text from input to keep it clear
                       // so every time {add} button is pressed, handleAdd.. method is called and it will add text to item and deete text from input 
  };

  const handleItemDone = (index) => {  //const nameofconstvariable ,which is assigned to an arrow function ,arrow function can be written with (),if there is only 1 parameter 
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;//by newTodos[index] we select newtodos item by its index,then we target its completed para,
    setTodos(newTodos);          //by putting (!) before ... means it will make its opposit if ts false turn it to true and viseversa,this way is better since its changeble in case user changed his mind ,while when assining it to false it will be unchangble
  };

  const handleDeleteItem = (index) => {  //the parameter is index since method needs to know which item should it target by index
    const newTodos = [...todos];//first,we need to take copy of old list(by this code)
    newTodos.splice(index, 1)//"Slice" method extracts a part of a string,it returns the extracted part in a new string.and does not change the original string.The start and end parameters specifies the part of the string to extract.
              //we set where do we wnt to remove(index which will be brought when we press delete button of the item ),then we set how many elements we will delete==> delete 1 element fron given index 
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
        <ul>
          {todos.map(({ text, completed }, index) => { //here we are presenting newItem variable,however we descructured it to text and completed,so that the browser knows what to dislpay exactly from object para and not to display an error
            return (                    //(.map)will give each item in new list:text,completed and index,so that we can reach item through its unique index
              <div className="item"> 
               <li //we wrapped <li> with div since we want to add next to item(text) bottuns,so ptting it in div then inside it add text and bottun <span>
                  className={completed ? "done" : ""}//we added a dynamic class for itemlist,which will check if attribute "completed"  exist ,let clasname=done(so chnages inside assigned class will be executed),else let it "" which means default with no class(so no changes will occur) 
                  key={index}//when using map we must assign to each element a key(in react) ,this key should be unique that why we settled to index which we settled it for each itemlist uniquely so it is a good unique key  
                  //Keys are used in React to identify which items in the list are changed, updated, or deleted,so the unchaned will not be rerendered
                  onClick={() => handleItemDone(index)}    //"onClick" when button is clicked it  calls of a specific function
                  //we assigned an anonymous function to the result of handleitemDone with passing to it index declared to each item,Note:we did this and we didnt call handleitemDone(index) since it is an anonymous method and cannot be called,but we can use its resut.. 
                  >            
                  {text}
                </li>
                <span onClick={() => handleDeleteItem(index)} className="trash">❌</span>
              </div>
            );
          })}
        </ul>
        <input ref={inputRef} placeholder="Enter item..." />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
// this project's code (under) is the same as the above,however its my first react app ,and it has different very useful commnets :)
import { useRef, useState } from "react";
import "./App.css";

function App() {
//frist step: I want to render elements dynamically so use state to manage added elements in form of list 
const [list,setlist]=useState([]) //list is state and its assigned to empty list   "setlist" is the only method that can modify state
    
/*we need to link <button> to <input> so that it takes its value
this will be done by 4 steps:
1-bring the input value to use it in another places(outside the tag) by:usered(),and its done by 2 steps:
i-outside the tag initiate a cont value(anyname)=useRef()
ii-inside the tag write ref={value}
2-make the handdle function logic in 4 steps:
1-make anynomous function(handlefunction) for the button out side the tag and onlick={handlebottun} inside it
2-use the value of input inside the function by assigning const to value=> const text=value.current.value,
3-set value to the assigned list which is in a state by statemethod:"setlist"
 setlist=([...list,text])
4-empty the input blank after pressing (add)
 */
const value=useRef()

const handlebutton1=()=>{
  const text=value.current.value; //.current => brings the current element that value refers to 
/*in "React" if we want to cross item we assgn it to "completed"..to do this:
1-create an {object},and give it 2 attributes:"text",and"completed" 
*/
  const newItem={text, completed:false};
  setlist([...list,newItem]); //(...)called spread it mantain old existing items ,so(...list) will maintainold items and new ones wont override them,
  value.current.value=""; //cute-note:the list will be list of object
};

 const handleItemDone=(index)=>{//V.v.imp:to access the item that we want to cross it we must assign index for every item in the map
                          //if this method takes parameter ,then when calling it we must give it a parameter,however if we call it inside "onclick" error will be displaced I will explain  down
/*1-make a copy of the old list to edit it,and use spread to preserve existing items
  2-change object attr:completed to true
  3-set state to new list by: setlist method*/
  const newlist=[...list]; //V.imp:we made a new elment(list) and assign it to the one in the state to edit it freely without statemethod
  newlist[index].completed=!newlist[index].completed;//(.completed to access the object's attritube (completed)) 
   setlist(newlist)                         //setting completed to reverse of the completed value  by:{!newlist[index].completed} so we can change it to true then retain it to false ,while if we set it to "true" we cannot rechange it

};
console.log(list)//to test the code
  const handleDeleteItem=(index)=>{
    const newlist=[...list]; //take copy of existing list
    list.slice(index,1)


  }
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
         
        <ul> 
          {//when using {.map} we must use key,so that every elemnt in list will have a unique key,these key will make React know which elements are edited so it rerenders them ,and others ract willnot rerender then
          list.map(({text,completed}/*we put curly in jsx since we want to call a value */,index)=>{ //in this ul we will display the value of state(list) // let item parameter of anonym.. fun//.map is a loop over all list(instead of for loop) 
              /////Main idea:if inside onclick there a method that take attribute:put it inside anynomous fun so it will be trated as a outcome of a method not a calling attri method//////
          return <li className={completed? "done":""} key={index} onClick={() => handleItemDone(index)                                 /*Error:"onclick" is an arrow fun that refers to a method,-->
      //we made a dynamic class,if completed is "true",class""done" will be executed otherwise(if its false) no class will exec..    -->so it doesnt take a call so we cannot call: handlebutton(index)
                                                                                                                                     --> however we can:declare an arrow function and make handleitemdone(index) its result */}>
           
            {/*we made onclick on li so when clicking on its text action will execute*/text}</li>  ;   //this anonymous method is to display every item in list in an <li> 
        })}
        
              <div className="item"/*since element only takes one onclick,we cannot put delete button inside<li>,so we put it in <div> with <span> whch will be the delete button */> 
              
                <span onClick={()=>handleDeleteItem(index)/*delete method takes parameter to know which item needs to be deleted */}>X</span>
              </div>
           
        </ul>
        <input ref={value}/>
        <button onClick={handlebutton1}>Add</button>
      </div>
    </div>
  );
}

export default App;
*/
