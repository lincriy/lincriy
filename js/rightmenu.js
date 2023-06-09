myiniter = function() {
    
rm = {};
selectTextNow = "";


    
// 初始化函数


//禁止图片拖拽
imgElements = document.getElementsByTagName("img");
for (let i = 0; i < imgElements.length; i++) {
    imgElements[i].ondragstart = function(event) {
        event.preventDefault();
    };
}

// 显示菜单
rm.showRightMenu = function(isTrue, x=0, y=0) {
    let rightMenu = document.getElementById("rightMenu");
    rightMenu.style.top = x + "px";
    rightMenu.style.left = y + "px";
    if (isTrue) {
        rightMenu.style.display = "block";
        stopMaskScroll();
    } else {
        rightMenu.style.display = "none";
    }
}
;

// 隐藏菜单
rm.hideRightMenu = function() {
    rm.showRightMenu(false);
    let rightMenuMask = document.querySelector("#rightmenu-mask");
    rightMenuMask.style.display = "none";
}
;



// 重新定义尺寸
rm.reloadrmSize = function() {
    rightMenu.style.visibility = "hidden";
    rightMenu.style.display = "block";
    // 获取宽度和高度
// 尺寸
    rmWidth = document.getElementById("rightMenu").offsetWidth;
    rmHeight = document.getElementById("rightMenu").offsetHeight;
    rightMenu.style.visibility = "visible";
}
;

// 获取点击的href
domhref = "";
domImgSrc = "";
globalEvent = null;

// 监听右键初始化
window.oncontextmenu = function(event) {
    if (document.body.clientWidth > 768) {
        let pageX = event.clientX + 10;
        //加10是为了防止显示时鼠标遮在菜单上
        let pageY = event.clientY;
        // 尺寸
        rmWidth = document.getElementById("rightMenu").offsetWidth;
        rmHeight = document.getElementById("rightMenu").offsetHeight;
        //其他额外菜单
        const $rightMenuOther = document.querySelector(".rightMenuOther");
        const $rightMenuPlugin = document.querySelector(".rightMenuPlugin");
        const $rightMenuCopyText = document.querySelector("#menu-copytext");
        const $rightMenuPasteText = document.querySelector("#menu-pastetext");
        const $rightMenuNewWindow = document.querySelector("#menu-newwindow");
        const $rightMenuNewWindowImg = document.querySelector("#menu-newwindowimg");
        const $rightMenuCopyLink = document.querySelector("#menu-copylink");
        const $rightMenuCopyImg = document.querySelector("#menu-copyimg");
        const $rightMenuDownloadImg = document.querySelector("#menu-downloadimg");
        const $rightMenuSearchBaidu = document.querySelector("#menu-searchBing");
        const $rightMenuMusicToggle = document.querySelector("#menu-music-toggle");
        const $rightMenuMusicBack = document.querySelector("#menu-music-back");
        const $rightMenuMusicForward = document.querySelector("#menu-music-forward");
        const $rightMenuMusicPlaylist = document.querySelector("#menu-music-playlist");
        const $rightMenuMusicCopyMusicName = document.querySelector("#menu-music-copyMusicName");

        let href = event.target.href;
        let imgsrc = event.target.currentSrc;

        // 判断模式 扩展模式为有事件
        let pluginMode = false;
        $rightMenuOther.style.display = "block";
        globalEvent = event;
        
        
        $rightMenuMusicToggle.style.display = "block";
        // 检查是否需要复制 是否有选中文本
        if (window.getSelection().toString()) {
            selectTextNow = window.getSelection().toString();
            pluginMode = true;
            $rightMenuCopyText.style.display = "block";
            $rightMenuSearchBaidu.style.display = "block";
        } else {
            $rightMenuCopyText.style.display = "none";
            $rightMenuSearchBaidu.style.display = "none";
        }

        //检查是否右键点击了链接a标签
        if (href) {
            pluginMode = true;
            $rightMenuNewWindow.style.display = "block";
            $rightMenuCopyLink.style.display = "block";
            domhref = href;
        } else {
            $rightMenuNewWindow.style.display = "none";
            $rightMenuCopyLink.style.display = "none";
        }

        //检查是否需要复制图片
        if (imgsrc) {
            pluginMode = true;
            $rightMenuCopyImg.style.display = "block";
            $rightMenuDownloadImg.style.display = "block";
            $rightMenuNewWindowImg.style.display = "block";
            document.getElementById("rightMenu").style.width = "12rem"
            domImgSrc = imgsrc;
        } else {
            $rightMenuCopyImg.style.display = "none";
            $rightMenuDownloadImg.style.display = "none";
            $rightMenuNewWindowImg.style.display = "none";
        }

        // 判断是否为输入框
        if (event.target.tagName.toLowerCase() === "input" || event.target.tagName.toLowerCase() === "textarea") {
            pluginMode = true;
            $rightMenuPasteText.style.display = "block";
        } else {
            $rightMenuPasteText.style.display = "none";
        }
        const navMusicEl = document.querySelector("#nav-music");
        //判断是否是音乐
        if (navMusicEl && navMusicEl.contains(event.target)) {
            pluginMode = true;
            $rightMenuMusicBack.style.display = "block";
            $rightMenuMusicForward.style.display = "block";
            $rightMenuMusicPlaylist.style.display = "block";
            $rightMenuMusicCopyMusicName.style.display = "block";
        } else {
            $rightMenuMusicBack.style.display = "none";
            $rightMenuMusicForward.style.display = "none";
            $rightMenuMusicPlaylist.style.display = "none";
            $rightMenuMusicCopyMusicName.style.display = "none";
        }

        // 如果不是扩展模式则隐藏扩展模块
        if (pluginMode) {
            $rightMenuOther.style.display = "none";
            $rightMenuPlugin.style.display = "block";
        }
        $rightMenuMusicToggle.style.display = "block";

        rm.reloadrmSize();

        // 鼠标默认显示在鼠标右下方，当鼠标靠右或靠下时，将菜单显示在鼠标左方\上方
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }

        rm.showRightMenu(true, pageY, pageX);
        document.getElementById("rightmenu-mask").style.display = "flex";
        return false;
    }
}
;

