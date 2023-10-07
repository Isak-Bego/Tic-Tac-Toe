const displayController = (function(){
    const toggle = (currentState, states) =>{
        if(currentState == states[0]) return states[1]; 
        else return states[0]; 
    }


    return {
        toggle
    }; 
})(); 

const changeState = () => {
    signButton1.innerHTML = displayController.toggle(signButton1.innerHTML, ['O', 'X']); 
    signButton2.innerHTML = displayController.toggle(signButton2.innerHTML, ['O', 'X']); 
}

let [signButton1, signButton2] = [document.getElementsByClassName("signs")[0], document.getElementsByClassName("signs")[1]]; 
signButton1.addEventListener("click", changeState); 
signButton2.addEventListener("click", changeState); 

