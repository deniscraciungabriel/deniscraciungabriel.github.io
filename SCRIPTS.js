const SideBar = document.getElementById("sidebar");
const Body = document.getElementById("body");
const Search = document.getElementById("searchbar");
const SearchWrapper = document.querySelector(".SearchWrapper");
const SuggBox = SearchWrapper.querySelector(".suggested");
let emptyArray = [];

let suggestions = [
    "How I learned HTML5 and CSS in one week (p)",
    "Code a bot that plays Piano Tiles (p)",
    "Code a sudoku solver script (p)",
    "Use Zydra to crack protected files (c)",
    "Hack Wifi with login (c)",
    "How to extract data from images (c)"
];


Search.onkeyup = (e) =>{
    let UserData = e.target.value;
    
    if (UserData){
        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().includes(UserData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            return data = "<li>"+data+"</li>";
        });
        SuggBox.classList.add("active");
    }
    else{
        SuggBox.classList.remove("active");
    }
    if(emptyArray.length === 0){
        SuggBox.classList.remove("active");
    }
    ShowSuggestions(emptyArray);
    let allList = SuggBox.querySelectorAll("li");
    for (let i = 0; i<allList.length; i++){
        allList[i].setAttribute("onclick", "select(this)");
    }
}

function select(element){
    let selectUserData = element.textContent.split(" ").join("");
    if(selectUserData[selectUserData.length-2] == "p"){
        window.location.pathname = "/Programming/"+ selectUserData.replace("(p)", "") + "/" +(selectUserData.replace("(p)", ""))+".html";
    }
    else if(selectUserData[selectUserData.length-2] == "c"){
        window.location.pathname = "/cybersecurity/"+ selectUserData.replace("(c)", "") + "/" +(selectUserData.replace("(c)", ""))+".html";
    }
}

function ShowSuggestions(list){
    let ListData;
    
    ListData = list.join("");
    SuggBox.innerHTML = ListData;

    
}

function hidebar(){

    if(document.getElementById("sidebar").classList[0] == "active"){
        document.getElementById("sidebar").classList.toggle("active");
    }

};
function showbar(){

    document.getElementById("sidebar").classList.toggle("active");

};

function showbtn(){

    document.getElementById("toggle-btn").classList.toggle("active");
    
};

function trim(s){ 
    return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}

function DeleteValue(){
    Search.value = "";
    SuggBox.classList.remove("active");

}