// 下载图片状态
rm.downloadimging = false;

// 复制图片到剪贴板
rm.writeClipImg = function(imgsrc) {
    rm.hideRightMenu();
    btf.snackbarShow("正在下载中，请稍后");
    if (rm.downloadimging == false) {
        rm.downloadimging = true;
        setTimeout(function() {
            copyImage(imgsrc);
            btf.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = false;
        }, "1");
    }
}
;

function imageToBlob(imageURL) {
    const img = new Image();
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    img.crossOrigin = "";
    img.src = imageURL;
    return new Promise(resolve=>{
        img.onload = function() {
            c.width = this.naturalWidth;
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);
            c.toBlob(blob=>{
                // here the image is a blob
                resolve(blob);
            }
            , "image/png", 0.75);
        }
        ;
    }
    );
}

async function copyImage(imageURL) {
    const blob = await imageToBlob(imageURL);
    const item = new ClipboardItem({
        "image/png": blob
    });
    navigator.clipboard.write([item]);
}

rm.switchDarkMode = function() {
    // Switch Between Light And Dark Mode
    const nowMode = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    if (nowMode === "light") {
        document.styleSheets[0].insertRule('#page-header::before { background-color: rgba(55,55,55,0.7) !important }', 0);
        activateDarkMode();
        saveToLocal.set("theme", "dark", 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        document.querySelector(".menu-darkmode-text").textContent = "浅色模式";
    } else {
        activateLightMode();
        saveToLocal.set("theme", "light", 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
        document.querySelector(".menu-darkmode-text").textContent = "深色模式";
    }
    // handle some cases
    typeof runMermaid === "function" && window.runMermaid();
    rm.hideRightMenu();
    defaulter.darkModeStatus();
}
;

rm.copyUrl = function(id) {
    const input = document.createElement("input");
    // Create a new <input> element
    input.id = "copyVal";
    // Set the id of the new element to "copyVal"
    document.body.appendChild(input);
    // Append the new element to the end of the <body> element

    const text = id;
    input.value = text;
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand("copy");

    input.remove();
    // Remove the <input> element from the DOM
}
;

function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        let xscroll = document.getElementById("rightmenu-mask");
        xscroll.onmousewheel = function(e) {
            //阻止浏览器默认方法
            rm.hideRightMenu();
            // e.preventDefault();
        }, false;
    }
    if (document.getElementById("rightMenu")) {
        let xscroll = document.getElementById("rightMenu");
        xscroll.onmousewheel = function(e) {
            //阻止浏览器默认方法
            rm.hideRightMenu();
            // e.preventDefault();
        }, false;
    }
}

rm.rightmenuCopyText = async function(txt) {
    // await navigator.permissions.request({ name: 'clipboard-write' });
    await navigator.clipboard.writeText(txt);
    btf.snackbarShow("复制成功，快去粘贴吧！");

    rm.hideRightMenu();
}
;

rm.copyPageUrl = function() {
    var url = window.location.href;
    rm.copyUrl(url);
    btf.snackbarShow("复制本页链接地址成功");
    rm.hideRightMenu();
}
;

rm.sharePage = function() {
    var content = window.location.href;
    rm.copyUrl(url);
    btf.snackbarShow("复制本页链接地址成功");
    rm.hideRightMenu();
};



// 读取剪切板
rm.readClipboard = function() {
    if (navigator.clipboard) {
        navigator.clipboard.readText().then(clipText=>rm.insertAtCaret(globalEvent.target, clipText));
    }
}
;

