rec = ""
status = ""
object = []

function preload()
{
    rec = createVideo("video.mp4")
    rec.hide()
}

function setup()
{
    canvas = createCanvas(480,360)
    canvas.center()
}

function modelLoaded()
{
    console.log("model is loaded deal with it")
    status = true
    rec.loop()
    rec.volume(0)
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting objects"
}

function draw()
{
    image(rec,0,0,480,360)
    if(status == "true")
{
    objectDetector.detect(rec, gotResult)
    for(i=0;i<=object.length;i++)
    {
        document.getElementById("status").innerHTML = "Status: Objects detected"
        document.getElementById("number_of_objects").innerHTML = "There are "+object.length+ " objects"
        fill("red")
        text(object[i].label,object[i].x,object[i].y)
        noFill()
        stroke("black")
        rect(object[i].x,object[i].y, object[i].width, object[i].height)
    }
}}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
                console.log(results)
                object = results
    }
}