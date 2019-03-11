var userID;
var recordInteractions =true;//if true interaction data will be saved
if (localStorage.getItem("userID_community") === null) {
    userID = makeRandomId()
    localStorage.setItem('userID_community', userID);
}
else{
    userID = localStorage.getItem('userID_community');
}
console.log('user ID', userID);
function logInteraction(str)
{
    if(recordInteractions==true){
        var dt = new Date();
        var utcDate = dt.toUTCString();
        str = userID + ","+utcDate+',' + str+'\n';

        request= new XMLHttpRequest();
        request.open("POST", "interaction_log.php?q=" +userID, true);
        //request.setRequestHeader("Content-type", "application/json");
        request.send(str);
    }
}