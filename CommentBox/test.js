// Global object for filteting 
var filterobj = {
  emotion: null,
  sentiment_final: null,
  subjectivity: null,
  idea_id: null,
  task_id: null
}

// Read json file and create commentBox
d3.json("communitycrit.json", function (err, json) {
  //console.log(json)

  //------------------- Overview ---------------------//

  // fetch proposal_names (row-wise)
  var proposal_names = get_proposal_names(json)
  //console.log(proposal_names)

  // fetch proposal-wise information (row-wise)
  var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
  var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
  var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
  var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
  //console.log(proposal_wise_sentiment_agg)
  //console.log(proposal_wise_emotion_agg)
  //console.log(proposal_wise_subjectivity_agg)
  //console.log(proposal_wise_profanity_agg)

  // fetch all-proposal information (column-wise)
  var all_proposal_sentiment_agg = get_all_proposal_sentiment(json)
  var all_proposal_emotion_agg = get_all_proposal_emotion(json)
  var all_proposal_subjectivity_agg = get_all_proposal_subjectivity(json)
  var all_proposal_profanity_agg = get_all_proposal_profanity(json)
  //console.log(all_proposal_sentiment_agg)
  //console.log(all_proposal_emotion_agg)
  //console.log(all_proposal_subjectivity_agg)
  //console.log(all_proposal_profanity_agg)

  //------------------- Proposal View -----------------//

  // // draw proposal wise comments
  // var idea_id = prompt("Please enter idea_id");  
  //var idea_id = 0
  //draw_proposal_wise_comments(json, idea_id)
  //console.log(json)

  // fetch filtered comments
   filterobj.emotion = "Excited"
   filterobj.sentiment_final = "neutral"
   filterobj.subjectivity = "Fact"
   filterobj.idea_id = null
   filterobj.task_id = null
   
  // console.log(json)

  // var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
  // console.log(json)
  // console.log(filtered_comment)
  // draw filtered comments
  
  //  draw_filtered_comments(filtered_comment)

  // highlight filtered comments
  // CSS
  
  // -------------------- Revision ----------------------//

  //console.log(json)
  
  var revision_item_id = 1
  var issue_revision = save_issue(revision_item_id, json)
});

// function myFunction(){
//   var idea_id = prompt("Please enter idea_id");
//   draw_proposal_wise_comments(json, idea_id)
// }

