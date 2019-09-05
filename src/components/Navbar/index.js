import React from "react"
import { Link } from "gatsby"
import navStyles from "./nav.module.css"
class NavBar extends React.Component {
    state = {
        showMenu: false
    }
    render() {
        let navBar = [{
            name: "博客",
            link: "/"
        }, {
            name: "热榜",
            link: "/news"
        }, {
            name: "工具",
            link: "/tools"
        }, {
            name: "应用",
            link: "/apps"
        }, {
            name: "关于",
            link: "/about"
        }]
        return (
            <div>
                <h2 className={navStyles.logo}><Link style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `inherit`,
                }} to={"/"}>NODER</Link></h2>
                <nav >
                    {navBar.map((val, idx) => {
                        return (
                            <h2 key={idx} className={navStyles.navbtn}><Link style={{
                                boxShadow: `none`,
                                textDecoration: `none`,
                                color: `inherit`,
                            }} to={val.link}>{val.name}</Link></h2>
                        )
                    })}
                </nav>
                <ul>
                    <li style={{margin:0,cursor:"pointer"}} onClick={() => { this.setState({ showMenu: !this.state.showMenu }) }}>菜单</li>
                    {navBar.map((val, idx) => {
                        return (
                            <li style={{background:"#f1f1f1",margin:0,fontSize:20,textAlign:"center",borderBottom:"1px solid #e3e3e3"}} className={this.state.showMenu ? "" : navStyles.hide} key={idx}><Link style={{
                                boxShadow: `none`,
                                textDecoration: `none`,
                                color: `inherit`,
                            }} to={val.link}>{val.name}</Link></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default NavBar;
