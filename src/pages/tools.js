import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
class Tools extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <div>常用工具：如 正则在线验证等</div>
            </Layout>
        )
    }
}
export default Tools;
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
