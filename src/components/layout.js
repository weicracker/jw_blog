import React from "react"
import { Link } from "gatsby"
import NavBar from "../components/Navbar";
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
    
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(35),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header className={layoutStyles.header}>
          <NavBar/>
        </header>
        <main style={{ overflow: "hidden", padding: 20 }}>{children}</main>
        <footer style={{ marginTop: 30 }}>
          © {new Date().getFullYear()}, 京ICP备17070286号-1
          {`  `}
        </footer>
      </div>
    )
  }
}

export default Layout
