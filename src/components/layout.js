import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import layoutStyles from "./layout.module.css"
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    let navBar = [{
      name: "博客",
      link: "/"
    }, {
      name: "热点",
      link: "/news"
    }, {
      name: "导航",
      link: "/navigation"
    }, {
      name: "应用",
      link: "/apps"
    }, {
      name: "关于",
      link: "/about"
    }]
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(35),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {/* <header>{header}</header> */}
        <header>
          <h2 className={layoutStyles.logo}><Link style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }} to={"/"}>NODER</Link></h2>
          <nav>
            {navBar.map((val, idx) => {
              return (
                <h2 key={idx} className={layoutStyles.navbtn}><Link style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }} to={val.link}>{val.name}</Link></h2>
              )
            })}
          </nav>
        </header>
        <main style={{overflow:"hidden",padding:20}}>{children}</main>
        <footer style={{marginTop:30}}>
          © {new Date().getFullYear()}, 京ICP备17070286号-1
          {`  `}
        </footer>
      </div>
    )
  }
}

export default Layout
