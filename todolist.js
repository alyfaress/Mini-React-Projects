//function print(str){
//for(i=0;i<=str.length-1;i++)

   // console.log(str[i])


//}

window.addEventListener('load',()=>{ //Here we added event(function for window )
     
   const form=document.querySelector("#new-task-form"); // queryselector means select evey element that thas what is written between brackets-->
                                       //-->it cab be:tag(element name(like:h1,div...)),class(we have to use point),id:we have to use (#)
   const input=document.querySelector("new-task-input");
   const list_element=document.querySelector("#tasks");
  //Note:after declaring a variable or const ,we must assing,or read its value
   form.addEventListener('submit',(e)=>{ //what does e represent when its placed between brackets
      e.preventDefault(); //this prevent page from refreshing
        const task = input.value;//"input" is a const declared up// The .value property sets or returns the value of -->
                             //-->the value attribute of a text field,and it contains the value a user types in.
         const task_element=document.createElement("div");//task_elemnt is responsible for creating new divs
         task_element.classList.add('task');// classList property returns the CSS classnames of an element.
                                    // classList.add ,adds a class to the selected element ,classname=task
       const task_content_elem = document.createElement('div');
		task_content_el.classList.add('content');

		task_element.appendChild(task_content_elem);//The appendChild() method appends a node (element in the brackets) as the last child of an element
      
        const task_input_elem=document.createElement("input");
         task_input_elem.classList.add('text');
         task_input_elem.type = 'text';//setting type of the const 
		   task_input_elem.value = task;//setting value of the const
		   task_input_elem.setAttribute('readonly', 'readonly');//The setAttribute() method sets a new value to an attribute.
          //"Atrribute" is an Html are the attributes that are written next to element name ex:<image src..,width..,height,color..>                                    //-->If the attribute does not exist, it is created first.
          task_content_elem.appendChild(task_input_elem);// The appendChild() method appends a node (element) as the last child of an element
         ////// End of Add TASK buttom and how the tasks list is done  THis must be rerevised step by step  
         
         // "Edit" button
          const task_ele_action=document.createElement("div");
          task_ele-action.classList.add('actions');
          //note:must be confirmed :The action taken by button css is responsible for it ,by :: or other techniques
          const task_edit_ele = document.createElement('button');// edit button is not implemented in html,we implement it here,it is commented there...
		    task_edit_ele.classList.add('edit');//we impelemted a class "edit" for the edit button in css
          task_edit_ele.innerText = 'Edit';// (.innerText) write inside the element a word (setting the elemnt text) 
         //"Delete" button
         const task_delete_ele = document.createElement('button');// delete button is not implemented in html,we implement it here,it is commented there...
         task_delete_ele.classList.add('delete');//we impelemted a class "delete" for the edit button in css
         task_delete_ele.innerText = 'Delete'; 
         // button
         task_ele_action.appendChild(task_edit_elem);// add edit element const to action elemnt (must be confirmed)and:why we should do this?
		   task_ele_action.appendChild(task_delete_ele);

		   task_element.appendChild(task_ele_action);
         list_element.appendChild(task_el);//this const is declared on the very top
         input.value = '';//setts const input value to empty 
         
         task_edit_ele.addEventListener('click', (e) => { //make this event for if "edit" button is pressed
            if (task_edit_ele.innerText.toLowerCase() == "edit") {// if "edit" button is pressed "task_edit_ele" will be ==edit,(.tolowercase())means wheather the world will be -->
                                                        //--> transformed to lowercase(small letter),this will ensure that (edit)always will be taken even if its capitalized 
               task_edit_ele.innerText = "Save";//this means after "edit" is pressed "saved" will replace it,it will be pressed after edit is finished to save changes
                                          //-->dont we need a function for "save",as when its pressed it will replace dby edit(task_edit_ele.innerText = "Save";)-->
                                          //--> and save changes on text(const new_ele_input=task_input_elem.value)
               task_input_elem.removeAttribute("readonly");//remove (readonly) attribute so that we can ovverwrite text
               task_input_elem.focus();//to stay in text arrea 
            } else { // if "edit" isn't pressed 
               task_edit_ele.innerText = "Edit";//edit button will stay edit
               task_input_elem.setAttribute("readonly", "readonly");//text will stay unchangeable,with (readonly) attribute
            }});
   
         task_delete_ele.addEventListener('click', (e) => {
            list_el.removeChild(task_el);//removeChild(); will remove element btween brackets from elemnt outside the bracket
         });
      }); });

   
