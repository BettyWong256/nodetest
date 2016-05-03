/**
 * Created by wangkun12 on 2016/4/21.
 */

module.exports = {
    user:{
        name:{type:String,required:true},
        password:{type:String,required:true},
        salt:{type:String,required:true},
        create_time:{type:Date,required:true},
        last_login_time:{type:Date,required:false},
        last_login_ip:{type:String,required:false},
    },
    file:{
        user_name:{type:String,required:true},
        file_name:{type:String,required:true},
        file_time:{type:Date,required:true},
        graph_data:{type:Array},
        div_data:{type:Array}
    }
};