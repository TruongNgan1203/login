const User = require("../../models/users");
var passwordHash = require('password-hash');


module.exports = function(app){

    app.post("/sign-up", function(req,res){
        var username= req.body.username;
        var password= req.body.password;
        var name= req.body.name;
        var age= req.body.age;
        var address= req.body.address;
        var passwordhash = passwordHash.generate(password);
        console.log("passwordhash:", passwordhash);


    User.create({username, password: passwordhash, name, age, address})
        .then(()=> res.render("login"))
        .catch((err)=> res.send(err));
    })


    app.post("/signin", function(req,res){
        const {username, password} = req.body;
        
        User.findOne({username})
        .then((user)=> {
            if(!user){
                console.log('User not found!')
                res.send('Không tìm thấy User!!!')
            }
            
            if(!(passwordHash.verify(password,user.password))){
                console.log('Invalid password!')
                res.send('Sai mật khẩu!!!')
            } else{
                res.send(`Xin chào ${user.name}`)
            }  
        })
        .catch((err)=>console.log(err));

    })


    app.delete("/user", function(req,res){
        User.remove({_id: req.body.id})
        .then(()=>res.send("Xóa thành công!!!"))
        .catch((err)=>res.send(err))
    })
}