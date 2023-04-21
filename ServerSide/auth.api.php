<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


class usersAPI{

   
    private static function connect():mysqli | bool{
        $conn= new mysqli("localhost","root","","contacts");
        if($conn->connect_error)
           return true;

        return $conn;
    }
  

    public static function login($data){
        extract($_POST);
        $response=array();
       
        $sql="select *from `admins` where username='$data->username' AND password='$data->password';";
        $result=usersAPI::connect()->query($sql);
        if($result){
            $exist=mysqli_num_rows($result);
            if($exist>0){
                $rows=$result->fetch_assoc();
                $response=array("valid"=>true,"status"=>true,"response"=>$rows);   
            }else{
                $rows=$result->fetch_assoc();
                $response=array("valid"=>false,"status"=>true,"response"=>$rows);   
            }
         
        }
        else 
        $response=array("status"=>false,"response"=>usersAPI::connect()->error);
        echo json_encode($response);
    }
}





$method=$_SERVER['REQUEST_METHOD'];
$clientData=json_decode(file_get_contents("php://input"));
switch($method){
    case "POST":
       
        if($clientData->action=="login")
        usersAPI::login($clientData->data);
        break;
}


?>