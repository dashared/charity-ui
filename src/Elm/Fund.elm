module Elm.Fund exposing (..)

import Browser
import Element as E
import Element.Background as Background
import Element.Font as F
import Elm.Center
import Elm.Colors as C
import Elm.Skeleton exposing (Tab(..))
import Html exposing (Html)
import Maybe exposing (withDefault)


type alias FileInfo =
    { id : String
    , mime_type : String
    , title : String
    }


type alias Fund =
    { title : String
    , description : Maybe String
    , address : Maybe String
    , files : Maybe (List FileInfo)
    , phone : Maybe String
    , email : Maybe String
    }


type alias Model =
    { fundInfo : Fund
    }


main : Program Fund Model Model
main =
    Browser.element
        { init = init
        , update = \model _ -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = view
        }


init : Fund -> ( Model, Cmd msg )
init flags =
    let
        model =
            Model flags
    in
    ( model, Cmd.none )


view : Model -> Html msg
view model =
    let
        totalDescription =
            E.paragraph [ E.width E.fill, E.spacing 45 ] <| [ titleLabel, mdFundDescription, fileLinks, contacts ]

        titleLabel =
            E.el [ F.size 24 ] <| E.text model.fundInfo.title

        oneLink file =
            E.link [ E.alignLeft, F.color C.darkBlue ] { url = downloadUrl file, label = E.text file.title }

        fileLinks =
            E.row [ E.width E.fill, E.spacing 10 ]
                [ E.el [ F.size 16, F.bold ] <| E.text "Files"
                , E.column
                    [ E.width E.fill
                    , E.spacing 16
                    ]
                    (List.map
                        oneLink
                     <|
                        withDefault [] model.fundInfo.files
                    )
                ]

        contacts =
            E.column
                [ E.width E.fill
                , E.spacing 16
                ]
                [ E.el [ F.size 16, F.semiBold ] <| E.text "Contacts"
                , E.text <| "E-mail: " ++ withDefault "" model.fundInfo.email
                , E.text <| "Address: " ++ withDefault "" model.fundInfo.address
                , E.text <| "Phone: " ++ withDefault "" model.fundInfo.phone
                ]

        mdFundDescription =
            E.html (Elm.Center.markdown <| withDefault "" model.fundInfo.description)
    in
    Elm.Skeleton.skeleton FundTab [ totalDescription ]


downloadUrl : FileInfo -> String
downloadUrl file =
    "/api/file/" ++ file.id ++ "/download"
