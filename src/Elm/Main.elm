port module Elm.Main exposing (..)

import Browser
import Browser.Dom exposing (Element)
import Browser.Events as E
import Element as E
import Element.Events
import Element.Font as F
import Element.Region as R
import Elm.Skeleton exposing (charityTitle, container)
import Elm.Ui exposing (Link)
import Html exposing (..)
import Html.Attributes exposing (..)



-- MAIN


main : Program { width : Int, height : Int } Model Msg
main =
    Browser.element
        { init = \flags -> init flags
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    { window : { width : Int, height : Int }
    , title : String
    }


init : { width : Int, height : Int } -> ( Model, Cmd Msg )
init window =
    ( Model window "", Cmd.none )


port clickedUrl : String -> Cmd msg



-- UPDATE


type Msg
    = OnResize Int Int
    | Navigate String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnResize width height ->
            ( { model | window = { width = width, height = height } }, Cmd.none )

        Navigate url ->
            ( model, clickedUrl url )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ E.onResize OnResize ]



-- VIEW


toplevel : List Link
toplevel =
    [ Link "FAQ" "fund:faq-index"
    , Link "Fund" "fund:description"

    ---, Link "News" "news:public"
    ]


view : Model -> Html Msg
view model =
    if model.window.width > 750 then
        viewMedium model

    else
        viewSmall model


viewMedium : Model -> Html Msg
viewMedium model =
    let
        viewFeature feature =
            E.column
                [ E.width E.fill
                , E.spacing 40
                ]
                [ featureText feature
                , featureImage feature
                ]
    in
    container <|
        E.column
            [ E.width (E.maximum 700 E.fill)
            , E.centerX
            , E.paddingXY 20 0
            , E.spacing 60
            ]
            [ E.row
                [ E.width E.fill
                , E.spaceEvenly
                , E.centerX
                , F.size 14
                , E.paddingXY 0 20
                ]
                [ charityTitle 30
                , E.row
                    [ E.width E.fill
                    , E.alignRight
                    , E.spacing 20
                    , R.navigation
                    ]
                    (List.map (\link -> Elm.Ui.link [ E.alignRight, Element.Events.onClick (Navigate link.url) ] link) toplevel)
                ]
            , E.row
                [ E.width E.fill ]
                [ E.el
                    [ E.width E.fill
                    , E.moveLeft 50
                    ]
                    (E.image [ E.width (E.maximum 400 E.fill) ] { src = "logo.svg", description = "Charity CRM logo" })
                , E.column
                    [ E.width E.fill
                    , E.centerX
                    , E.centerY
                    , E.spacing 40
                    ]
                    [ movingText model
                    , E.column
                        [ E.width E.fill
                        , E.centerX
                        , E.centerY
                        , E.spacing 25
                        ]
                        [ descriptionText model
                        , E.column
                            [ E.width E.fill
                            , E.centerX
                            , E.centerY
                            , E.spacing 15
                            ]
                            [ authButton
                            , smallDescriptionText
                            ]
                        ]
                    ]
                ]
            , E.column
                [ E.width E.fill
                , E.spacing 50
                , E.paddingEach { top = 0, bottom = 20, left = 0, right = 0 }
                , R.mainContent
                ]
              <|
                List.map viewFeature features
            , Elm.Skeleton.footer
            ]


viewSmall : Model -> Html Msg
viewSmall model =
    let
        viewFeature feature =
            E.column
                [ E.width E.fill
                , E.spacing 20
                ]
                [ featureText feature
                , featureImage feature
                ]
    in
    container <|
        E.column
            [ E.width (E.maximum 700 E.fill)
            , E.centerX
            , E.paddingXY 20 0
            , E.spacing 25
            ]
            [ E.row
                [ E.width E.fill
                , E.spaceEvenly
                , E.centerX
                , F.size 14
                , E.paddingXY 0 20
                , R.navigation
                ]
                (charityTitle 20 :: List.map (\link -> Elm.Ui.link [ E.paddingXY 5 0, F.size 13, Element.Events.onClick (Navigate link.url) ] link) toplevel)
            , E.row
                [ E.width E.fill ]
                [ E.el
                    [ E.width E.fill
                    , E.centerX
                    , E.centerY
                    , E.paddingXY 70 0
                    ]
                    (E.image [ E.width (E.maximum 300 E.fill) ] { src = "logo.svg", description = "Charity CRM logo" })
                ]
            , E.row
                [ E.width E.fill ]
                [ E.column
                    [ E.width E.fill
                    , E.centerX
                    , E.centerY
                    , E.spacing 40
                    ]
                    [ movingText model
                    , E.column
                        [ E.width E.fill
                        , E.centerX
                        , E.centerY
                        , E.spacing 25
                        ]
                        [ descriptionText model
                        , E.column
                            [ E.width E.fill
                            , E.centerX
                            , E.centerY
                            , E.spacing 15
                            ]
                            [ authButton
                            , smallDescriptionText
                            ]
                        ]
                    ]
                ]
            , E.column
                [ E.width E.fill
                , E.spacing 50
                , E.paddingEach { top = 0, bottom = 20, left = 0, right = 0 }
                , R.mainContent
                ]
              <|
                List.map viewFeature features
            , Elm.Skeleton.footer
            ]



