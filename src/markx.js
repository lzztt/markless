/*
markx syntax

Inline-blocks:

Bold *good* -inline
understore _goog_ -inline
strike ~goog~ -inline
code escape `text` -inline

link auto detection:
Link, just link -inline
Image, just image link -inline
YouTube, just youtube link –inline

inline style format:
[text style]
style: * _ ~ ` r/b/g r/b/g! link img

Header - inline
#
##
###

Font / background color - inline
[text r/b/g]
[text r/b/g!]
Color need to be dark for font, light for background

Texted Link
[text https://www.houstonbbs.com]

Blocks:
> backquotes – inline
> @author
> content

List
Just -, *, or number started -inline
at least to items to create a list
<space> indent: indent multiple line paragraphs within list block –inline


Escape:
---\ -inline, escape the next symbol charactor

link, with optional title
[text title http://url]
Image, with optional title
[text title /uri]


html:
   header
     1 line
   paragraph
     n lines
       1. process links, images
       2. process font format
   quote
     n lines
       1. process links, images
       2. process font format
   list
     n lines, n > 1
       1. process links, images
       2. process font format
*/

const markx = require('./processText.js')
module.exports = markx
