/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div
      style={{
        display: `flex`,
        margin: "40px 20px",
        padding: '10px 10px 0 20px',
        borderRadius: 3,
        border: "1px solid #ecd8d8",
        boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)"
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        作者 <strong>{author}</strong>
        <br />
        <small>{`在北京工作中. `}</small>
        <br />
        <small>专注前端技术分享. </small>
        <br />
        <small><a href={`https://github.com/${social.github}`}>GITHUB</a></small>
      </p>
    </div>
  )
}

export default Bio
