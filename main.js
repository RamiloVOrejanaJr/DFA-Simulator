//!!! NOTE: ibig sabihin ng NODE ay STATE din, so ang start state at final state pareho lang sa
//                start node at end node

//constructor class for nodes in DFA
    //property a is which node to go if the current character is an 'a'
    //property b is same as above but for current character == 'b'
    //if symbols are numbers 1 and 0, a property a is 1 and property b is 0

    //property nodeID means what HTML element the node corresponds to ->
    //  magkaiba ang nodeID sa node na object mismo, nirerepresent ng nodeID ay ung 
    //  mismong circle sa html, ang node object ay ung data structure 
    class node{
        constructor(a, b, nodeID){
            this.a = a;
            this.b = b;
            this.nodeID = (nodeID);
        }
    }
    
    //creation of node objects in DFA 1
    const trapNode = new node(null, null, "trapNode")
        trapNode.a = trapNode
        trapNode.b = trapNode
    
    const endNode1Let = new node(null, null, "endNode1Let")
        endNode1Let.b = endNode1Let
    
    const endNode2Let = new node(null, null, "endNode2Let")
    endNode2Let.a = endNode2Let
    
    const node13Let = new node(endNode2Let, null, "node13Let")
        endNode1Let.a = node13Let    
    
    const node12Let = new node(node13Let, endNode1Let, "node12Let")
        endNode2Let.b = node12Let
        node13Let.b = node12Let
    
    const node11Let = new node(node13Let, node12Let, "node11Let")
    const node10Let = new node(node11Let, node11Let, "node10Let")
    
    const node9Let = new node(node10Let, null, "node9Let")
    const node8Let = new node(trapNode, node9Let, "node8Let")
    const node7Let = new node(node8Let, null, "node7Let")
        node9Let.b = node7Let
    
    const node6Let = new node(node10Let, trapNode, "node6Let")
    const node5Let = new node(trapNode, node6Let, "node5Let")
    const node4Let = new node(trapNode, node10Let, "node4Let")
    const node3Let = new node(node4Let, trapNode, "node3Let")
        node7Let.b = node3Let
    
    const node2Let = new node(node5Let, node3Let, "node2Let")
    const startNodeLet = new node(node2Let, node7Let, "startNodeLet")
    
    
    //creation of all node objects in the DFA 2
    const endNodeNum = new node(null, null, "endNodeNum");
        endNodeNum.a = endNodeNum;
        endNodeNum.b = endNodeNum;
    const node8Num = new node(endNodeNum, null, "node8Num");
    const node7Num = new node(endNodeNum, node8Num, "node7Num");
    const node6Num = new node(node7Num, node8Num, "node6Num");
    const node5Num = new node(node6Num, null, "node5Num");
        node5Num.b = node5Num;
        node8Num.b = node5Num;
    const node4Num = new node(node5Num, node5Num, "node4Num");
    const node3Num = new node(null, node4Num, "node3Num");
    const node2Num = new node(node4Num, node3Num, "node2Num");      
        node3Num.a = node2Num;      
    const startNodeNum = new node(node2Num, node3Num, "startNodeNum");

//list of all nodes that the string has "traversed or visited", is used for showing the path through DFA
let traversedNodes = [];

//web app starts with DFA1 opened
let currentDFA ="DFA1";
let currentNode=startNodeLet;

//list of all nodes in the dfa, para lang sa pagclear tuwing run
let allNodes = ["startNodeNum", "node2Num", "node3Num", "node4Num","node5Num",
                        "node6Num","node7Num","node8Num","endNodeNum", "startNodeLet", 
                        "node2Let", "node3Let", "node4Let", "node5Let", "node6Let", "node7Let", 
                        "node8Let", "node9Let", "node10Let", "node11Let", "node12Let", "node13Let", 
                        "endNode1Let", "endNode2Let", "trapNode"]

