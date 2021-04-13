module Elm.Center exposing
    ( markdown
    , styles
    )

import Element.Font as F
import Html exposing (..)
import Html.Attributes as Attr exposing (..)
import Markdown


markdown : String -> Html msg
markdown string =
    Markdown.toHtmlWith options [] string


styles : String -> List (Attribute msg)
styles width =
    [ style "display" "block"
    , style "max-width" width
    , style "margin" "0 auto"
    ]


options : Markdown.Options
options =
    { githubFlavored = Just { tables = False, breaks = False }
    , defaultHighlighting = Nothing
    , sanitize = False
    , smartypants = False
    }
