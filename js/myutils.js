"use strict";
var defaulter = {
    downloadImage: function(e, dfas) {
        rm.hideRightMenu(),
        0 == rm.downloadimging ? (rm.downloadimging = !0,
        btf.snackbarShow("正在下载中，请稍后"),
        setTimeout(function() {
            var o = new Image;
            o.setAttribute("crossOrigin", "anonymous"),
            o.onload = function() {
                var e = document.createElement("canvas");
                e.width = o.width,
                e.height = o.height;
                e.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
                var e = e.toDataURL("image/png")
                  , t = document.createElement("a")
                  , n = new MouseEvent("click");
                t.download = dfas || "photo",
                t.href = e,
                t.dispatchEvent(n)
            }
            ,
            o.src = e,
            btf.snackbarShow("图片已添加盲水印，请遵守版权协议"),
            rm.downloadimging = !1
        }, "1")) : btf.snackbarShow("有正在进行中的下载，请稍后再试")
    },
    musicToggle: function() {
        var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        defaulter_musicFirst || (defaulter.musicBindEvent(),
        defaulter_musicFirst = !0);
        defaulter_musicPlaying ? (navMusicEl.classList.remove("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="defaulterfont defaulter-icon-play"></i><span>播放音乐</span>',
        document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停",
        document.querySelector("#consoleMusic").classList.remove("on"),
        defaulter_musicPlaying = !1,
        navMusicEl.classList.remove("stretch")) : (navMusicEl.classList.add("playing"),
        document.getElementById("menu-music-toggle").innerHTML = '<i class="defaulterfont defaulter-icon-pause"></i><span>暂停音乐</span>',
        document.querySelector("#consoleMusic").classList.add("on"),
        defaulter_musicPlaying = !0,
        navMusicEl.classList.add("stretch")),
        e && document.querySelector("#nav-music meting-js").aplayer.toggle(),
        rm.hideRightMenu()
    },
    musicTelescopic: function() {
        navMusicEl.classList.contains("stretch") ? navMusicEl.classList.remove("stretch") : navMusicEl.classList.add("stretch")
    },
    musicSkipBack: function() {
        navMusicEl.querySelector("meting-js").aplayer.skipBack(),
        rm.hideRightMenu()
    },
    musicSkipForward: function() {
        navMusicEl.querySelector("meting-js").aplayer.skipForward(),
        rm.hideRightMenu()
    },
    musicGetName: function() {
        return document.querySelector(".aplayer-title")['innerText']
    },
    darkModeStatus: function() {
        var e = "dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light"
          , t = document.querySelector(".menu-darkmode-text");
        t.textContent = "light" == e ? "深色模式" : "浅色模式"
    },
    initConsoleState: function() {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },
    rewardShowConsole: function() {
        consoleEl.classList.add("reward-show"),
        defaulter.initConsoleState()
    },
    hideConsole: function() {
        consoleEl.classList.contains("show") ? consoleEl.classList.remove("show") : consoleEl.classList.contains("reward-show") && consoleEl.classList.remove("reward-show")
    },
    cacheAndPlayMusic: function() {
        if (e = localStorage.getItem("musicData")) {
            var e = JSON.parse(e);
            if ((new Date).getTime() - e.timestamp < 864e5)
                return void defaulter.playMusic(e.songs)
        }
        fetch("/json/music.json").then(function(e) {
            return e.json()
        }).then(function(e) {
            var t = {
                timestamp: (new Date).getTime(),
                songs: e
            };
            localStorage.setItem("musicData", JSON.stringify(t)),
            defaulter.playMusic(e)
        })
    },
    playMusic: function(e) {
        var t = document.getElementById("anMusic-page").querySelector("meting-js").aplayer
          , n = e[Math.floor(Math.random() * e.length)]
          , o = t.list.audios;
        if (selectRandomSong.includes(n.name)) {
            for (var r, a = !1; !a; ) {
                var i = e[Math.floor(Math.random() * e.length)];
                if (selectRandomSong.includes(i.name) || (t.list.add([i]),
                t.list.switch(o.length),
                selectRandomSong.push(i.name),
                a = !0),
                selectRandomSong.length === e.length)
                    break
            }
            a || -1 != (r = o.findIndex(function(e) {
                return e.name === n.name
            })) && t.list.switch(r)
        } else
            t.list.add([n]),
            t.list.switch(o.length),
            selectRandomSong.push(n.name);
        console.info("已随机歌曲：", selectRandomSong, "本次随机歌曲：", n.name)
    },
    changeMusicBg: function() {
        var e, t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0], n = document.getElementById("an_music_bg");
        t ? (t = document.querySelector("#anMusic-page .aplayer-pic"),
        n.style.backgroundImage = t.style.backgroundImage) : e = setInterval(function() {
            document.querySelector("#anMusic-page .aplayer-pic") && (clearInterval(e),
            defaulter.addEventListenerMusic(),
            defaulter.changeMusicBg(),
            document.querySelector("#nav-music meting-js").aplayer && !document.querySelector("#nav-music meting-js").aplayer.audio.paused && defaulter.musicToggle())
        }, 100)
    },
    getCustomPlayList: function() {
        var e, t, n;
        window.location.pathname.startsWith("/music/") && (console.info(window.location.pathname),
        n = new URLSearchParams(window.location.search),
        e = document.getElementById("anMusic-page-meting"),
        n.get("id") && n.get("server") ? (t = n.get("id"),
        n = n.get("server"),
        e.innerHTML = '<meting-js id="'.concat(t, '" server=').concat(n, ' type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--defaulter-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>')) : e.innerHTML = '<meting-js id="'.concat("8152976493", '" server="').concat("netease", '" type="playlist" mutex="true" preload="auto" theme="var(--defaulter-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>'),
        defaulter.changeMusicBg(!1))
    },
    hideTodayCard: function() {
        document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
    },
    addEventListenerMusic: function() {
        var e = document.getElementById("anMusic-page")
          , t = e.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu")
          , n = e.querySelector("#anMusicBtnGetSong")
          , o = e.querySelector("#anMusicRefreshBtn")
          , r = e.querySelector("#anMusicSwitching")
          , a = e.querySelector("meting-js").aplayer;
        a.volume(.8, !0),
        a.on("loadeddata", function() {
            defaulter.changeMusicBg()
        }),
        t.addEventListener("click", function() {
            document.getElementById("menu-mask").style.display = "block",
            document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show"
        }),
        document.getElementById("menu-mask").addEventListener("click", function() {
            "/music/" == window.location.pathname && e.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")
        }),
        n.addEventListener("click", function() {
            var e, t;
            changeMusicListFlag ? (t = (e = document.getElementById("anMusic-page").querySelector("meting-js").aplayer).list.audios,
            t = Math.floor(Math.random() * t.length),
            e.list.switch(t)) : defaulter.cacheAndPlayMusic()
        }),
        o.addEventListener("click", function() {
            localStorage.removeItem("musicData"),
            defaulter.snackbarShow("已移除相关缓存歌曲")
        }),
        r.addEventListener("click", function() {
            defaulter.changeMusicList()
        }),
        document.addEventListener("keydown", function(e) {
            "Space" === e.code && (e.preventDefault(),
            a.toggle()),
            39 === e.keyCode && (e.preventDefault(),
            a.skipForward()),
            37 === e.keyCode && (e.preventDefault(),
            a.skipBack()),
            38 === e.keyCode && musicVolume <= 1 && (musicVolume += .1,
            a.volume(musicVolume, !0)),
            40 === e.keyCode && 0 <= musicVolume && (musicVolume += -.1,
            a.volume(musicVolume, !0))
        })
    },
    musicToggle: function (changePaly = true) {
        if (!anzhiyu_musicFirst) {
          musicBindEvent();
          anzhiyu_musicFirst = true;
        }
        let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此處可以更改為你想要顯示的文字
        let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但兩處均不建議更改
        if (anzhiyu_musicPlaying) {
          navMusicEl.classList.remove("playing");
          // 修改右鍵菜單文案為播放
          // document.getElementById("menu-music-toggle").innerHTML = msgPlay;
          document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
          // document.querySelector("#consoleMusic").classList.remove("on");
          anzhiyu_musicPlaying = false;
          navMusicEl.classList.remove("stretch");
        } else {
          navMusicEl.classList.add("playing");
          // 修改右鍵菜單文案為暂停
          // document.getElementById("menu-music-toggle").innerHTML = msgPause;
          // document.querySelector("#consoleMusic").classList.add("on");
          anzhiyu_musicPlaying = true;
          navMusicEl.classList.add("stretch");
        }
        if (changePaly){
            document.querySelector("#nav-music meting-js").aplayer.toggle();
            
            rm.hideRightMenu();
        };
      },
    addEventListenerConsoleMusicList: function() {
        var o = document.getElementById("nav-music");
        o && o.addEventListener("click", function(e) {
            var t = o.querySelector(".aplayer-list")
              , n = o.querySelector("div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg");
            e.target != n && t.classList.contains("aplayer-list-hide") && t.classList.remove("aplayer-list-hide")
        })
    }
};
