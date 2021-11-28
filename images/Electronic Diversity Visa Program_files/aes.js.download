//this script contain functions used by AES disable/enable controls and hide/show errors.
var space = /\s/;
var rChar = /[\&#!“”\"\<\>]+/;
var surChar = /^[A-Za-z]{1}[A-Za-z\s\-']{0,33}$/;

function showHideError(ctrl, msg) {
    //if msg is empty or new line
    if (msg == "" || msg == "\n") {
        $(ctrl).css("display", "none");
    }
    else {
        $(ctrl).css("display", "block");
    }

    $(ctrl).text(msg);
    $(ctrl).html($(ctrl).html().replace(/\n/g, '<br/>'));
}

function validateFileName(textId, text) {
    if (text != null && text != undefined) {
        if (rChar.test(text) == true) {
            let charErr = "The following are not accepted: &, #, !, double quotes (\“ \”), <, >. You must remove before continuing.";
            showHideError("label[for$=" + textId + "]", charErr);
            return false;
        }
        else {
            let charErr = "";
            showHideError("label[for$=" + textId + "]", charErr);
            return true;
        }
    }  
}

$(document).ready(function () {
    $('#divError').css("display", "none");
    $('#divErrorServerSide').css("display", "block");

    $('.gnome input').on('change', function () { CheckRadio(this); BirthEligibleCountry(this); });
    $('.combo input:checkbox').on('change', function () { CheckCombo(this); });
    CheckCombos();
    CheckRadios();

    function CheckCombos() {
        $('.combo input:checkbox').each(function () {
            if (this.checked) { CheckCombo(this); }
        });
    }

    function CheckCombo(c) {
        var t = document.getElementById(c.id.replace('cbx', 'txt'));

        if (c.checked) {
            if (t != null) { t.value = ''; t.disabled = true; }
        } else { t.disabled = false; }

        return true;
    }

    function CheckRadios() {
        $('.gnome input:checked').each(function () { CheckRadio(this); });
    }

    function CheckRadio(r) {
        var i = r.id.replace('rbl', 'drp');

        var d = document.getElementById(i.substring(0, i.length - 2));

        if (r.value == 'Y') {
            d.disabled = true; $('#' + d.id).val('0');
        } else {
            $('#' + d.id).attr('disabled', false);
        }
    }

    //fixed page load and page navigation country dropdown
    if ($('select[id$=drpBirthCountry]').val() != 0 && $('select[id$=drpBirthCountry]').val() != undefined) {
        if ($('input[id$=hidBirthEligibleCountry]').val() != 0) {
            $('select[id$=drpBirthEligibleCountry]').val($('input[id$=hidBirthEligibleCountry]').val());
            $('select[id$=drpBirthEligibleCountry] option[value=' + $('input[id$=hidBirthEligibleCountry]').val() + ']').attr("selected", "selected");
        }
        else if ($('select[id$=drpBirthEligibleCountry]').is(':disabled')) {
            loadElgCountry();
        }
    }

    //97768 & 87487
    var $txtList = $('input[type=text]'); //generate textbox array.

    $txtList.each(function (idx, el) {
        //If textbox is the email address field, apply both special character check and restrict spaces.
        if ((el.id == $('input[id$=txtEmailAddress]').attr('id')) || (el.id == $('input[id$=txtConfEmailAddress]').attr('id')))
            {
            $(el).change(function () {
                //populate the error message then call showhideerror.
                var spaceErr = "";
                var charErr = "";

                space.test(el.value) == true ? spaceErr = "Email addresses must never contain spaces; please remove spaces before continuing." : spaceErr = "";
                rChar.test(el.value) == true ? charErr = "The following are not accepted: &, #, !, double quotes (\“ \”), <, >. You must remove before continuing." : charErr = "";

                showHideError("label[for$=" + el.id + "]", spaceErr + "\n" +charErr);
        });
        } //all other textboxes, apply special character check
        else {
            $(el).change(function () {
                if (rChar.test(el.value))
                    {
                        showHideError("label[for$=" + el.id + "]", "The following are not accepted: &, #, !, double quotes (\“ \”), <, >. You must remove before continuing.")
                    }               
                else if (($(el).attr('id').indexOf("txtLastName") > 0 && el.value != '') || ($(el).attr('id').indexOf("txtPPLastName") > 0 && el.value != ''))
                {
                    if (surChar.test(el.value) == false) {
                        showHideError("label[for$=" + el.id + "]", "This field must start with a letter and can only contain letters, apostrophe, hyphen, or space. Please modify before continuing.")
                    }
                    else
                    {
                    showHideError("label[for$=" + el.id + "]", "");
                    }
                }
                else
                {
                    showHideError("label[for$=" + el.id + "]", "");
                }
            });
        }
    });

    //bind click events to controls
    $('input[id$=btnSubmit], input[id$=btnContinueP1], input[id$=btnContinueP2], input[id$=btnReview], input[id$=btnBackTo1], input[id$=btnBackTo2], input[id$=btnCancel], input[id$=btnTopBackTo1]').bind("click", function (e) {
        validate(e);
        });

        function validate(e) {
            var hasError = false;

            $txtList.each(function (idx, el) {
                if ((el.id == $('input[id$=txtEmailAddress]').attr('id')) || (el.id == $('input[id$=txtConfEmailAddress]').attr('id'))) {
                    if (!hasError) {
                        if (space.test(el.value) || rChar.test(el.value)) {
                            hasError = true;
                        }
                    }
            } //all other textboxes, apply special character check
            else {
                if (!hasError)
                    rChar.test(el.value) == true ? hasError = true : hasError = false;
            }
        });

        if (hasError) {
            $(window).scrollTop(0);
            $('#divError').css("display", "block");
            $('#divErrorServerSide').css("display", "none");
            e.preventDefault();
           }
        }

        function BirthEligibleCountry(r) {
            if (r.value == 'Y') {
                populateElgCountry();
            }
        }

    //96767
    $('select[id$=drpBirthCountry]').change(function () {
        populateElgCountry();
        });

        function populateElgCountry() {
            //reset controls
            $('input[id$=hidBirthEligibleCountry]').val("");

        $.ajax({
                type: "POST",
                    url: "application.aspx/populateElgCountry",
                    data : "{'pobCountry':'" + $('select[id$=drpBirthCountry]').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                dataType: "json",
                    success: function (data) {
                        if ($('select[id$=drpBirthCountry]').val() != data.d) {
                        //set birth eligible country
                        $('select[id$=drpBirthEligibleCountry]').val(data.d);
                        $('select[id$=drpBirthEligibleCountry] option[value=' + data.d + ']').attr("selected", "selected");
                        $('input[id$=hidBirthEligibleCountry]').val(data.d);
                    }
                    else {
                        //reset birth eligible country
                        $('select[id$=drpBirthEligibleCountry]').val(0);
                        $('select[id$=drpBirthEligibleCountry] option[value=0]').attr("selected", "selected");
                        $('input[id$=hidBirthEligibleCountry]').val(0);
            }
}
        });
        }

        function loadElgCountry() {
            //reset controls
            $('input[id$=hidBirthEligibleCountry]').val("");

            $.ajax({
                type: "POST",
                    url: "application.aspx/populateElgCountry",
                    data : "{'pobCountry':'" + $('select[id$=drpBirthCountry]').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    if ($('select[id$=drpBirthCountry]').val() != data.d) {
                        //set birth eligible country
                        $('select[id$=drpBirthEligibleCountry]').val(data.d);
                        $('select[id$=drpBirthEligibleCountry] option[value=' + data.d + ']').attr("selected", "selected");
                        $('input[id$=hidBirthEligibleCountry]').val(data.d);
                    }
                }
            });
        }

    $('select[id$=drpBirthEligibleCountry]').change(function () {
        // if Birth Eligible Country is changed, set country id
        $('input[id$=hidBirthEligibleCountry]').val($('select[id$=drpBirthEligibleCountry]').val());
    });
    $('input[id$=ppChk]').change(function () {
        if ($('input[id$=ppChk').is(":checked")) {
            PassportFieldsExempt();
            }
        else {
            PassportFieldsNonExempt();
        }
    });
    if ($('input[id$=ppChk').is(":checked")) {        
        PassportFieldsExempt();
    }
    else
    {
        PassportFieldsNonExempt();
    }
    if ($('input[id$=cbxPPFirstName').is(":checked"))
    {
        $('input[id$=txtPPFirstName').prop("disabled", true);
    }
    if ($('input[id$=cbxPPMiddleName').is(":checked")) {
        $('input[id$=txtPPMiddleName').prop("disabled", true);
    }

});

function PassportFieldsNonExempt()
{
    $('input[id$=txtPPLastName').prop("disabled", false);
    $('input[id$=txtPPFirstName').prop("disabled", false);
    $('input[id$=cbxPPFirstName').prop("disabled", false);
    $('input[id$=txtPPMiddleName').prop("disabled", false);
    $('input[id$=cbxPPMiddleName').prop("disabled", false);
    $('input[id$=txtPPNum').prop("disabled", false);
    $('input[id$=txtPPExpMonth').prop("disabled", false);
    $('input[id$=txtPPExpDay').prop("disabled", false);
    $('input[id$=txtPPExpYear').prop("disabled", false);
    $('select[id$=drPPCountry').prop("disabled", false);
    $("#divRblPPExReason").each(function () {
        $(this).find(':input').prop("disabled", true);
        $(this).find(':input').prop("checked", false);
    });
}

function PassportFieldsExempt()
{
    $('input[id$=txtPPLastName').prop("disabled", true);
    $('input[id$=txtPPFirstName').prop("disabled", true);
    $('input[id$=cbxPPFirstName').prop("disabled", true);
    $('input[id$=txtPPMiddleName').prop("disabled", true);
    $('input[id$=cbxPPMiddleName').prop("disabled", true);
    $('input[id$=txtPPNum').prop("disabled", true);
    $('input[id$=txtPPExpMonth').prop("disabled", true);
    $('input[id$=txtPPExpDay').prop("disabled", true);
    $('input[id$=txtPPExpYear').prop("disabled", true);
    $('select[id$=drPPCountry').prop("disabled", true);;
    $('input[id$=txtPPLastName').val("");
    $('input[id$=txtPPFirstName').val("");
    $('input[id$=cbxPPFirstName').prop("checked", false);
    $('input[id$=txtPPMiddleName').val("");
    $('input[id$=cbxPPMiddleName').prop("checked", false);
    $('input[id$=txtPPNum').val("");
    $('input[id$=txtPPExpMonth').val("");
    $('input[id$=txtPPExpDay').val("");
    $('input[id$=txtPPExpYear').val("");
    $('select[id$=drPPCountry').val("0");
    $("#divRblPPExReason").each(function () {
        $(this).find(':input').prop("disabled", false);
    });
}