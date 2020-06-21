const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const path = require('path');
const app = express()
app.use(express.static(__dirname + "/public"));

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        return console.log(err)
    }
    console.log("Đã kết nối tới database")
})

let videoList = [{
        link: "https://www.youtube.com/embed/SzLhtccBNX8",
        img: "https://yt3.ggpht.com/a/AATXAJwnPVFq5VPhoRybLDwPCG5WlKHe2ug3F68dSw=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Siêu Phẩm Hoạt Hình | Toàn Chức Cao Thủ - Tập 01 (Vietsub) | WeTV Vietnam",
        chanel: "WeTV VietNam",
        view: "416.624 lượt xem • Đã công chiếu vào 8 thg 9, 2019"
    },
    {
        link: "https://www.youtube.com/embed/bBY-UC8yrMs",
        img: "https://yt3.ggpht.com/a/AATXAJwnPVFq5VPhoRybLDwPCG5WlKHe2ug3F68dSw=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Siêu Phẩm Hoạt Hình | Toàn Chức Cao Thủ - Tập 02 (Vietsub) | WeTV Vietnam",
        chanel: "WeTV VietNam",
        view: "310.874 lượt xem • Đã công chiếu vào 8 thg 9, 2019"
    },
    {
        link: "https://www.youtube.com/embed/4WY-dsSUIFw",
        img: "https://yt3.ggpht.com/a/AATXAJwnPVFq5VPhoRybLDwPCG5WlKHe2ug3F68dSw=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Siêu Phẩm Hoạt Hình | Toàn Chức Cao Thủ - Tập 03 (Vietsub) | WeTV Vietnam",
        chanel: "WeTV VietNam",
        view: "207.123 lượt xem • Đã công chiếu vào 8 thg 9, 2019"
    },
    {
        link: "https://www.youtube.com/embed/ECSec6FMNas",
        img: "https://yt3.ggpht.com/a/AATXAJzgpSnTpBWgdKfjTYvak9yA6L8LzIr9FmjLgQ=s88-c-k-c0xffffffff-no-rj-mo",
        title: "|Toàn Chức Cao Thủ| Lạc Soa - Tiểu Hồn",
        chanel: "Băng Cơ Tư Mã",
        view: "83.217 lượt xem • Đã công chiếu vào 8 thg 9, 2019"
    },
    {
        link: "https://www.youtube.com/embed/47EWrBNmtHE",
        img: "https://yt3.ggpht.com/a/AATXAJz_WFZHE0evSiDgEPkUn-_MvYJGmMfOept2UA=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Trấn Hồn - Tập 1| Phim Trung Quốc Thuyết Minh Hay",
        chanel: "YoYo TeLeViSion VietSub",
        view: "1.641.582 lượt xem•10 thg 7, 2018"
    },
    {
        link: "https://www.youtube.com/embed/a702E7O7AGc",
        img: "https://yt3.ggpht.com/a/AATXAJw0S1o_ZByb2n6p1DFEfn7ZHhHhZaoSz2iARQ=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Phim Cổ Trang Trinh Thám Hay Nhất 2018 | Dạ Thiên Tử - Tập 01 | Thuyết Minh",
        chanel: "KUKAN Drama Vietnamese",
        view: "2.761.428 lượt xem•17 thg 11, 2018"
    },
    {
        link: "https://www.youtube.com/embed/b4fN8AVvMDg",
        img: "https://yt3.ggpht.com/a/AATXAJxXCvDt1Y0gegAxqAgmknv20gkPVZ55H8PVyw=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Long Quyền Tiểu Tử - Kung Fu Boys | Phim Võ Thuật Hành Động 2018| AFILM",
        chanel: "A FILM",
        view: "3.182.284 lượt xem•29 thg 4, 2018"
    },
    {
        link: "https://www.youtube.com/embed/5zU8htCuqW8",
        img: "https://yt3.ggpht.com/a/AATXAJyOvLRuFlg9psPYnR7uRTbNEJonq570SJLtQg=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Baki Vs Shunsei Kaku -Yujiro Proud of Baki 😊 -| Raitai tournament -| Baki 2020 !! Episode 1 (バキ 1 話)",
        chanel: "Chinda AMV ",
        view: "2.774.876 lượt xem•5 thg 6, 2020"
    },
]


app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

// app.use(express.static(__dirname));

// app.get("/", function(req, res) {
//     res.send("Hello from sever")
// })

// app.get("/about", function(req, res) {
//     res.send("<h1>This is the about function</h1>")
// })


app.get("/", function(req, res) {
    // console.log(__dirname)
    // res.sendFile(__dirname + "/index.html")
    res.render("index.ejs", { result: videoList })
})

app.post("/new-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    let newTodo = req.body;
    videoList.push(newTodo);
})

app.post("/delete-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    for (var i = 0; i < videoList.length; i++) {
        if (videoList[i].title === req.body.title) {
            videoList.splice(i, 1);
        }
    }
})

app.post("/fix-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    for (var i = 0; i < videoList.length; i++) {
        if (videoList[i].title === req.body.title) {
            videoList[i].title = req.body.newtitle
        }
        if (videoList[i].link === req.body.link) {
            videoList[i].link = req.body.newlink
        }
        if (videoList[i].img === req.body.img) {
            videoList[i].img = req.body.newimg
        }
        if (videoList[i].chanel === req.body.chanel) {
            videoList[i].chanel = req.body.newchanel
        }
        if (videoList[i].view === req.body.view) {
            videoList[i].view = req.body.newview
        }
    }
})




app.listen(3000, function() {
    console.log("Hello nodejs running on port 3000")
})