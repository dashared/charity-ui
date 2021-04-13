module Elm.Ui exposing (..)

import Element as E exposing (Attribute, Element)
import Element.Background as B
import Element.Border as Bo
import Element.Events
import Element.Font as F
import Elm.Colors as C
import Html
import Html.Attributes



--- LINK


type alias Link =
    { title : String
    , url : String
    }


link : List (Attribute msg) -> Link -> Element msg
link attrs config =
    E.el ([ F.color C.darkBlue, E.pointer ] ++ attrs) (E.text config.title)


grayLink : Link -> Element msg
grayLink config =
    E.link [ F.color C.darkGray ]
        { url = config.url
        , label = E.text config.title
        }



--- HEADINGS


h1 : List String -> E.Element msg
h1 contents =
    E.html <|
        Html.h1
            [ Html.Attributes.style "font-size" "inherit"
            , Html.Attributes.style "margin" "0"
            ]
            (List.map Html.text contents |> List.intersperse (Html.br [] []))


h2 : String -> E.Element msg
h2 content =
    E.html <|
        Html.h2
            [ Html.Attributes.style "font-size" "inherit"
            , Html.Attributes.style "margin" "0"
            ]
            [ Html.text content ]


linkButton : String -> List (Attribute msg) -> E.Element msg
linkButton label events =
    let
        styles =
            [ E.padding 10
            , E.width (E.maximum 400 E.fill)
            , E.centerX
            , F.center
            , B.color C.white
            , Bo.color C.blue
            , Bo.width 2
            , Bo.solid
            , Bo.shadow
                { offset = ( 5, 5 )
                , size = 1
                , blur = 0
                , color = C.blue
                }
            , E.mouseOver pressed
            , E.mouseDown pressed
            , E.focused pressed
            ]

        pressed =
            [ E.moveDown 3
            , E.moveRight 3
            , Bo.shadow
                { offset = ( 2, 2 )
                , size = 1
                , blur = 0
                , color = C.blue
                }
            ]
    in
    E.el (styles ++ events ++ [ E.htmlAttribute (Html.Attributes.class "special-button") ]) (E.text label)
