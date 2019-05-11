/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        console.log("deviceready called");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

//function to take picture
function pics(){
    navigator.camera.getPicture
    (onSuccess, onError, 
        { quality: 100, 
            destinationType: Camera.DestinationType.FILE_URI,
            allowEdit: false,
            correctOrientation: true,
            saveToPhotoAlbum: true
        }
    )
}
//function to open camera gallery
function openCamera(){
    navigator.camera.getPicture
    (onSuccess, onError, 
        { destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY, 300, 600)
        }
    )
}
var photoisglobal; //global var
//sucess function for taking picture
function onSuccess(imageURI) {
    // console.log("onSuccess called");
    // windows.alert("image path");
    // var image = document.getElementById('myImage');
    // image.src = imageURI;
    photoisglobal = imageURI; // make the taken image an global var
    writeFile();//call the function to save the picture in the
}

//function to return an error
function onError(){
    window.alert("onError called");
    window.alert(error);
}
//function to show the global picture
function takenPicture() {
    document.getElementById('myImage').src = photoisglobal;
}



//function to save the picture in the sandbox
function CreateFileFunction(){

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

var fileSystemOptionals = { create: true, exclusive: false };

var fileEntryGlobal;
// var contentGlobal = "";

function getFileCallback(fileEntry){

    fileEntryGlobal = fileEntry;


}

// function readInput(){
//     // textToWrite = document.getElementById('tripFeedback').value;

//     writeFile(textToWrite);

// }

// Let's write some files
function writeFile(newText) {
    // window.alert("writeFile called");
    // readFile();
    
    var dataObj = new Blob([photoisglobal], { type: 'image/png' });
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([photoisglobal], { type: 'image/png' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            window.alert("file path: " + fileEntryGlobal.fullPath);
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> End writing.";
            
        };

        fileWriter.onerror = function () {
            window.alert("Failed file write: " + e.toString());
            document.getElementById('writeAlert').innerHTML = "<img src='img/logo.png' width='20' height='20'> Error.";

        };

    });
}

// Let's read some files
function readFile() {
    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
        // reader.readAsArrayBuffer
        reader.onloadend = function() {

            window.alert("Successful file read: " + this.result);
            

            // console.log("Successful file read: " + this.result);
            window.alert("file path: " + fileEntryGlobal.fullPath);
            var deucerto = this.result;
            // console.log("file path: " + fileEntryGlobal.fullPath);
            // document.getElementById('myImage').src = photoisglobal;
            document.getElementById('myImage2').src = deucerto;

            // contentGlobal = this.result;
            

        };
    }, onError);
}
