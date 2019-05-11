var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        CreateFileFunction();
        // console.log("deviceready called");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};
var image = document.getElementById('myImage'); //will be used a lot so I made global

//function to take picture
function pics(){
    navigator.camera.getPicture
    (onSuccess, onError, 
        { quality: 100, 
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit: true, //allow edit the picture before save
            correctOrientation: true, //correct the picture orientation
            saveToPhotoAlbum: true // save to camera roll
        }
    )
}

var photoisglobal; // var global

//sucess function for taking picture
function onSuccess(imageURI) {
    photoisglobal = imageURI; // make the taken image an global var
    writeFile();//call the function to save the picture in the sand box
}

//function to get permission in the sandbox
function CreateFileFunction(){//this function is called when device ready, because the device will use file permission

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   //persisten as requested
}

//call back when sucess
function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "takenpicture.png";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false }; //option for the file

var fileEntryGlobal; //variable var

function getFileCallback(fileEntry){

    fileEntryGlobal = fileEntry; //save the file permission into a global variable
}

// this function save the picture in the sandbox
function writeFile() {
        
    var dataObj = new Blob([photoisglobal], { type: 'image/png' });//create a dataobj type picture with the picture taken name
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([photoisglobal], { type: 'image/png' });
        }

        fileWriter.write(dataObj);//write

        fileWriter.onwriteend = function() {//when finish writing, show the:
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> Picture saved.<br><b onclick='readFile()'>Click here to see it.</b>"; //an alert to be fancy
            
        };

        fileWriter.onerror = function () {
            window.alert("Ops...");
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> Ops...error.";

        };

    });
}

// this function is to read the sand box and display in the HTML
function readFile() {
    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
        // reader.readAsArrayBuffer
        reader.onloadend = function() {

            var deucerto = this.result;//save file path into a variable to usa at image source
            image.src = deucerto;
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> Loaded...";
           
        };
    }, onError);
}


//function to return an error
function onError(){
    window.alert("onError called");
    window.alert(error);
    document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> Ops...error.";

}