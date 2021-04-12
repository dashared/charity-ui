module Elm.FAQ exposing (..)

import Browser
import Elm.Center
import Elm.Skeleton exposing (Tab(..))
import Html exposing (..)
import Html.Attributes exposing (..)


main =
    Browser.element
        { init = init
        , update = \model _ -> ( model, Cmd.none )
        , subscriptions = \_ -> Sub.none
        , view = view
        }


init : Flags -> ( Model, Cmd msg )
init flags =
    let
        model =
            Model flags.faq
    in
    ( model, Cmd.none )


view : Model -> Html msg
view model =
    let
        mdFaq =
            Elm.Center.markdown "600px" model.faq
    in
    div [] (Elm.Skeleton.skeleton "" FAQ [ mdFaq ])


type alias Flags =
    { faq : String
    }


type alias Model =
    { faq : String
    }
