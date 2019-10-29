import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ToolsDay from "../components/ToolsDay"
class Tools extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="常用工具" />
        <div>
          <h3>常用工具：</h3>
        </div>
        <ToolsDay />
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