//list of valid nodes; if the final node the string ends up on is included here, then string is valid
let validNodes = [endNode1Let, endNode2Let, endNodeNum]
let inputString = "";
let is_string_valid = null;


//runs through the string and checks each letter of string to check where it goes in the DFA
 function getTraversedNodes(){
    //reset traversedNodes to default state before next run
    traversedNodes = [];
    
    //start traversal of nodes from start node (syempre magsisimula sa start state talaga ba)
    
    if (currentDFA == "DFA1"){
        traversedNodes = ["startNodeLet"];
        currentNode = startNodeLet;
        
    }
    else if (currentDFA == "DFA2"){
        traversedNodes = ["startNodeNum"];
        currentNode = startNodeNum;
    }
                   
    //get user inputted string
    let inputString = document.getElementById("input string").value;

    //iterate through every letter of string
    for (const c of inputString){

        //check if current letter is a or b 
        //!!! unimplemented => needs check if user inputted string only consists of a and b)

        if (currentDFA == "DFA1"){
            if (c == "a"){
                //pushes the next node to the array containing all traversed nodes
                //simulates that the string has passed this particular node's check and thus it's fine to go to next one
                traversedNodes.push(currentNode.a.nodeID);

                //sets currentNode variable to be the next node in line
                //assumes that all nodes are connected to another node by a or b (which is true because DFA)
                currentNode = currentNode.a;        
            }
            else if (c == "b"){
                //all lines are identical to above if statements using 'a', just replaced with 'b'
                traversedNodes.push(currentNode.b.nodeID);
                currentNode = currentNode.b;                        
            }

            else{
                document.getElementById("result").innerHTML = "String should only consist of symbols 'a' and 'b'";
                return
            }
        }

        else if (currentDFA == "DFA2"){
            if (c == "1"){
                traversedNodes.push(currentNode.a.nodeID);
                currentNode = currentNode.a;        
            }
            else if (c == "0" ){
                traversedNodes.push(currentNode.b.nodeID);
                currentNode = currentNode.b;                        
            }

            else{
                document.getElementById("result").innerHTML = "String should only consist of symbols '0' and '1'";
                return                
            }
        }

        
    }

    if (validNodes.includes(currentNode) ){
        document.getElementById("result").innerHTML = "String is valid!";
    }
    else {
        document.getElementById("result").innerHTML = "String is invalid.";
    }

    changeColor();
};

//code taken from stackoverflow; basically just waits for specified amount of milliseconds
// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

//function that changes color of nodes to show what path the string takes through the DFA    
async function changeColor(){   //"async" keyword apparently required for "await" to work
    //let selectedDFA = document.getElementById("DFA2");
    for (let node of allNodes){
        document.getElementById(node).style.fill = "none";
    }       

    for (let node of traversedNodes){
        document.getElementById(node).style.fill = "red";
        await timer(200); 
        document.getElementById(node).style.fill = "green";
        await timer(500);                    
    } 
}



function showStart(){ //sets CSS when loading the website
    document.getElementById("simulator").innerHTML = document.getElementById("DFA1").innerHTML;
    //document.getElementsByClassName("labels").style.fontFamily = "Is-serif";
}

function openDFA1(){ //changes current DFA being simulated to DFA number 1
    //hides DFA2 and shows DFA1
    // document.getElementById("DFA2").style.display = "none";
    // document.getElementById("DFA1").style.display = "block";

    document.getElementById("simulator").innerHTML = document.getElementById("DFA1").innerHTML;
    currentDFA = "DFA1"
    currentNode = startNodeLet
}

function openDFA2(){ //changes current DFA being simulated to DFA number 1
     //hides DFA1 and shows DFA2
    // document.getElementById("DFA1").style.display = "none";
    // document.getElementById("DFA2").style.display = "block";
    
    document.getElementById("simulator").innerHTML = document.getElementById("DFA2").innerHTML;
    currentDFA = "DFA2"
    currentNode = startNodeNum
}
