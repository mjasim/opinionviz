raw_json = null;
prop_json = null;

d3.json("communitycrit_revised.json", function (err, myjson) {
    raw_json = JSON.parse(JSON.stringify(myjson))
    prop_json = JSON.parse(JSON.stringify(myjson))

    build_compare_drop(raw_json)
});

function build_compare_drop(json) {
    compare_proposal_names = get_proposal_names(json)

    var left_dd = document.getElementById("compareLeftDrop")
    var right_dd = document.getElementById("compareRightDrop")

    console.log(compare_proposal_names)

    var dd_html_left =
        '<div class="col-lg-6 col-m-6 col-sm-12">' +
        '<select class="form-control" id="leftIdeaSelect">' +
        '<option value="">Please select a proposal</option>';

    var dd_html_right =
        '<div class="col-lg-6 col-m-6 col-sm-12">' +
        '<select class="form-control" id="rightIdeaSelect">' +
        '<option value="">Please select a proposal</option>';

    for (var i in compare_proposal_names) {
        dd_html_left = dd_html_left + '<option>' + compare_proposal_names[i].idea_name + '</option>'
        dd_html_right = dd_html_right + '<option>' + compare_proposal_names[i].idea_name + '</option>'
    }

    dd_html_left = dd_html_left + '</select>' + '</div>' + '</div>';
    dd_html_right = dd_html_right + '</select>' + '</div>' + '</div>';

    left_dd.innerHTML = dd_html_left
    right_dd.innerHTML = dd_html_right
}

$(document).ready(function () {
    $(document).on('change', '#leftIdeaSelect', function() {
        var selected_idea = $("#leftIdeaSelect").val();
        console.log(selected_idea)
    });
});

$(document).ready(function () {
    $(document).on('change', '#rightIdeaSelect', function() {
        var selected_idea = $("#rightIdeaSelect").val();
        console.log(selected_idea)
    });
});