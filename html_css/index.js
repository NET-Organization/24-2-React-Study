let learned = ["","",""];
let message = "";
function checkHTML(e)
{
    var result = document.getElementById("HTMLBox");
    if(e.checked == true)
    {
        console.log(result.value);
        learned[0] = result.value;
    }
    else
        learned[0] = "";
};

function checkCSS(e)
{
    var result = document.getElementById("CSSBox");
    if(e.checked == true)
    {
        console.log(result.value);
        learned[1] = result.value;
    }
    else
        learned[1] = "";
}

function checkJS(e)
{
    var result = document.getElementById("JSBox");
    if(e.checked == true)
    {
        console.log(result.value);
        learned[2] = result.value;
    }
    else
    learned[2] = "";
}

function buttonClick()
{
    for(var i = 0; i < learned.length; i++)
    {
        if(learned[i] != "")
            message += (learned[i] + " ");
    }

    if(message == "")
        alert("열심히 공부하세요!!")
    else
        console.log(`${message}를 배웠군요! 잘했습니다.`);

    message = "";
}

const finishButton = document.getElementById("btn");

finishButton.addEventListener('click', buttonClick);