function save_issue(revision_item_id, json){
    if(revision_item_id == 1)
    $('#issueModal').modal('show')
    $('#issue_save_button').on('click', function() {
        console.log(json)
        issue_title = $('#issue_title').val();
        issue_type = $('#issue_type').val();
        issue_text = $('#issue_text').val();
      });
}

function save_criteria(revision_item_id, json){
  if(revision_item_id == 1)
  $('#criteriaModal').modal('show')
  $('#criteria_save_button').on('click', function() {
      console.log(json)
      criteria_title = $('#criteria_title').val();
      criteria_type = $('#criteria_type').val();
      criteria_text = $('#criteria_text').val();
    });
}

