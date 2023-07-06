const UserService =  require("../service/userService")


const user_registration = async(req, res) => {
    try{
        const data = req.body
        const result = await UserService.sign_up(data.firstName, data.lastName, data.email , data.password, data.contact);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send({data: err.message});
    }
}

const user_login = async (req, res) =>{
    try{
        const data = req.body
        const result = await UserService.login(data.email , data.password);
        if(result){
            res.status(200).json({
                "status" : "success",
                'data': result
        })
        }else{
            res.status(400).json({
                "status" : "failed",
                'message' : 'somthing went wrong'
            })
        }
    }catch(err){
        res.status(400).send({data:err.message});
    }
}

module.exports = {user_registration , user_login}
