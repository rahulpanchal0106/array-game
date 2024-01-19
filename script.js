const display = document.querySelector('#display');
const menu = document.querySelector('#select_op')
const inputs = document.querySelector('#inputs')
const METHODS=2
const arr = [0,22,42,56,12,56,5];
var score_value = Number(document.querySelector('#score_value').innerHTML);
const score = document.querySelector('#score_value');

const insert_controls = `
        <label for="item_value">Element</label>
        <input type="text" id="item_value" placeholder="element">
        <label for="index">Index</label>
        <input type="text" id="index" placeholder="index">
        <button id="insert">Insert</button>
    `;

const delete_controls = `
        <label for="index">Index</label>
        <input type="text" id="index" placeholder="index">
        <button id="delete">Delete</button>
    `;

for (let i = 0; i < arr.length; i++) {
    const item = `<div id="item" class=item_${i}><div id="index_mark">${i}</div>${arr[i]}<div>`;
    display.innerHTML += item;
}

function random_generator(){
    const num = Math.floor(Math.random()*METHODS)
    return num
}
function random_index_generator(){
    const num = Math.floor(Math.random()*arr.length);
    console.log("\\\\\\\\\\",num)
    return num
}
function random_value_generator(){
    const num = Math.floor(Math.random()*100);
    console.log('>>>>>>>>>>>>>',num)
    return num
}
// function add_task(){
//     const random_index = random_index_generator();
//     const random_value = random_value_generator();
//     const task = document.querySelector('#task');

//     task.innerHTML=`Insert a value ${random_value} at index ${random_index}`
// }

function random_task(current_index, current_value){
    const num = random_generator();
    const random_index = random_index_generator();
    const random_value = random_value_generator();
    const task = document.querySelector('#task');
    
    console.log(num);
    //if random num is 0, insertion task, else deleiton task
    if(num==0){
        //insertion task
        //prompt(`Insert a ${random_value} value at ${random_index}`)
        
        console.log('insertion')
        task.innerHTML=`Insert a value ${random_value} at index ${random_index}`;
        // menu.value='insert'

        task_type_change('insert')

        // console.log(`:::::::::::::::::::::: ${current_index}\n:::::::::::::::::${random_index}`)
        // if(current_index==random_index){
        //     console.log(`${current_index} == ${random_index} :::::::::::::`)
            
        // }
        
        const values = {
            random_index,
            random_value
        }
        
        return values
    }else if(num==1){
        //deletion task
        // menu.value='delete'
        console.log('deletion')
        task.innerHTML=`Delete the element at index ${random_index}`
        task_type_change('delete')
        // prompt(`Delete a numbe at ${random_index}`)
        const values = {
            random_index
        }
        return values
    }
}

var values = random_task();
console.log("💀💀💀",values)
function task_type_change(type){
    if (type == 'insert') {
        
        inputs.innerHTML = insert_controls;
        const insert_btn = document.querySelector('#insert');
        insert_btn.addEventListener('click', () => {
            const index = document.querySelector('#index').value
            const item_value = document.querySelector('#item_value').value
            // const values=random_task();
            try {
                if (index < arr.length && index >= 0) {
                    for (let i = arr.length - 1; i >= 0; i--) {
    
                        if (i >= index) {
                            const item_to_move = document.querySelector(`.item_${i}`);
                            arr[i + 1] = arr[i];
                            item_to_move.querySelector('#index_mark').innerHTML = i + 1
                            //item_to_move.style.transform="translate3d(45px,0px,0px)";
                            item_to_move.classList.add(`item_${i + 1}`);
                            item_to_move.classList.remove(`item_${i}`);
                        }
    
                    }
                    arr[index] = item_value;
                    const item_to_insert = `<div id="item" class=item_${index}><div id="index_mark">${index}</div>${item_value}</div>`;
                    const ref = document.querySelector(`.item_${index - 1}`);
    
                    if (ref) {
                        console.log("exists");
                        ref.insertAdjacentHTML("afterend", item_to_insert);
                    } else {
                        console.log('no ref', ref)
                    }
                    
                    // const values=random_task(index,arr[index]);
                    

                    console.log('**************************',values)
                    console.log(index,"<>",values.random_index)
                    if(index==values.random_index){
                        console.log('matched!\n',index,values.random_index)
                        score_value++
                        score.innerHTML=score_value;
                    }else{
                        console.log('Not a match\n',index,values.random_index);
                    }

                    values=random_task(index,arr[index]);
                } else {
                    alert(`Index ${index} does not exist in this array`)
                    return
                }
            } catch (err) {
                alert("An error occured\n", err)
                console.log(err)
            }
    
    
        });
    } else if (type == 'delete') {
        inputs.innerHTML = delete_controls;
        const delete_btn = document.querySelector('#delete');
    
        delete_btn.addEventListener('click', () => {
            const index = document.querySelector('#index').value;
            try {
                if (index >= 0 && index < arr.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (i >= index) {
                            arr[i] = arr[i + 1];
                            const item_to_mov = document.querySelector(`.item_${i + 1}`);
                            if (item_to_mov) {
    
                                item_to_mov.classList.add(`item_${i}`)
                                item_to_mov.querySelector('#index_mark').innerHTML = i
                                item_to_mov.classList.remove(`item_${i + 1}`);
                            } else {
                                console.log('item_to_move doesnot exist')
                            }
                        }
                    }
                    arr.length--;
                    console.log(arr)
                    console.log('**************************',values)
                    console.log(index,"<>",values.random_index)
                    if(index==values.random_index){
                        console.log('matched!\n',index,values.random_index);
                        score_value++
                        score.innerHTML=score_value;
                    }else{
                        console.log('Not a match\n',index,values.random_index)
                    }
                    const item_to_del = document.querySelector(`.item_${index}`);
                    //item_to_del.index_mark.innerHTML = i-1
                    item_to_del.style.display = "none";
                    item_to_del.classList.remove(`item_${index}`);
                    values = random_task(index);
                } else {
                    alert(`Index ${index} does not exists in this array`)
                }
            } catch (err) {
                alert('An error occured\n', err);
                console.log('an error occured\n', err);
            }
            
        });
    } else {
        inputs.innerHTML = ``;
    }

    
}

// menu.addEventListener('click', () => {
// });