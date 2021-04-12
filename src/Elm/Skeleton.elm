module Elm.Skeleton exposing
    ( Author
    , Date
    , Tab(..)
    , charityTitle
    , evan
    ,  footer
       --

    , header
    , michael
    , news
    , skeleton
    )

-- import Browser.Events as E
-- import Element.Events
-- import Element.Region as R
-- import Elm.Colors as C

import Browser
import Browser.Dom exposing (Element)
import Dict
import Element as E
import Element.Events
import Element.Font as F
import Html exposing (..)
import Html.Attributes exposing (..)



-- SKELETON


skeleton : String -> Tab -> List (Html msg) -> List (Html msg)
skeleton title tab content =
    [ header tab, div [ style "flex" "1" ] content, footer ]



-- HEADER


type Tab
    = Applications
    | News
    | FAQ
    | Other


charityTitle : Int -> E.Element msg
charityTitle size =
    E.el
        [ F.size size
        , E.alignTop
        , E.width E.fill
        ]
        (E.text "Charity CRM")


header : Tab -> Html msg
header tab =
    div [ class "nav" ]
        [ E.layout [] (charityTitle 30)
        , div [ class "tabs" ]
            [ viewTab tab Applications "Applications" "/applications"
            , viewTab tab News "News" "/docs"
            , viewTab tab FAQ "FAQ" "/faq"
            ]
        ]


viewTab : Tab -> Tab -> String -> String -> Html msg
viewTab currentTab targetTab name link =
    let
        attrs =
            if currentTab == targetTab then
                [ style "font-weight" "bold" ]

            else
                []
    in
    a (href link :: attrs) [ text name ]



-- FOOTER


footer : Html msg
footer =
    div [ class "footer" ]
        [ text " — © 2021 Charity CRM" ]



-- DOCS
-- HINT
-- NEWS


news : String -> String -> Author -> Date -> List (Html Never) -> List (Html Never)
news title subtitle author date body =
    skeleton title
        News
        [ div
            [ style "padding" "4em 0 1em"
            , style "text-align" "center"
            ]
            [ div [ style "font-size" "4em" ] [ text title ]
            , div [ style "font-size" "1.5em" ] [ text subtitle ]
            , div [ class "author" ]
                [ text "by "
                , a [ href author.url ] [ text author.name ]
                , text (" / " ++ dateToString date)
                ]
            ]
        , div [] body
        ]



-- AUTHORS


type alias Author =
    { name : String
    , url : String
    }


evan : Author
evan =
    { name = "Evan Czaplicki"
    , url = "https://twitter.com/evancz"
    }


michael : Author
michael =
    { name = "Michael James"
    , url = "http://github.com/michaelbjames"
    }



-- DATES


type alias Date =
    { year : Int
    , month : Int
    , day : Int
    }


dateToString : Date -> String
dateToString date =
    case Dict.get date.month months of
        Nothing ->
            String.fromInt date.year

        Just month ->
            String.fromInt date.day ++ " " ++ month ++ " " ++ String.fromInt date.year


months : Dict.Dict Int String
months =
    Dict.fromList
        [ ( 1, "Jan" )
        , ( 2, "Feb" )
        , ( 3, "Mar" )
        , ( 4, "Apr" )
        , ( 5, "May" )
        , ( 6, "June" )
        , ( 7, "July" )
        , ( 8, "Aug" )
        , ( 9, "Sep" )
        , ( 10, "Oct" )
        , ( 11, "Nov" )
        , ( 12, "Dec" )
        ]
