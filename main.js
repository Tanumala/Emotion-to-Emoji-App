Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("Camera");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'/>";
    });
}

console.log('ml5',ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_AH48v17G/model.json",modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

prediction_1="";
prediction_2="";

function speak()
{
    var Synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is"+ prediction_1;
    speak_data_2 = "And second prediction is"+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    Synth.speak(utterThis);

}

function check()
{
    img = document.getElementById('captured_img');
    classifier.classify(img,gotResult);
}

function gotResult(error,result) {
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        speak();
        if(result[0].label == "happy")
        {
            document.getElementById("update_emoji").innerHTML="&#128522";
        }

        if(result[0].label == "angry")
        {
            document.getElementById("update_emoji").innerHTML="&#128545";
        }

        if(result[0].label == "sad")
        {
            document.getElementById("update_emoji").innerHTML="&#128542";
        }

        if(result[1].label == "happy")
        {
            document.getElementById("update_emoji2").innerHTML="&#128522";
        }

        if(result[1].label == "angry")
        {
            document.getElementById("update_emoji2").innerHTML="&#128545";
        }

        if(result[1].label == "sad")
        {
            document.getElementById("update_emoji2").innerHTML="&#128542";
        }
    }
}