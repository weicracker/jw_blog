import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
class News extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <div>1111</div>
            </Layout>
        )
    }
}
export default News;
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
