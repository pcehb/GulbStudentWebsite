

var config = {
    apiKey: "AIzaSyB3pqndsq-friUm5Hvpe_-hSM7boHcj9ew",
    authDomain: "gulbstudent.firebaseapp.com",
    databaseURL: "https://gulbstudent.firebaseio.com",
    projectId: "gulbstudent",
    storageBucket: "gulbstudent.appspot.com",
    messagingSenderId: "215668487318",
    appId: "1:215668487318:web:d4b3d9dd03062920"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const blogRef = dbRef.child('blog');
const dealRef = dbRef.child('deals');
const addCode = document.getElementById("addCode");
const addDescription = document.getElementById("addDescription");
const addImage = document.getElementById("addImage");
const dealsUL = document.getElementById("current_deal_content");
const blogUL = document.getElementById("current_blog_content");
const open_comp = document.getElementById("open_comp");
const closed_contact = document.getElementById("closed_contact");
const closed_new = document.getElementById("closed_new");
const new_comp = document.getElementById("new_comp");
const closeDateCompInput = document.getElementById("compDateInput");
const descriptionCompInput = document.getElementById("compDescriptionInput");
const titleCompInput = document.getElementById("compTitleInput");
const imageCompInput = document.getElementById("compImage");
const closeDateCompInput_new = document.getElementById("compDateInput_new");
const descriptionCompInput_new = document.getElementById("compDescriptionInput_new");
const titleCompInput_new = document.getElementById("compTitleInput_new");
const closedTitle_contact = document.getElementById("closedTitle_contact");
const winner_contact = document.getElementById("winner_contact");
const contactWinner = document.getElementById("contactWinner");
const closedTitle = document.getElementById("closedTitle");
const winner = document.getElementById("winner");
const codeInput = document.getElementById("codeInput");
const descriptionInput = document.getElementById("descriptionInput");
const titleInput = document.getElementById("titleInput");
const articleInput = document.getElementById("articleInput");
const geofenceMessage = document.getElementById("geofenceMessage");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("psw");
var modal = document.getElementById("myModal");

//var user = firebase.auth().currentUser;
//
//console.log(user);
//
//if (user) {
//  // User is signed in.
//    modal.style.display = "none";
//} else {
// modal.style.display = "block";
//}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
      modal.style.display = "none";
  } else {
    // No user is signed in.
      modal.style.display = "block";
  }
});

function login(){
    var email =emailField.value
    var password=passwordField.value
    
    firebase.auth().signInWithEmailAndPassword(email, password);
    var user = firebase.auth().currentUser;
    if (user) {
  // User is signed in.
    modal.style.display = "none";
} else {
 modal.style.display = "block";
}
}

function logout(){
    firebase.auth().signOut();
    modal.style.display = "block";
}

dealRef.on("value", function (snapshot) {
    dealsUL.innerHTML = ""
    snapshot.forEach(function (data) {
        var key = data.key
        dealsUL.innerHTML += "<li><p><b>Code: </b>"+data.child('code').val()+"</p><p><b>Description: </b>"+data.child('description').val()+"</p><button onclick=deleteDeal('"+key+"')>Delete Deal</button></li>";
        });
});

blogRef.on("value", function (snapshot) {
    blogUL.innerHTML = "";
    snapshot.forEach(function (data) {
        var key = data.key;
        blogUL.innerHTML += "<li><p><b>Title: </b>"+data.child('title').val()+"</p><p><b>Article: </b>"+data.child('article').val()+"</p><button id="+'delete'+" onclick=deleteBlog('"+key+"')>Delete Blog Post</button></li>";
        });
});

dbRef.child('message').on("value", function (snapshot) {
    geofenceMessage.value = snapshot.val();
});


dbRef.child('competition').on("value", function (snapshot) {
    if (snapshot.child("closed").val() == "true" && snapshot.child("contacted").val() == "false")
        {
            closed_contact.style.display = "block";
            closed_new.style.display = "none";
            open_comp.style.display = "none";
            new_comp.style.display = "none";
            
            closedTitle_contact.innerHTML = "<b>Title: </b>"+ snapshot.child("title").val() +"";
            winner_contact.innerHTML = "<b>Winner: </b>"+ snapshot.child("winner").val()+"";
        }
    else if (snapshot.child("closed").val() == "true" && snapshot.child("contacted").val() == "true")
        {
            closed_new.style.display = "block";
            closed_contact.style.display = "none";
            open_comp.style.display = "none";
            new_comp.style.display = "none";
            
            closedTitle.innerHTML = "<b>Title: </b>"+ snapshot.child("title").val() +"";
            winner.innerHTML = "<b>Winner: </b>"+ snapshot.child("winner").val()+"";
        }
    else{

        open_comp.style.display = "block";
        closed_contact.style.display = "none";
        closed_new.style.display = "none";
        
        closeDateCompInput.value = snapshot.child("closeDate").val();
        descriptionCompInput.value = snapshot.child("description").val();
        titleCompInput.value = snapshot.child("title").val();
        imageCompInput.src = snapshot.child('photoURL').val();
    }
});

