var x = "";

whitelist = [{
        username: "mjasim",
        password: "mjasim",
        file: "nyc_final.json"
    },
    {
        username: "guest",
        password: "guest",
        file: "communitycrit_revised.json"
    }
]

function validate_form(formId, feedbackId, feedbackMessage) {
    var value = "";
    if (document.getElementById(formId).checkValidity()) {
        document.getElementById(feedbackId).innerHTML = "";
        value = $("#" + formId).val();
        // console.log(value);
    } else {
        document.getElementById(feedbackId).innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>' + "\xa0" + feedbackMessage;
        x = x + 1;
    }
    return value;
}

$(document).ready(function () {
    $('#login-button').click(function () {

        x = parseInt(0);
        flag = false;

        username = validate_form("inputUserName", "usernameFeedback", "Please input a username");
        password = validate_form("inputPassword", "passwordFeedback", "Please input a password");

        for (var i in whitelist) {
            if (whitelist[i].username == username) {
                flag = true
                if (whitelist[i].password == password) {
                    console.log("login successful")
                    localStorage.setItem("username", username)
                    window.open('main.html', '_self')
                } else {
                    document.getElementById("passwordFeedback").innerHTML = '<i class="fas fa-times-circle" style="color:red"></i>' + "\xa0" + "username and password do not match";
                }
            }
        }

        if (flag == false) {
            document.getElementById("usernameFeedback").innerHTML = '<i class="fas fa-times-circle" style="color:red""></i>' + "\xa0" + "username does not exist";
        }
    });
});

$(document).ready(function () {
    $('#guest-button').click(function () {
        localStorage.setItem("username", "guest")
        window.open('main.html', '_self')
    });
});

$(document).ready(function () {
    $('#inputUserName').change(function () {
        document.getElementById("usernameFeedback").innerHTML = "";
    });
});

$(document).ready(function () {
    $('#inputPassword').change(function () {
        document.getElementById("passwordFeedback").innerHTML = "";
    });
});

$('#inputPassword').keypress(function (e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        $('#login-button').click();
        return false;
    }
});

$('#inputUserName').keypress(function (e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        $('#login-button').click();
        return false;
    }
});