// 百度搜索
rm.searchBaidu = function() {
    btf.snackbarShow("即将跳转到Bing搜索");
    setTimeout(function() {
        window.open("https://www.bing.com/search?q=" + selectTextNow);
    }, "1");
    rm.hideRightMenu();
}
;

//分享链接
rm.copyLink = function() {
    try{
    rm.rightmenuCopyText(domhref);
     btf.snackbarShow("已复制链接地址");
} catch (err) {
    btf.snackbarShow("复制失败，没有权限！");
}
   
}
;

function addRightMenuClickEvent() {
    // 添加点击事件
    document.getElementById("menu-backward").onclick= function() {
        window.history.back();
        rm.hideRightMenu();
    };

    document.getElementById("menu-forward").onclick= function() {
        window.history.forward();
        rm.hideRightMenu();
    };

    document.getElementById("menu-refresh").onclick= function() {
        window.location.reload();
    };

    document.getElementById("menu-top").onclick= function() {
        defaulter.scrollToDest(0, 500);
        rm.hideRightMenu();
    };

    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach(function(link) {
        link.onclick = rm.hideRightMenu;
    });

    document.getElementById("menu-darkmode").onclick = rm.switchDarkMode;

    document.getElementById("menu-home") && (document.getElementById("menu-home").onclick = function() {
        window.location.href = window.location.origin;
    });

    document.getElementById("rightmenu-mask").onclick = rm.hideRightMenu;

    document.getElementById("rightmenu-mask").oncontextmenu = function(event) {
        rm.hideRightMenu();
        event.preventDefault();
        // Prevent the default context menu from appearing
    };

    document.getElementById("menu-copy").onclick = rm.copyPageUrl;

    document.getElementById("menu-pastetext").onclick =  rm.pasteText;

    document.getElementById("menu-copytext").onclick= function() {
        try{
        rm.rightmenuCopyText(selectTextNow);
        btf.snackbarShow("复制成功，快去粘贴吧！");
    } catch (err) {
        btf.snackbarShow("复制失败，没有权限！");
    }
    };

    document.getElementById("menu-newwindow").onclick= function() {
        window.open(domhref);
        rm.hideRightMenu();
    };

    document.getElementById("menu-copylink").onclick =  rm.copyLink;

    document.getElementById("menu-downloadimg").onclick= function() {
        defaulter.downloadImage(domImgSrc);
    };

    document.getElementById("menu-newwindowimg").onclick= function() {
        window.open(domImgSrc);
        rm.hideRightMenu();
    };

    document.getElementById("menu-copyimg").onclick= function() {
        rm.writeClipImg(domImgSrc);
    };

    document.getElementById("menu-searchBing").onclick =  rm.searchBaidu;

    //音乐
    document.getElementById("menu-music-toggle").onclick =  defaulter.musicToggle;

    document.getElementById("menu-music-back").onclick =  defaulter.musicSkipBack;

    document.getElementById("menu-music-forward").onclick =  defaulter.musicSkipForward;

    document.getElementById("menu-music-copyMusicName").onclick= function() {
        try{
        rm.rightmenuCopyText(defaulter.musicGetName());
        btf.snackbarShow("复制歌曲名称成功");
    } catch (err) {
        btf.snackbarShow("复制失败，没有权限！");
    }
    };



}

GLOBAL_CONFIG.Snackbar.position = "bottom-center"




// 获取<body>元素
bodyElement = document.body;

// 获取用于控制动效的按钮
controlButton = document.getElementById("menu-css-stop");
toggleButton = document.getElementById("menu-css-toggle");
// 定义一个函数，用于更新按钮的文本
function updateButtonText() {
    if (bodyElement.classList.contains("no-animation")) {
        toggleButton.textContent = "开启所有动效";
        btf.snackbarShow("系统设置：已暂停所有动效");
    } else {
        toggleButton.textContent = "暂停所有动效";
    }
}

// 切换<body>元素的no-animation类
document.body.classList.remove("no-animation");
// 更新按钮的文本
updateButtonText();

// 为按钮添加点击事件监听器
controlButton.onclick= function() {
    // 切换<body>元素的no-animation类
    bodyElement.classList.toggle("no-animation");
    // 更新按钮的文本
    updateButtonText();
    rm.hideRightMenu();
};

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    
    // 当前设备是移动设备
    if (!bodyElement.classList.contains("no-animation")){
        setTimeout(() => {
            // 切换<body>元素的no-animation类
            bodyElement.classList.toggle("no-animation");
            // 更新按钮的文本
            btf.snackbarShow("省电助手：已暂停所有动效");
        }, 5000);
    }
}

addRightMenuClickEvent();

}

$(function () {
    myiniter()
})