-- VIEW HELPERS
-- CONTENT / INTRODUCTION


movingText : Model -> E.Element Msg
movingText model =
    E.textColumn
        [ E.alignTop
        , E.width E.fill
        ]
        [ E.paragraph
            [ F.size 30
            , F.center
            ]
            [ Elm.Ui.h1
                [ "CRM for automating "
                , "the Fund's business processes."
                ]
            ]
        ]


descriptionText model =
    E.textColumn
        [ E.alignTop
        , E.width E.fill
        ]
        [ E.paragraph [ F.center ]
            [ E.text "Our goal is to ensure transparency of actions. We strive to be open and honest about donations."
            ]
        ]


authButton : E.Element Msg
authButton =
    Elm.Ui.linkButton "Log in" [ Element.Events.onClick (Navigate "login:index") ]


smallDescriptionText : E.Element msg
smallDescriptionText =
    E.paragraph
        [ F.size 14, F.center ]
        [ E.text "or "
        , Elm.Ui.link [] (Link "open the mobile application" "https://play.google.com/store/apps/details?id=com.hse.charity")
        ]



--- FEATURE


type alias Feature msg =
    { title : String
    , description : List (E.Element msg)
    , image : E.Element msg
    }


featureImage : Feature Msg -> E.Element Msg
featureImage feature =
    E.el
        [ E.width E.fill ]
    <|
        E.el [ E.width E.fill ] <|
            feature.image


featureText : Feature msg -> E.Element msg
featureText feature =
    E.textColumn
        [ E.width E.fill
        , E.alignLeft
        , E.alignTop
        , E.spacing 15
        ]
        [ E.paragraph
            [ F.size 25
            , E.width E.fill
            ]
            [ Elm.Ui.h2 feature.title ]
        , E.paragraph
            [ F.size 16
            , E.width E.fill
            ]
            feature.description
        ]


features : List (Feature msg)
features =
    let
        paragraphLinked url label content =
            [ E.html <| Html.p [] (content ++ [ text " ", Html.a [ href url ] [ Html.text label ] ]) ]

        paragraph content =
            [ E.html <| Html.p [] content ]
    in
    [ { title = "CRM for your fund"
      , description = paragraph [ text "Managing the charity is a very complex process which includes not only working with donors and donees, but also controlling the staff and volunteers, preparing documentation for the authorities, etc. Consequently, non-profit organizations need a field specific platform to conduct all the information at one place. A CRM system for a Charity can provide all the benefits that businesses have used for years. It also would establish business processes, adjust time management and automate document circulation." ]
      , image = E.image [ E.width (E.maximum 400 E.fill), E.centerX ] { src = "architecture.jpg", description = "Charity CRM architecture" }
      }
    , { title = "Blockchain"
      , description = paragraphLinked "https://blockchaincharity.infostrategic.com" "Check transaction status." [ text "The blockchain is a way for donors, charities, and donees that don't trust each other to reach an agreement without the need for a trusted environment. Each party only needs to trust themselves, which is always the case. With the blockchain backing the system that the charity uses itself to track donations, you get additional reassurance that your donation was registered in a permanent unalterable distributed record. You now have a provable record of donation to a particular cause." ]
      , image = E.image [ E.width (E.maximum 400 E.fill), E.centerX ] { src = "blockchain.jpg", description = "Blockchain" }
      }
    , { title = "Android application"
      , description = paragraphLinked "https://play.google.com/store/apps/details?id=com.hse.charity" "Install now." [ text "The mobile application offers a solution that makes it quick and easy to seek help. The user can create a request for help and track status: from creation to publication. Donors also top up their personal wallet and send money to specific requests or directly send money to the foundation. Besides, there is communication with the fund’s employees for questions or issues from users." ]
      , image = E.image [ E.width (E.maximum 600 E.fill), E.centerX ] { src = "android.jpg", description = "Android" }
      }
    ]
