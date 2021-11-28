//Image Preview functions

function PreviewPic(InputId, PreviewId, textId) {
    var input = document.getElementById(InputId);
  
    var text = $(input).val().replace("fakepath\\", "");

    $("#" + textId).val(text);

    if (validateFileName(textId, text))
    {
        $("#" + PreviewId + '_div').css("display", "block");
        readURL(input, PreviewId);
    }
}

function readURL(input, previewId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + previewId).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