dbRef.child('competition').once("value", function (snapshot) {
    var closeDate = snapshot.child('closeDate').val();
        var d = new Date();
        d.setHours(0,0,0,0);
        
        var formatClose = closeDate.split("-").reverse().join("-");
        var closeD = new Date(formatClose)
        closeD.setHours(0,0,0,0);
        if(d > closeD){
            //closed
            dbRef.child('competition').update({closed: "true"});
                        
            dbRef.child('competition').child('winner').once("value", function (snapshot) {
                if(snapshot.val() == "not selected"){
                    var winnerEmail = "..."
                    dbRef.child('competition').child('entries').once("value", function (snapshot) {
                        var winnerNum = Math.floor(Math.random() * Math.floor(snapshot.numChildren()));
                        if (snapshot.numChildren() == 0){
                            dbRef.child('competition').update({contacted: "true", winner: "No entries"});
                        } else {
                            var index = 0;
                        snapshot.forEach(function (data) {
                        if (index == winnerNum){
                           winnerEmail = data.val();
                            dbRef.child('competition').update({winner: winnerEmail});
                        }
                        index++;
                        });}
                        
                    });
                    
                }
        });
        }
            else{
            dbRef.child('competition').update({closed: "false", winner: "not selected", contacted: "false"});
             }
});

function updateComp(){
    
    if(open_comp.style.display == "block"){
        
        alert("Competition Updated!");
        
        const photoInput = document.getElementById('compFileToUpload').files.item(0)

        if (photoInput == null){
            dbRef.child('competition').update({
            closeDate: closeDateCompInput.value,
            closed: "false",
            contacted: "false",
            description: descriptionCompInput.value,
            title: titleCompInput.value,
            winner: "not selected"
        });
        } else{
        dbRef.child('competition').update({
            closeDate: closeDateCompInput.value,
            closed: "false",
            contacted: "false",
            description: descriptionCompInput.value,
            photoURL:"http://efstratiou.info/projects/gulbstudent/images/"+document.getElementById('compFileToUpload').files.item(0).name,
            title: titleCompInput.value,
            winner: "not selected"
        });
        }
    }
    else{
        
        alert("New Compeition Added!");
        const photoInput = document.getElementById('compFileToUpload_new').files.item(0)

        if (photoInput == null){
            dbRef.child('competition').update({
            closeDate: closeDateCompInput_new.value,
            closed: "false",
            contacted: "false",
            description: descriptionCompInput_new.value,
            title: titleCompInput_new.value,
            winner: "not selected"
        });
        } else{
        dbRef.child('competition').update({
            closeDate: closeDateCompInput_new.value,
            closed: "false",
            contacted: "false",
            description: descriptionCompInput_new.value,
            photoURL:"http://efstratiou.info/projects/gulbstudent/images/"+document.getElementById('compFileToUpload_new').files.item(0).name,
            title: titleCompInput_new.value,
            winner: "not selected"
        });
        }
    }
}

function newComp(){
    open_comp.style.display = "none";
    closed_contact.style.display = "none";
    closed_new.style.display = "none";
    new_comp.style.display = "block";
}


function contact(){
    
    dbRef.child('competition').child('winner').once("value", function (snapshot) {
                window.open('mailto:'+snapshot.val());
        });
    
    
    dbRef.child('competition').update({contacted: "true"});
    dbRef.child('competition').child("entries").remove();
}


function deleteBlog(key){
    blogRef.child(key).remove();
    blogUL.innerHTML = ""
    blogRef.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
        var key = data.key
        blogUL.innerHTML += "<li><p><b>Title: </b>"+data.child('title').val()+"</p><p><b>Article: </b>"+data.child('article').val()+"</p><button id=delete onclick=deleteBlog('"+key+"')>Delete Blog Post</button></li>";
        });
});
}

function deleteDeal(key){
    dealRef.child(key).remove();
    dealsUL.innerHTML = ""
    dealRef.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
        var key = data.key
        dealsUL.innerHTML += "<li><p><b>Code: </b>"+data.child('code').val()+"</p><p><b>Description: </b>"+data.child('description').val()+"</p><button onclick=deleteDeal('"+key+"')>Delete Deal</button></li>";
        });
});
}

function addNewBlog(){
    var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
blogRef.push({
  article: articleInput.value,
  date: date,
  title: titleInput.value,
    photoURL:"http://efstratiou.info/projects/gulbstudent/images/"+document.getElementById('blogFileToUpload').files.item(0).name
})
    articleInput.value = ""
    titleInput.value = ""
    alert("Blog post added!");
        
}

function addNewDeal(){    
dealRef.push({
  code: codeInput.value,
  description: descriptionInput.value,
    photoURL:"http://efstratiou.info/projects/gulbstudent/images/"+document.getElementById('dealFileToUpload').files.item(0).name
})
    codeInput.value = ""
    descriptionInput.value =""
    alert("Deal added!");
    
}

function updateGeofence(){
    dbRef.update({'message': geofenceMessage.value});
}

function addDealScroll() {
  var elmnt = document.getElementById("addDeal");
  elmnt.scrollIntoView();
}

function manageDealScroll() {
  var elmnt = document.getElementById("manageDeal");
  elmnt.scrollIntoView();
}

function homeScroll() {
document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function addBlogScroll() {
  var elmnt = document.getElementById("addBlog");
  elmnt.scrollIntoView();
}

function manageBlogScroll() {
  var elmnt = document.getElementById("manageBlog");
  elmnt.scrollIntoView();
}

function manageCompScroll(){
    var elmnt = document.getElementById("manageComp");
  elmnt.scrollIntoView();
}

function geofenceScroll(){
var elmnt = document.getElementById("geofence");
  elmnt.scrollIntoView();
}