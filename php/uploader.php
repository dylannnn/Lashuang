<?php
$filename = $_FILES['file']['name'];
$destination = '../upload/' . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );
?>