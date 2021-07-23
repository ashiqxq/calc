class Calculator{
    constructor(){
        this.computed_value = 0;
        this.tempvalstr = "";
        this.currentoperator = null;
        this.previousoperator = '+';
        this.previouschar = null;
        this.inputscreenexpression = "";
        this.outputscreenexpression = "";
        this.prevcomputed_value = 0;
        this.prevtempvalstr = "";
    }
    update_display(topval="", bottomval=""){
        input_display[0].innerText = this.inputscreenexpression;
        output_display[0].innerText = this.outputscreenexpression;
    }
    clear(){
        this.computed_value = 0;
        this.tempvalstr = "";
        this.currentoperator = null;
        this.previousoperator = '+';
        this.previouschar = null;
        this.inputscreenexpression = "";
        this.outputscreenexpression = "";
        this.update_display();
    }

    temp_compute(new_expr){
        this.previousoperator = new_expr;
        console.log("temp_compute called");
        // this.outputscreenexpression = computer[new_expr](this.outputscreenexpression, 
        //                                                  this.tempvalstr);
        this.inputscreenexpression += new_expr;
        this.prevcomputed_value = this.outputscreenexpression;
        this.tempvalstr = ""
        this.update_display();
    }
    appendToScreen(current_char){
        this.fullexpression += current_char;
        this.inputscreenexpression += current_char;
        this.tempvalstr += current_char;
        // console.log(this.prevcomputed_value);
        // console.log(this.tempvalstr);
        // console.log(this.previousoperator);
        this.outputscreenexpression = computer[this.previousoperator](
                                      this.prevcomputed_value.toString(), this.tempvalstr);
        this.update_display();
    }

    evaluate(){
        this.compute(this.lastexpr, 1);
        this.lastexpr = "";
    }
}
allowed_char = {"0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1,"9": 1, 
                    "*": 1, "/": 1, "+": 1, "-": 1, "%": 1}
allowed_operator = {"+": 1, "-":1, "*": 1, "/": 1};

computer = {
    '+': (x, y) =>{
        if (x=="") {x="0"}
        if (y=="") {y="0"}
        return parseFloat(x)+parseFloat(y);
    },
    '-': (x, y) =>{
        if (x=="") {x="0"}
        if (y=="") {y="0"}
        return parseFloat(x)-parseFloat(y);
    },
    '*': (x, y) =>{
        if (x=="") {x="1"}
        if (y=="") {y="1"}
        return parseFloat(x)*parseFloat(y);
    },
    '/': (x, y) =>{
        if (x=="") {x="1"}
        if (y=="") {y="1"}
        return parseFloat(x)/parseFloat(y);
    }
}
var input_display = $('.input-area');
var output_display = $('.output-area');
$(document).ready(() => {
    $('.clear-btn').on('click', ()=>{
        calc.clear();
    });

    $('.num-btn').on('click', (clickedBtn)=>{
      let new_char = clickedBtn.target.innerText;
      calc.appendToScreen(new_char);
      console.log("new");
    });

    $('.operation-btn').on('click', (clickedBtn)=>{
          console.log("operation triggered");
          let new_expr = clickedBtn.target.innerText;
          calc.temp_compute(new_expr);
        });

    $('.eval-btn').on('click', ()=>{
        calc.evaluate();
      });
});


let calc = new Calculator();

function getFloat(str){
    console.log("logging", str);
    if (str===""){
        return 0;
    }
    return parseFloat(str);
};

