<!DOCTYPE html>
<html>
<div id="home"></div>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>GulbStudent</title>
    <meta name="description" content="GulbStudent Website.">
    <link rel="stylesheet" href="gscss.css">
    
    
    <link rel="shortcut icon" href="http://efstratiou.info/projects/gulbstudent/favicon.ico" type="image/x-icon"/>
    
    
    <link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>
<link rel="shortcut icon" type="image/png" href="http://efstratiou.info/projects/gulbstudent/favicon.ico"/>
    
    
</head>

<body>
    <div id="myModal" class="modal">
<div class="form-popup" id="loginForm">
    <div class="form-container">
    <h1>Login</h1>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

    <button id="login" onclick="login()">Login</button>
        </div>
</div>
        </div>
    
    <div class="nav">
        <nav>
            <li>
                <div onclick="geofenceScroll()">Proximity Message</div>
            </li>
            <li>
                <div onclick="addDealScroll()">Add Deal</div>
            </li>
            <li>
                <div onclick="manageDealScroll()">Manage Deals</div>
            </li>
            <li><img onclick="homeScroll()" id="logo" src="images/gsLogo.png" alt="GulbStudent Logo"></li>
            <li>
                <div onclick="manageCompScroll()">Competitions</div>
            </li>
            <li>
                <div onclick="addBlogScroll()">Add Blog Post</div>
            </li>
            <li>
                <div onclick="manageBlogScroll()">Manage Blog Posts</div>
            </li>
            <li>
                <div onclick="logout()">Logout</div>
            </li>
        </nav>
    </div>

    <div class="content">
        <!--
            GEOFENCE MESSAGE
        -->
        
        <div class="section">
            <div id="geofence" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Modify Proximity Message</h3>
            <p>
            <div id="messgae"><b>Proximity Message: </b><textarea id="geofenceMessage" required></textarea></div>
            </p>
            <button id="update" onclick="updateGeofence()">Update Proximity Message</button>
        </div>

        <!--
            ADD DEAL
        -->

        <div class="section">
            <div id="addDeal" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Add Deal</h3>
            <form enctype="multipart/form-data" method="post" action="" onsubmit="addNewDeal()">
            <p>
                <div id="addCode"><b>Code: </b><textarea id="codeInput" required></textarea></div>
            </p>

            <p>
            <div id="addDescription"><b>Description: </b><textarea id="descriptionInput" required></textarea></div>
            </p>
            <p><div id="addImage"><b>Image: </b><input type="file" id="dealFileToUpload" name="dealFileToUpload" accept="image/*" required/></div>
            </p>
                <input type="submit" value="Add New Deal" name="dealSubmit">
            </form>

        </div>

        <!--
            MANAGE DEALS
        -->

        <div class="section">
            <div id="manageDeal" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Manage Deals</h3>
                <ul id="current_deal_content"></ul>
        </div>

<!--
            MANAGE COMPS
        -->

        <div class="section">
            <div id="manageComp" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Manage Competitions</h3>
            
            <div id = "open_comp">
                <form id="compForm" enctype='multipart/form-data' method='post' action='' onsubmit='updateComp()'>
                    <p><div id='closeDate'><b>Close Date (DD-MM-YYYY): </b><textarea id='compDateInput' required></textarea></div></p>
                    <p><div id='updateTitle'><b>Title: </b><textarea id='compTitleInput' required></textarea></div></p>
                    <p><div id='updateDescription'><b>Description: </b><textarea id='compDescriptionInput' rows='20' required></textarea></div></p>
                    <p><img id="compImage" alt='Competition Image' width='50%'>
                    <div id='updateImage'><b>Change Image: </b><input type='file' id='compFileToUpload' name='compFileToUpload' accept='image/*'/></div></p>
                    <input type='submit' value='Update Competition' name='compSubmit'>
                </form>
            </div>

            <div id = "new_comp">
                <form id="compForm_new" enctype='multipart/form-data' method='post' action='' onsubmit='updateComp()'>
                    <p><div id='closeDate_new'><b>Close Date (DD-MM-YYYY): </b><textarea id='compDateInput_new' required></textarea></div></p>
                    <p><div id='updateTitle_new'><b>Title: </b><textarea id='compTitleInput_new' required></textarea></div></p>
                    <p><div id='updateDescription_new'><b>Description: </b><textarea id='compDescriptionInput_new' rows='20' required></textarea></div></p>
                    <div id='updateImage_new'><b>Change Image: </b><input type='file' id='compFileToUpload_new' name='compFileToUpload_new' accept='image/*'/></div></p>
                    <input type='submit' value='Update Competition' name='compSubmit_new'>
                </form>
            </div>

            <div id="closed_contact">
                <div id='closedTitle_contact'><b>Title: </b></div>
                <p><div id='winner_contact'><b>Winner: </b></div></p>
                <button onclick=contact() id="contactWinner">Contact Winner</button>
            </div>

            <div id="closed_new">
                <div id='closedTitle'><b>Title: </b></div>
                <p><div id='winner'><b>Winner: </b></div></p>
                <button disabled>Winner Contacted</button>
                <button onclick=newComp()>Create New Competition</button>
            </div>
        </div>

        <!--
            ADD BLOG POST
        -->

        <div class="section">
            <div id="addBlog" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Add Blog Post</h3>
            <p>
                <form enctype="multipart/form-data" method="post" action="" onsubmit="addNewBlog()">
            <div id="addTitle"><b>Title: </b><textarea id="titleInput" required></textarea></div>
            </p>
            <p>
<div id="addArticle"><b>Article: </b><textarea id="articleInput" rows="40" required></textarea></div>
            </p>
            <p>
                <div id="addImage"><b>Image: </b><input type="file" id="blogFileToUpload" name="blogFileToUpload" accept="image/*" required/></div>
            </p>
                <input type="submit" value="Add New Blog Post" name="blogSubmit">
</form>
        </div>


        <!--
            MANAGE BLOG POSTS
        -->
        <div class="section">
            <div id="manageBlog" style="padding-top: 70px; margin-top: -70px;"></div>
            <h3>Manage Blog Posts</h3>
            <ul id="current_blog_content">    
</ul>
        </div>
    </div>

    <footer>
        <p>&copy; GulbStudent, 2019</p>
    </footer>
    <script src="https://www.gstatic.com/firebasejs/5.8.5/firebase.js"></script>
    <script type="text/javascript" src="script.js"></script>
</body>
<?php
    if(isset($_POST['blogSubmit']))
    {
    $target_dir = "images/";
$target_file = $target_dir . basename($_FILES["blogFileToUpload"]["name"]);
        move_uploaded_file($_FILES["blogFileToUpload"]["tmp_name"], $target_file);
    }
    
if(isset($_POST['dealSubmit'])){
    $target_dir = "images/";
$target_file = $target_dir . basename($_FILES["dealFileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    
move_uploaded_file($_FILES["dealFileToUpload"]["tmp_name"], $target_file);
}

if(isset($_POST['compSubmit'])){$target_dir = 'images/';$target_file = $target_dir . basename($_FILES['compFileToUpload']['name']);$uploadOk = 1;$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));move_uploaded_file($_FILES['compFileToUpload']['tmp_name'], $target_file);}


if(isset($_POST['compSubmit_new'])){$target_dir = 'images/';$target_file = $target_dir . basename($_FILES['compFileToUpload_new']['name']);$uploadOk = 1;$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));move_uploaded_file($_FILES['compFileToUpload_new']['tmp_name'], $target_file);}

?>

</html>

