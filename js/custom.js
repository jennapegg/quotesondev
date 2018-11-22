(function($) {
    $(document).ready(function() {
        const $button = $('#new-quote-button');
        const $content = $('.entry-content');
        const $title = $('.entry-title');
        const $source = $('.source');

        //get a random post and append content to the dom

        $button.on('click', function(event) {
            event.preventDefault();
            //ajaxrequest
                getQuote();
        })//end of ajax function

        function getQuote() {
            const site = quotesondev_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1';
            $.ajax({
                url: site,
                method: 'GET',
                dataType: 'JSON',
            })

            .done(function(data){
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
        }

    });//end of doc ready
})(jQuery)