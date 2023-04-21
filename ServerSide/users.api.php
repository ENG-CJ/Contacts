<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


class usersAPI{

    public static function readData(){
        extract($_POST);
        $response=array();
       
        $sql="select *from `users`;";
        $result=usersAPI::connect()->query($sql);
        if($result){
            while($rows=$result->fetch_assoc()){
                $response[]=array("status"=>true,"response"=>$rows);
            }
           
        }
        else 
        $response=array("status"=>false,"response"=>usersAPI::connect()->error);
        echo json_encode($response);
    }

    private static function connect():mysqli | bool{
        $conn= new mysqli("localhost","root","","contacts");
        if($conn->connect_error)
           return true;

        return $conn;
    }
    public static  function saveUser($data){
        extract($_POST);
        $response=array();
        $id=strtoupper(uniqid("USR"));
        $sql="INSERT INTO `users`(`ID`, `FullName`, `Mobile`, `Address`) VALUES ('$id','$data->name','$data->mobile','$data->address');";
        $result=usersAPI::connect()->query($sql);
        if($result){
         
            $response=array("status"=>true,"message"=>"Successfully Saved....");
        }
        else 
        $response=array("status"=>false,"response"=>usersAPI::connect()->error);
        echo json_encode($response);
    }
    public static  function updateContact($data){
        extract($_POST);
        $response=array();
        $sql="UPDATE `users` SET `FullName`='$data->FullName',`Mobile`='$data->Mobile',`Address`='$data->Address' WHERE `ID`='$data->ID';";
        $result=usersAPI::connect()->query($sql);
        if($result){
         
            $response=array("status"=>true,"message"=>"Successfully Updated.....");
        }
        else 
        $response=array("status"=>false,"response"=>usersAPI::connect()->error);
        echo json_encode($response);
    }
    public static function deleteContact($id){
        extract($_POST);
        $response=array();
      
        $sql="DELETE from users where ID='$id';";
        $result=usersAPI::connect()->query($sql);
        if($result){
            $response=array("status"=>true,"message"=>"Successfully Deleted!....");
        }
        else 
        $response=array("status"=>false,"response"=>usersAPI::connect()->error);
        echo json_encode($response);
    }

    public static function findContact($id){
        extract($_POST);
        $response=array();
       
        $sql="select *from `users` where ID='$id';";
        $result=usersAPI::connect()->query($sql);
        if($result){
           $rows=$result->fetch_assoc();
          $response=array("status"=>true,"response"=>$rows);   
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
        if($clientData->action=="readData")
         usersAPI::readData();
        if($clientData->action=="saveUser")
         usersAPI::saveUser($clientData->data);
        if($clientData->action=="deleteContact")
         usersAPI::deleteContact($clientData->id);
        if($clientData->action=="findContact")
         usersAPI::findContact($clientData->id);
        if($clientData->action=="updateContact")
        usersAPI::updateContact($clientData->data);
        break;
}


?>