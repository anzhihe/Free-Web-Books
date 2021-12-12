const Koa = require('koa' );
const Router = require('koa-router' );
const bodyParser = require('koa-body');
var cors = require('koa-cors');
var fs = require('fs');
var port = 3000;

const app = new Koa();

app.use(bodyParser());
app.use(cors());

var router = new Router();

router.get( '/tearcher', (ctx, next) => {//查询数据

    let dataJson = fs.readFileSync('./mockData/tearcher.json').toString();
    let tearcher = JSON.parse(dataJson);

    var pageFn = function(pageSize, pageCount, arr) {
        var num = (pageCount - 1) * pageSize;
        var newArr = (num + pageSize >= arr.length) ? arr.slice(num, arr.length) : arr.slice(num, num + pageSize);
        return newArr;
    }

    var query = ctx.request.query;
    var data = [];
    if(!query.pageCount || !query.pageSize){
        ctx.body = {
            dataInfo:tearcher,
            total:tearcher.length            
        }
    }else{
        var pageSize = Number(query.pageSize);
        var pageCount = Number(query.pageCount);
        data = {
            dataInfo:pageFn(pageSize,pageCount,tearcher),
            total:tearcher.length
        }
        ctx.body = data;        
    }
    
});

router.get( '/tearcher/:id', (ctx, next) => {//查询数据

    let dataJson = fs.readFileSync('./mockData/tearcher.json').toString();
    let tearcher = JSON.parse(dataJson);

    var id = ctx.params.id;
    var data = tearcher.filter((item) => {
        return item.id == id;
    });
    ctx.body = data;
});

router.post( '/tearcher/add', (ctx, next) => {//增加数据

    var setJson = function(){
        fs.readFile('./mockData/tearcher.json',function(error,data){
            var dataInfo = data.toString();
            var params = JSON.parse(ctx.request.body);
            dataInfo = JSON.parse(dataInfo);
            params['id'] = dataInfo.length + 1;
            dataInfo.push(params);
            var str = JSON.stringify(dataInfo);
            fs.writeFile('./mockData/tearcher.json',str,function(error){
                if(!error){
                    console.log('添加成功');
                }
              
            })
        });
    }

    setJson();
    ctx.body = {
        msg:'添加成功',
        code:200
    };  

});

router.put( '/tearcher/edit', (ctx, next) => {//修改数据

    var setJson = function(params){
        fs.readFile('./mockData/tearcher.json',function(error,data){
            var dataInfo = data.toString();
            var option = JSON.parse(params);
            dataInfo = JSON.parse(dataInfo);
            dataInfo = dataInfo.map((item) => {
                if(item.id == option.id){
                    item = option;
                }
                return item;
            });
            var str = JSON.stringify(dataInfo);
            fs.writeFile('./mockData/tearcher.json',str,function(error){
                if(!error){
                    console.log('修改成功');
                }
              
            });
        });
    }

    var body = ctx.request.body;                
    setJson(body);
    ctx.body = {
        msg:'修改成功',
        code:200
    };  

});

router.delete( '/tearcher/delete/:id', (ctx, next) => {//删除数据

    let dataJson = fs.readFileSync('./mockData/tearcher.json').toString();
    let tearcher = JSON.parse(dataJson);
    var id = ctx.params.id;
    tearcher.map((item,index) => {
        if(item.id == id){
            tearcher.splice(index,1);
        }
    });

    var str = JSON.stringify(tearcher);
    fs.writeFile('./mockData/tearcher.json',str,function(error){
        if(!error){
            console.log('删除成功');
        }
      
    });

    ctx.body = {
        msg:'删除成功',
        code:200
    };

});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port,function(){
    console.log('模拟接口服务启动成功，运行地址为' + 'http://localhost:'+ port +'/');
});