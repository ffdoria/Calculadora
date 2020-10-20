import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props){
  return (
    <div className="App">
      <p>{props.value}</p>
    </div>
  );
}
function Button(props){
  return (
   <button onClick={props.click}>{props.text} </button>
  );
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentOperand: '',
      oldOperand: '',
      operation: '',
      pilha: [],
      bolVirgula: false,
      reset: false,
    };
    this.addNumber = this.addNumber.bind(this);
    this.apagar = this.apagar.bind(this);
    this.op = this.op.bind(this);
    this.igual = this.igual.bind(this);
    this.apagarTudo = this.apagarTudo.bind(this);
    this.regMem = this.regMem.bind(this);
    this.recMem = this.recMem.bind(this);
    this.recMempart = this.recMempart.bind(this);
    this.apaMempart = this.apaMempart.bind(this);
  }

  addNumber(number){
    const { bolVirgula,currentOperand,reset } = this.state
    if (number !== "." & reset ==false) {
      this.setState({
        currentOperand: this.state.currentOperand + number
      })
    } else if (number === "." & bolVirgula===false & reset ===false) {
      this.setState({
        currentOperand: this.state.currentOperand + number,
        bolVirgula: true
      })
    } else if (number === "." & bolVirgula===true & reset ===false) {
      this.setState({
        currentOperand: currentOperand,
      })
    } else if (number !== "." & reset == true) {
      this.setState({
        currentOperand: number,
        reset: false
      })
    } else if (number === "." & bolVirgula===false & reset === true) {
      this.setState({
        currentOperand: number,
        bolVirgula: true,
        reset: false
      }) 
    } else if (number === "." & bolVirgula===true & reset ===true) {
      this.setState({
        currentOperand: number,
        reset: false
      })
    }
  }
  apagar(){
    this.setState(
      {
        currentOperand: "",
        reset: false,
        bolVirgula: false
      }
    );
  }

  op(atual,op){
    this.setState(
      {
        oldOperand: atual + op,
        currentOperand: "",
        reset: false,
        operation: op,
        bolVirgula: false
      }
    );
  }
  igual(atual,ant,op){
    this.setState((state) => {
        let comp;
        switch(op) {
          case '+':
            comp = parseFloat(atual) + parseFloat(ant);
            break;
          case '-':
            comp = parseFloat(ant) - parseFloat(atual) ;
            break;
          case '/':
            comp = parseFloat(ant) / parseFloat(atual);
            break;
          case '*':
            comp = parseFloat(atual) * parseFloat(ant)
            break;
          default:
            return;
        }
      return {
        currentOperand: comp,
        oldOperand: '',
        operation: '',
        reset: true,
      }
      }
    );
  }
  apagarTudo(){
    this.setState(
      {
        oldOperand: "",
        currentOperand: "",
        operation: "",
        bolVirgula: false
      }
    );
  }
  regMem(){
    this.setState((state) => {
      const {currentOperand, pilha} = state;
      const prev = pilha.slice();
      const current = parseFloat(currentOperand);
      prev.unshift(current)
      return{
        pilha: prev
      }
    }
    );
  }
  recMem(){
    this.setState((state) => {
      const {pilha} = state;
      let topo;
      topo = pilha.slice(0)[0];
      return{
        currentOperand: parseFloat(topo)
      }
    }
    );
  }
  apaMem(){
    this.setState((state) => {
      const {pilha} = state;
      return{
        pilha: []
      }
    }
    );
  }

  somMem(){
    this.setState((state) => {
      const {currentOperand,pilha} = state;
      let novo;
      const lista = pilha.slice();
      novo = pilha.slice(0)[0] + parseFloat(currentOperand);
      lista.shift();
      lista.unshift(novo);
      return{
        pilha: lista
      }
    }
    );
  }
  apaMempart(el){
    this.setState((state) => {
      const {pilha} = state;
      let pilhanov;
      pilhanov = pilha.slice()
      pilhanov.splice(pilhanov.indexOf(el), 1);
      return{
        pilha: pilhanov
      }
    }
    );
  }
  recMempart(el){
    this.setState((state) => {
      return{
        currentOperand: el
      }
    }
    );
  }

  render(){
    return (
      <div className="App">
        <article>
          <header> 
            <h1> Calculadora</h1>
          </header>
          <main class="Corpo">
            <section class = "visor">
              <p><Display value={this.state.oldOperand}/></p>
              <h1><Display value={this.state.currentOperand}/></h1>
            </section>
            <section class="botoes">
              <div class= "but2">
              {/*<Button class= "mc" text="MC" click={() => this.apaMem()}/> 
              <Button class= "mr" text="MR" click={() => this.recMem()}/>  
              <Button class= "mmais" text="M+" click={() => this.somMem()}/>  
    <Button class= "ms" text="MS" click={() => this.regMem()}/>*/}
              <Button class= "set" text="7" click={() => this.addNumber("7")}/>
              <Button class= "oit" text="8" click={() => this.addNumber("8")}/>
              <Button class= "nov" text="9" click={() => this.addNumber("9")}/>
              <Button class= "div" text="/" click={() => this.op(this.state.currentOperand,'/')}/>
              <Button class= "qua" text="4" click={() => this.addNumber("4")}/>
              <Button class= "qui" text="5" click={() => this.addNumber("5")}/>
              <Button class= "sei" text="6" click={() => this.addNumber("6")}/>
              <Button class= "vz" text="*" click={() => this.op(this.state.currentOperand,'*')}/>
              <Button class= "um" text="1" click={() => this.addNumber("1")}/>
              <Button class= "doi" text="2" click={() => this.addNumber("2")}/>
              <Button class= "tre" text="3" click={() => this.addNumber("3")}/>
              <Button class= "men" text="-" click={() => this.op(this.state.currentOperand,'-')}/>
              <Button class= "ac" text="AC" click={() => this.apagar()}/>
              <Button class= "zer" text="0" click={() => this.addNumber("0")}/>
              <Button class= "dot" text="." click={() => this.addNumber(".")}/>
              <Button class= "mai" text="+" click={() => this.op(this.state.currentOperand,'+')}/>
              </div>
              <div class="dobro">
              <Button class= "clear" text="Clear All" click={() => this.apagarTudo()}/>  
              <Button class= "ig" text="=" click={() => this.igual(this.state.currentOperand,this.state.oldOperand,this.state.operation)}/> 
              </div>
              
            </section>
          {/*}
            <section class="memoria">
              <h1> Memoria </h1>
              {
                this.state.pilha.map(
                  (el) =>
                  <div> 
                    {el} <Button class= "mc" text="MC" click={() => this.apaMempart(el)}/> 
                    <Button class= "mr" text="MR" click={() => this.recMempart(el)}/> 
                  </div>
                  
                )
              }
            </section>
            */}
          </main>
        </article>
      </div>
    );
  }
}

export default App;
