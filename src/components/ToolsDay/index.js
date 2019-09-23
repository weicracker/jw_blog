
import React, { Component } from 'react';
import toolsdayStyle from "./toolsday.module.css";
const toolList = [
    {
        img: "https://i.loli.net/2019/09/23/wkop7jcPWlCKbzt.jpg",
        name: "linux命令行",
        title: "linux命令行搜索",
        desc: "linux命令行搜索服务，支持检索各种命令行含义",
        link: "https://git.io/linux"
    },
    {
        img: "https://i.loli.net/2019/09/23/gldpPOZK4vwQCe8.jpg",
        name: "js/css/html压缩",
        title: "在线JS/CSS/HTML压缩",
        desc: "在线JS/CSS/HTML压缩(采用YUI Compressor实现)",
        link: "http://tool.oschina.net/jscompress/"
    },
    {
        img: "https://i.loli.net/2019/09/23/BnHTlc3DtXoPbFL.jpg",
        name: "正则表达式",
        title: "在线正则表达式测试",
        desc: "在线正则表达式测试，测试编写正则表达式",
        link: "http://tool.oschina.net/regex/"
    },
    {
        img: "https://i.loli.net/2019/09/23/iY1Bm94haSsUodD.jpg",
        name: "CSS渐变色",
        title: "渐变色CSS代码生成",
        desc: "Ultimate CSS Gradient Generator",
        link: "https://www.colorzilla.com/gradient-editor/"
    },
    {
        img: "https://i.loli.net/2019/09/23/iSxH5mR6qOtTh21.jpg",
        name: "DownGit",
        title: "github文件夹下载",
        desc: "github文件夹在线免费下载",
        link: "https://minhaskamal.github.io/DownGit/#/home"
    },
    {
        img: "https://i.loli.net/2019/09/23/ZpjTePBHUXJhlgt.jpg",
        name: "在线工具集",
        title: "MikuTools - 工具集合",
        desc: "MikuTools - 一个轻量的工具集合",
        link: "https://miku.tools/"
    },
    {
        img: "https://i.loli.net/2019/09/23/6jhe5DpHvqbYiC2.jpg",
        name: "51PPT模板",
        title: "免费PPT模板",
        desc: "免费PPT模板服务,PPT模板免费下载",
        link: "http://www.51pptmoban.com/"
    },
    {
        img: "https://i.loli.net/2019/09/23/jZ8sEJ9HCeqWlgN.jpg",
        name: "BootCDN",
        title: "BootCDN",
        desc: "稳定、快速、免费的前端开源项目 CDN 加速服务",
        link: "https://www.bootcdn.cn/"
    },
    {
        img: "https://i.loli.net/2019/09/23/ML52Tnzp4VUtD97.jpg",
        name: "易码",
        title: "易码短信验证码接收平台",
        desc: "网赚用户批量接收验证码，注册帐号",
        link: "http://www.51ym.me"
    },
    {
        img: "https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.3/dist/img/websafecolors.png",
        name: "Web Safe Colors",
        title: "Web 安全色",
        desc: "本表中列出的是 WEB 设计、开发中常用安全色。列于此是为了方便大家参考。",
        link: "https://www.bootcss.com/p/websafecolors/"
    },
    {
        img: "https://i.loli.net/2019/09/23/xgrMZP8TfhACeqp.jpg",
        name: "easyicon",
        title: "免费精美图标",
        desc: "免费精美图标ICON、PNG、JPG、GIF、ICO等等",
        link: "https://www.easyicon.net/"
    },
    {
        img: "https://i.loli.net/2019/09/23/YdBHGN6a2yQsn4U.jpg",
        name: "Html/MarkDown",
        title: "Html/MarkDown互转工具",
        desc: "在线html标签直接markdown标记语言",
        link: "http://www.bejson.com/convert/html2markdown/"
    },
]
class ToolsDay extends Component {
    render() {
        return (
            <div className="row">
                {
                    toolList.map((val, idx) => {
                        return (
                            <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                                <div className={toolsdayStyle.thumbnail} style={{ height: 280 }}>
                                    <a href={val.link} title={val.title} target="__blank">
                                        <img className="lazy" width="300" height="130" src={val.img} alt={val.title} />
                                    </a>
                                    <div className={toolsdayStyle.caption}>
                                        <a className={toolsdayStyle.title} href={val.link} title={val.title} target="__blank">{val.name}
                                            <br />
                                            <small>{val.title}</small>
                                        </a>
                                        <br />
                                        <small>{val.desc}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
ToolsDay.propTypes = {
}
export default ToolsDay;
