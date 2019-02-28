// export default function() {

//     var element = getElementById("aggregateDiv")
//     console.log(element)
//     var numberOfRow = 7;
//     var numberOfColumns = 5;
//     for (var i = 0; i < numberOfRow; i++){
//         var tempDiv = document.createElement("div")
//         tempRowDiv.id = "row" + i
//         tempRowDiv.className = "c_row"
//         for (var j = 0; j < numberOfColumns; j++){
//             var tempColumnDiv = document.createElement("div")
//             tempColumnDiv.id = "column" + j
//             tempColumnDiv.className = "c_column"+j
//             tempRowDiv.appendChild(tempColumnDiv)
//         }
//         element.appendChild(tempRowDiv)
//     }
// }

var element = document.getElementById("aggregateDiv")
console.log(element)
var numberOfRows = 7;
var numberOfColumns = 5;
for (var i = 0; i < numberOfRows; i++) {
    var tempRowDiv = document.createElement("div")
    tempRowDiv.id = "row" + i
    //console.log(tempRowDiv.id)
    tempRowDiv.className = "c_row"
    for (var j = 0; j < numberOfColumns; j++) {
        var tempColumnDiv = document.createElement("div")
        tempColumnDiv.id = "row" + i + "column" + j
        //console.log(tempColumnDiv.id)
        tempColumnDiv.className = "c_column" + j
        tempRowDiv.appendChild(tempColumnDiv)
    }

    //============================ column 0=========================//
    var column0 = document.getElementById("row"+i+"column0")
    // add button 

    //============================end of column 0==================//

     //============================ column 1=========================//
     var column1 = document.getElementById("row"+i+"column1")
     // read in proposal_wise emotion data
     // d3 for emotion data
 
     //============================end of column 1==================//

    element.appendChild(tempRowDiv)
}
