var app = {
    initialize: function() {
this.bindEvents();
    },
    bindEvents: function() {
document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
app.receivedEvent('deviceready');CreateFileFunction();
    },
    receivedEvent: function(id) {
var parentElement = document.getElementById(id);
var listeningElement = parentElement.querySelector('.listening');
var receivedElement = parentElement.querySelector('.received');

listeningElement.setAttribute('style', 'display:none;');
receivedElement.setAttribute('style', 'display:block;');
    }
};
function Smile(){navigator.camera.getPicture(onSuccess, onError, { quality: 100, destinationType: Camera.DestinationType.FILE_URI})}

var cctKKKKKKK;
function onSuccess(imageURI) {
cctKKKKKKK = imageURI;
writeFile();}

function onError(){
window.alert("Fuck...");
window.alert(error);
}
function CreateFileFunction(){
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);}

function fileSystemCallback(fs){
var fileToCreate = "CCTSuper10.png";
fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);}

var fileSystemOptionals = { create: true, exclusive: false };

var fileEntryGlobal;

function getFileCallback(fileEntry){fileEntryGlobal = fileEntry;}

function writeFile() {
var dataObj = new Blob([cctKKKKKKK], { type: 'image/png' });
fileEntryGlobal.createWriter(function (fileWriter) {
if (!dataObj) {
dataObj = new Blob([cctKKKKKKK], { type: 'image/png' });
}
fileWriter.write(dataObj);
;

fileWriter.onerror = function () {window.alert("Fuck...");};});
}

function RetrieveSmile() {
fileEntryGlobal.file(function (file) {
var reader = new FileReader();
reader.readAsText(file);  
reader.onloadend = function() {
document.getElementById('myImage').src = cctKKKKKKK;
};
    }, onError);
}
