module Elm.Skeleton exposing
    ( Author
    , Date
    , Tab(..)
    , charityTitle
    , container
    , evan
    ,  footer
       --

    , header
    , michael
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
import Element.Events as Ev
import Element.Font as F
import Element.Region as R
import Elm.Colors as C
import Elm.Ui exposing (Link)
import Html exposing (..)
import Html.Attributes exposing (..)



-- SKELETON


skeleton : Tab -> List (E.Element msg) -> Html msg
skeleton tab content =
    container <|
        E.column
            [ E.width (E.maximum 700 E.fill)
            , E.centerX
            , E.paddingXY 20 20
            , E.spacing 60
            ]
            [ header tab
            , E.paragraph [ F.size 14, E.spacing 14 ] content
            , footer
            ]



-- HEADER


type Tab
    = Applications
    | NewsTab
    | FAQ
    | Other


charityTitle : Int -> E.Element msg
charityTitle size =
    E.el
        [ F.size size
        , E.alignTop
        , E.width E.fill

        -- , Ev.onClick (Navigate "index")
        ]
        (E.text "Charity CRM")


container : E.Element msg -> Html msg
container =
    E.layout
        [ E.width E.fill
        , F.family [ F.typeface "IBM Plex Sans", F.sansSerif ]
        ]


header : Tab -> E.Element msg
header tab =
    E.row
        [ E.width E.fill
        , E.spaceEvenly
        , E.centerX
        , F.size 14
        ]
        [ charityTitle 20
        , E.row
            [ E.width E.fill
            , E.alignRight
            , E.spacing 20
            , R.navigation
            ]
            (headerTabs tab)
        ]


headerTabs : Tab -> List (E.Element msg)
headerTabs tab =
    [ viewTab tab FAQ "FAQ" "/faq"

    ---, viewTab tab Applications "Applications" "/applications"
    ---, viewTab tab NewsTab "News" "/news/public"
    ]


viewTab : Tab -> Tab -> String -> String -> E.Element msg
viewTab currentTab targetTab name link =
    let
        attrs =
            if currentTab == targetTab then
                [ F.bold ]

            else
                []
    in
    E.link (F.color C.darkBlue :: attrs) { url = link, label = E.text name }



-- FOOTER


footer : E.Element msg
footer =
    E.row
        [ E.centerX
        , E.spacing 20
        , E.paddingEach { top = 20, bottom = 20, left = 0, right = 0 }
        , F.size 14
        , F.color C.darkGray
        , R.footer
        ]
    <|
        List.map Elm.Ui.grayLink sources
            ++ [ E.text "© 2021 Charity CRM" ]


sources : List Link
sources =
    [ Link "Facebook" "", Link "Instagram" "" ]



-- DOCS
-- HINT
-- NEWS
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
