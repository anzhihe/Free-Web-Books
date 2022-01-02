interface IVideo{
    play():void;
}

interface IMusic{
    listen():void;
}

class Phone implements IVideo,IMusic{
    play(){
        console.log('手机播放视频');
    }
    listen(){
        console.log('手机播放音乐');
    }
}

class HuaweiPhone extends Phone implements IVideo{
    play(){
        console.log('华为手机播放视频');
    }
}

class Notebook implements IVideo{
    play(){
        console.log('笔记本播放视频');
    }
}

let p1 = new Phone();
let h1 = new HuaweiPhone();
let n1 = new Notebook();
p1.play();
p1.listen();
h1.play();
n1.play();
