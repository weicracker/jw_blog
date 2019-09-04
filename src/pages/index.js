import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import indexStyles from "./index.module.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(posts);
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="全部文章" />
        {/* <Bio /> */}
        <div style={{ width: '65%', display: 'inline-block' }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div className={indexStyles.postinfo} key={node.fields.slug}>
                <h3
                  className={indexStyles.postsTitle}
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <span className={indexStyles.date}><small>{node.frontmatter.date}</small></span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <div className={indexStyles.all_btn}>
                  <button><Link style={{ boxShadow: `none`,color:"#fff" }} to={node.fields.slug}>
                    阅读全部
                  </Link></button>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ width: '35%', display: 'inline-block' }}></div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM-DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
