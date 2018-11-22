(function($) {
    $(document).ready(function() {
        const $button = $('#new-quote-button');
        const $content = $('.entry-content');
        const $title = $('.entry-title');
        const $source = $('.source');
        const $submit = $( '#quote-submission-form' );
        let lastPage = '';

        //get a random post and append content to the dom

        $button.on('click', function(event) {
            event.preventDefault();
            //ajaxrequest
                getQuote();
        })//end of ajax function

        function getQuote() {
            lastPage = document.URL;
            const site = quotesondev_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1';
            $.ajax({
                url: site,
                method: 'GET',
                dataType: 'JSON',
            })

            .done(function(data){
                //figure out the post slug
                history.pushState( null, null, quotesondev_vars.home_url + '/' + data[0].slug );

                $content.empty();
                $content.append(
                    data[0].content.rendered
                    );
                $title.empty();
                $title.append(
                    `&mdash;${data[0].title.rendered}`
                    );
                    $source.empty();
                if(data[0]._qod_quote_source_url.length > 0) {
                    $source.append(
                   `, &nbsp; <a href="${data[0]._qod_quote_source_url}">${data[0]._qod_quote_source}</a>`
                    );

                    } else if(data[0]._qod_quote_source > 0){
                $source.append(
                   `, &nbsp; ${data[0]._qod_quote_source}`
                    );} else {
                        $source.append('');
                    }
            })//ajax request .done

            .fail(function(){
                $content.append( 'Sorry, Somethings gone wrong!' );
            });
        } // end of getQuote

        $(window).on('popstate', function(){
            window.location.replace(lastPage);
        });


        //submit the form and create a new quote post 
        $submit.on( 'submit', function( event ){
            event.preventDefault();
            postQuote();
        } );

        function postQuote() {
            //get values of your form input
            const quoteTitle = $('#quote-author').val();
            const quoteContent = $('#quote-content').val();
            const quoteSource = $('#quote-source').val();
            const quoteURL = $('#quote-source-url').val();
            
            $.ajax({
                url: quotesondev_vars.rest_url + 'wp/v2/posts',
                method: 'POST',
                data: {
                    title: quoteTitle,
                    content: quoteContent,
                    // meta: quoteSource,
                    // meta: quoteURL,
                },
                beforeSend: function(xhr){
                    xhr.setRequestHeader( 'X-WP-NONCE', quotesondev_vars.nonce )
                }

            })

            .done( function(response){
                console.log(response);
                $submit.empty();
                $submit.append( '<h3>Thanks, your submission was recieved!</h3>' );
            } )

            .fail( function(){
                $submit.append( '<h3>Sorry, please try again later.</h3>' );
            } );
        }//end of post quote
    });//end of doc ready
})(jQuery)