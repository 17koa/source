(($) ->
  $(".some_button").on "click", (event) ->
    console.log("some_button clicked!")
    event.preventDefault()
) jQuery