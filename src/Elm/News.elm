module Elm.News exposing (..)

import Browser
import Element as E
import Element.Font as F
import Element.Region as R exposing (description)
import Elm.Skeleton exposing (Tab(..), container)
import Html exposing (Html, text)
import Http
import Json.Decode as Decode exposing (Decoder, field, list)
import Json.Decode.Field as Field



--- MAIN , mb make document instead


main : Program { baseUrl : String } Model Msg
main =
    Browser.element
        { init = \flags -> init flags
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


init : { baseUrl : String } -> ( Model, Cmd Msg )
init flags =
    ( { newsPageData = Nothing, error = Nothing, baseUrl = flags.baseUrl }
    , getNewsData flags.baseUrl
    )



--- MODEL


type alias News =
    { id : String
    , title : String
    , description : String
    , image_id : Maybe String
    }


type alias PageData =
    { page : Int
    , size : Int
    , totalElements : Int
    , totalPages : Int
    }


type alias NewsResponse =
    { data : List News
    , page : PageData
    }


type alias Model =
    { newsPageData : Maybe NewsResponse
    , error : Maybe String
    , baseUrl : String
    }



--- MSG


type Msg
    = OnNewsReceived (Result Http.Error NewsResponse)
    | OnRequestedNewsData


onePieceOfNewsDecoder : Decoder News
onePieceOfNewsDecoder =
    Field.require "id" Decode.string <|
        \id ->
            Field.require "title" Decode.string <|
                \title ->
                    Field.require "description" Decode.string <|
                        \description ->
                            Field.attempt "image_id" Decode.string <|
                                \image_id ->
                                    Decode.succeed
                                        { id = id
                                        , title = title
                                        , description = description
                                        , image_id = image_id
                                        }


pageDataDecoder : Decoder PageData
pageDataDecoder =
    Field.require "page" Decode.int <|
        \page ->
            Field.require "size" Decode.int <|
                \size ->
                    Field.require "totalElements" Decode.int <|
                        \totalElements ->
                            Field.require "totalPages" Decode.int <|
                                \totalPages ->
                                    Decode.succeed
                                        { page = page
                                        , size = size
                                        , totalPages = totalPages
                                        , totalElements = totalElements
                                        }


newsDataDecoder : Decoder NewsResponse
newsDataDecoder =
    Decode.map2 NewsResponse (field "data" (list onePieceOfNewsDecoder)) (field "page" pageDataDecoder)


getNewsData baseUrl =
    Http.get
        { url = baseUrl ++ "/api/news"
        , expect = Http.expectJson OnNewsReceived newsDataDecoder
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnNewsReceived (Ok newsPageData) ->
            ( { model | newsPageData = Just newsPageData }, Cmd.none )

        OnNewsReceived (Err errorMessage) ->
            ( { model
                | error = Just "hello"
              }
            , Cmd.none
            )

        OnRequestedNewsData ->
            ( model, getNewsData model.baseUrl )



--- VIEW


view : Model -> Html Msg
view model =
    let
        news =
            E.column [ E.width E.fill, E.spacing 40 ] (viewNews model)
    in
    Elm.Skeleton.skeleton NewsTab [ news ]


imgUrl maybeImageId =
    case maybeImageId of
        Nothing ->
            "https://placeholder.pics/svg/300"

        Just imageId ->
            String.concat [ "/api/file/", imageId, "/download" ]


viewNews : Model -> List (E.Element Msg)
viewNews model =
    let
        oneStoryView story =
            E.row
                [ E.width E.fill, E.spacing 30 ]
                [ E.el [ E.width E.fill ]
                    (E.image [ E.width <| E.maximum 20 E.fill ] { src = imgUrl story.image_id, description = "" })
                , E.column
                    [ E.width E.fill
                    , E.alignTop
                    , E.spacing 20
                    ]
                    [ E.row [ E.width E.fill ] [ E.text story.title ]
                    , E.row [ E.width E.fill ] [ E.text story.description ]
                    ]
                ]
    in
    Maybe.withDefault [] (Maybe.map (\newsData -> List.map oneStoryView newsData.data) model.newsPageData)
