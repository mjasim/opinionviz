function save_issue(revision_item_id, json){
    if(revision_item_id == 1)
    $('#myModal').modal('show')
    $('#save_button').on('click', function() {
        console.log(json)
        issue_title = $('#issue_title').val();
        issue_type = $('#issue_type').val();
        issue_text = $('#issue_text').val();
      });
}